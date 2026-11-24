package com.weaveapp.kfortune;

/* =====================================================================
   KFortune — 구글 플레이 결제 창구                        2026-11-24
   Capacitor 플러그인 "KFBilling" — 화면(koreanfortune.kr)의 js/pay.js 가 부릅니다.
     ready()                       화면 준비됨 → 가격 알려 주기 · 끝나지 않은 결제 다시 넘기기
     buy({sku, accountId})         결제창 (obfuscatedAccountId = 기기번호 → 서버가 주인 확인)
     consume({token})              서버가 확인한 뒤 "소비" → 같은 상품을 또 살 수 있음
     share({text}) · print()       결과 공유(공유 창) · 출력/PDF (2026-11-25 추가)
   결과는 이벤트 "native" · "prices" 로 넘깁니다(화면이 듣기 전이면 붙잡아 두었다가 넘김).
   🔴 여기서 이용권을 주지 않습니다. 판단은 서버(/api/fortune/google/verify)가 구글에 직접 물어보고 합니다.
   상품(플레이 콘솔 → 한 번 사는 상품): kf_year · kf_saju · kf_toj
   ===================================================================== */

import android.os.Handler;
import android.os.Looper;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.android.billingclient.api.BillingClient;
import com.android.billingclient.api.BillingClientStateListener;
import com.android.billingclient.api.BillingFlowParams;
import com.android.billingclient.api.BillingResult;
import com.android.billingclient.api.ConsumeParams;
import com.android.billingclient.api.PendingPurchasesParams;
import com.android.billingclient.api.ProductDetails;
import com.android.billingclient.api.Purchase;
import com.android.billingclient.api.PurchasesUpdatedListener;
import com.android.billingclient.api.QueryProductDetailsParams;
import com.android.billingclient.api.QueryPurchasesParams;

import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CapacitorPlugin(name = "KFBilling")
public class KFBilling extends Plugin implements PurchasesUpdatedListener {
    private static final String TAG = "KFortune";
    private static final List<String> SKUS = Arrays.asList("kf_year", "kf_saju", "kf_toj");

    private final Handler main = new Handler(Looper.getMainLooper());
    private BillingClient client;
    private boolean connected = false;
    private final Map<String, ProductDetails> details = new HashMap<>();

    @Override public void load() { connect(); }

    private void connect() {
        try {
            if (client == null) {
                client = BillingClient.newBuilder(getContext()).setListener(this)
                        .enablePendingPurchases(PendingPurchasesParams.newBuilder().enableOneTimeProducts().build())
                        .build();
            }
            client.startConnection(new BillingClientStateListener() {
                @Override public void onBillingSetupFinished(BillingResult r) {
                    connected = r.getResponseCode() == BillingClient.BillingResponseCode.OK;
                    if (connected) { loadDetails(); recover(); }
                }
                @Override public void onBillingServiceDisconnected() {
                    connected = false;
                    main.postDelayed(KFBilling.this::connect, 3000);
                }
            });
        } catch (Throwable e) { android.util.Log.e(TAG, "billing connect", e); }
    }

    private void loadDetails() {
        List<QueryProductDetailsParams.Product> list = new ArrayList<>();
        for (String s : SKUS) list.add(QueryProductDetailsParams.Product.newBuilder().setProductId(s).setProductType(BillingClient.ProductType.INAPP).build());
        client.queryProductDetailsAsync(QueryProductDetailsParams.newBuilder().setProductList(list).build(), (r, res) -> {
            List<ProductDetails> found = res == null ? null : res.getProductDetailsList();
            if (found == null) return;
            JSONObject prices = new JSONObject();
            for (ProductDetails pd : found) {
                details.put(pd.getProductId(), pd);
                try { ProductDetails.OneTimePurchaseOfferDetails one = pd.getOneTimePurchaseOfferDetails();
                      if (one != null) prices.put(pd.getProductId(), one.getFormattedPrice()); } catch (Throwable ignore) {}
            }
            JSObject ev = new JSObject(); ev.put("prices", prices.toString());
            notifyListeners("prices", ev, true);
        });
    }

    /* 결제는 됐는데 서버에 못 보낸 것 → 다시 넘김 */
    private void recover() {
        client.queryPurchasesAsync(QueryPurchasesParams.newBuilder().setProductType(BillingClient.ProductType.INAPP).build(), (r, list) -> {
            if (r.getResponseCode() != BillingClient.BillingResponseCode.OK || list == null) return;
            for (Purchase p : list) deliver(p, true);
        });
    }

    private void deliver(Purchase p, boolean recovered) {
        if (p.getPurchaseState() != Purchase.PurchaseState.PURCHASED) {
            if (p.getPurchaseState() == Purchase.PurchaseState.PENDING) result("pending", "", null, null, recovered);
            return;
        }
        String sku = p.getProducts().isEmpty() ? "" : p.getProducts().get(0);
        result("ok", sku, p.getPurchaseToken(), p.getOrderId(), recovered);
    }

    private void result(String status, String sku, String token, String orderId, boolean recovered) {
        try {
            JSONObject o = new JSONObject();
            o.put("status", status); o.put("productId", sku);
            if (token != null) o.put("purchaseToken", token);
            if (orderId != null) o.put("orderId", orderId);
            o.put("recovered", recovered);
            JSObject j = new JSObject(); j.put("json", o.toString());
            notifyListeners("native", j, true);
        } catch (Throwable ignore) {}
    }

    /* ── 화면이 부르는 것 ── */
    @PluginMethod public void ready(PluginCall call) {
        main.post(() -> { if (connected) { loadDetails(); recover(); } else connect(); });
        call.resolve();
    }

    @PluginMethod public void buy(PluginCall call) {
        final String sku = call.getString("sku", "");
        final String accountId = call.getString("accountId", "");
        if (!SKUS.contains(sku)) { call.reject("sku"); return; }
        main.post(() -> {
            if (!connected) { connect(); result("error", sku, null, null, false); return; }
            ProductDetails pd = details.get(sku);
            if (pd == null) { loadDetails(); result("error", sku, null, null, false); return; }
            List<BillingFlowParams.ProductDetailsParams> flow = new ArrayList<>();
            flow.add(BillingFlowParams.ProductDetailsParams.newBuilder().setProductDetails(pd).build());
            BillingFlowParams.Builder b = BillingFlowParams.newBuilder().setProductDetailsParamsList(flow);
            if (accountId != null && accountId.matches("[A-Za-z0-9_-]{16,64}")) b.setObfuscatedAccountId(accountId);
            BillingResult r = client.launchBillingFlow(getActivity(), b.build());
            if (r.getResponseCode() != BillingClient.BillingResponseCode.OK) result("error", sku, null, null, false);
        });
        call.resolve();
    }

    /* 공유 — 안드로이드 공유 창(카카오톡 · 부름누름 · 바로너 · 가림콜 · 단톡방 등 설치된 앱) */
    @PluginMethod public void share(PluginCall call) {
        final String text = call.getString("text", "");
        main.post(() -> {
            try {
                android.content.Intent i = new android.content.Intent(android.content.Intent.ACTION_SEND);
                i.setType("text/plain");
                i.putExtra(android.content.Intent.EXTRA_TEXT, text);
                android.content.Intent c = android.content.Intent.createChooser(i, null);
                c.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK);
                getActivity().startActivity(c);
                call.resolve();
            } catch (Exception e) { call.reject("share"); }
        });
    }

    /* 출력 · PDF — 안드로이드 인쇄(「PDF로 저장」 선택 가능) */
    @PluginMethod public void print(PluginCall call) {
        main.post(() -> {
            try {
                android.print.PrintManager pm = (android.print.PrintManager) getActivity().getSystemService(android.content.Context.PRINT_SERVICE);
                android.webkit.WebView wv = getBridge().getWebView();
                pm.print("KFortune", wv.createPrintDocumentAdapter("KFortune"), new android.print.PrintAttributes.Builder().build());
                call.resolve();
            } catch (Exception e) { call.reject("print"); }
        });
    }

    @PluginMethod public void consume(PluginCall call) {
        final String token = call.getString("token", "");
        if (token == null || token.isEmpty()) { call.reject("token"); return; }
        main.post(() -> client.consumeAsync(ConsumeParams.newBuilder().setPurchaseToken(token).build(),
                (r, t) -> android.util.Log.i(TAG, "consume " + r.getResponseCode())));
        call.resolve();
    }

    /* ── 구글이 결제 결과를 알려 줌 ── */
    @Override public void onPurchasesUpdated(BillingResult r, List<Purchase> purchases) {
        int code = r.getResponseCode();
        if (code == BillingClient.BillingResponseCode.OK && purchases != null) { for (Purchase p : purchases) deliver(p, false); return; }
        if (code == BillingClient.BillingResponseCode.USER_CANCELED) { result("cancel", "", null, null, false); return; }
        if (code == BillingClient.BillingResponseCode.ITEM_ALREADY_OWNED) { recover(); return; }
        result("error", "", null, null, false);
    }
}
