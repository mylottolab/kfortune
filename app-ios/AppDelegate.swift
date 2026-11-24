import UIKit
import WebKit
import StoreKit
import CryptoKit
import Capacitor

/* =====================================================================
   KFortune(한국전통운세) iOS — 앱의 뿌리                              2026-11-25

   이 앱은 koreanfortune.kr 화면을 그대로 띄우는 껍데기입니다. 아이폰에서만 하는 일:
   ① 애플 결제(StoreKit 2) — kf_year · kf_saju · kf_toj
   ② 왼쪽 끝에서 밀어 뒤로 가기, 좌우 흔들림 막기

   화면(웹, js/pay.js)과 주고받는 창구 — 안드로이드(KFBilling)와 같은 모양
     웹 → 앱 : window.KFNative.ready() · buy(sku, 기기번호) · consume(token)
     앱 → 웹 : window.KF_PAY.onNative({ status:'ok'|'cancel'|'error', productId, purchaseToken:'apple:<거래번호>', orderId, platform:'ios' })
               window.KF_PAY.onPrices({ kf_year: '₩19,900', … })
   서버 확인: 화면이 /api/fortune/apple/verify 로 보내고, 서버가 애플에 직접 물어본 뒤에만 열어 줍니다.
   ⚠ 서버 확인 전에는 finish 하지 않습니다 — 중간에 끊기면 다음에 앱을 켤 때 다시 보냅니다.
   ===================================================================== */

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        KFStore.shared.start()
        KFBridge.shared.attachWeb()
        NotificationCenter.default.addObserver(forName: UIApplication.didBecomeActiveNotification, object: nil, queue: .main) { _ in
            KFBridge.shared.attachWeb()
        }
        return true
    }

    func application(_ application: UIApplication,
                     configurationForConnecting connectingSceneSession: UISceneSession,
                     options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        let config = UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
        config.delegateClass = SceneDelegate.self
        return config
    }
}

/* =====================================================================
   KFBridge — 화면에 결제 창구(KFNative)를 심고, 화면의 부탁을 받습니다
   ===================================================================== */
final class KFBridge: NSObject, WKScriptMessageHandler {
    static let shared = KFBridge()

    func topController() -> UIViewController? {
        var c = currentWebView()?.window?.rootViewController
        while let p = c?.presentedViewController { c = p }
        return c
    }
    /* 공유 — 아이폰 공유 창(카카오톡 · 메시지 · 부름누름 등 설치된 앱) */
    func share(_ text: String) {
        guard let top = topController(), !text.isEmpty else { return }
        let vc = UIActivityViewController(activityItems: [text], applicationActivities: nil)
        if let pop = vc.popoverPresentationController { pop.sourceView = top.view; pop.sourceRect = CGRect(x: top.view.bounds.midX, y: top.view.bounds.maxY - 80, width: 1, height: 1) }
        top.present(vc, animated: true)
    }
    /* 출력 · PDF — 아이폰 인쇄 창(오른쪽 위 공유 단추로 PDF 저장도 됩니다) */
    func printPage() {
        guard let wv = currentWebView() else { return }
        let info = UIPrintInfo(dictionary: nil)
        info.outputType = .general
        info.jobName = "KFortune"
        let pc = UIPrintInteractionController.shared
        pc.printInfo = info
        pc.printFormatter = wv.viewPrintFormatter()
        pc.present(animated: true, completionHandler: nil)
    }
    private weak var attachedWeb: WKWebView?
    private var xWatch: NSKeyValueObservation?

    func currentWebView() -> WKWebView? {
        for sc in UIApplication.shared.connectedScenes {
            guard let ws = sc as? UIWindowScene else { continue }
            for w in ws.windows {
                if let vc = w.rootViewController as? CAPBridgeViewController, let wv = vc.bridge?.webView { return wv }
            }
        }
        return nil
    }

    static let startJS = #"""
    (function(){
      if (window.KFNative) return;
      function post(m){ try { window.webkit.messageHandlers.kfIOS.postMessage(m); } catch (e) {} }
      window.KFNative = {
        platform: 'ios',
        ready: function(){ post({ act: 'ready' }); },
        buy: function(sku, account){ post({ act: 'buy', sku: String(sku || ''), account: String(account || '') }); },
        consume: function(token){ post({ act: 'finish', token: String(token || '') }); },
        share: function(text){ post({ act: 'share', text: String(text || '') }); },
        print: function(){ post({ act: 'print' }); }
      };
      /* 우리 사이트 주소를 새 창으로 열면 사파리로 튀어 나가지 않게 같은 화면에서 엽니다 */
      var OWN = /^(https?:)?\/\/((www\.)?koreanfortune\.kr)(\/|$)/i;
      function own(u){ if (!u) return false; u = String(u); if (/^(javascript:|mailto:|tel:|sms:)/i.test(u)) return false; if (!/^[a-z]+:|^\/\//i.test(u)) return true; return OWN.test(u); }
      var nativeOpen = window.open;
      window.open = function(url){ if (url === undefined || url === '' || own(url)) { if (url) location.href = new URL(url, location.href).href; return window; } return nativeOpen.apply(window, arguments); };
      document.addEventListener('click', function(e){ var a = e.target && e.target.closest ? e.target.closest('a[target]') : null; if (a && own(a.getAttribute('href'))) a.removeAttribute('target'); }, true);
    })();
    """#

    static let layoutJS = "(function(){var s=document.createElement('style');s.textContent='html,body{overflow-x:clip!important;max-width:100vw}';(document.head||document.documentElement).appendChild(s);})();"

    func attachWeb(tries: Int = 50) {
        guard let wv = currentWebView() else {
            if tries > 0 { DispatchQueue.main.asyncAfter(deadline: .now() + 0.4) { self.attachWeb(tries: tries - 1) } }
            return
        }
        if attachedWeb === wv { return }
        let ucc = wv.configuration.userContentController
        ucc.removeScriptMessageHandler(forName: "kfIOS")
        ucc.add(self, name: "kfIOS")
        ucc.addUserScript(WKUserScript(source: KFBridge.startJS, injectionTime: .atDocumentStart, forMainFrameOnly: true))
        ucc.addUserScript(WKUserScript(source: KFBridge.layoutJS, injectionTime: .atDocumentEnd, forMainFrameOnly: true))
        attachedWeb = wv
        wv.allowsBackForwardNavigationGestures = true
        wv.scrollView.alwaysBounceHorizontal = false
        wv.scrollView.showsHorizontalScrollIndicator = false
        xWatch = wv.scrollView.observe(\.contentOffset, options: [.new]) { sv, _ in
            let left = -sv.adjustedContentInset.left
            if abs(sv.contentOffset.x - left) > 0.5 { sv.contentOffset = CGPoint(x: left, y: sv.contentOffset.y) }
        }
        // 이미 떠 있는 화면은 창구가 늦게 생겼으므로 한 번 다시 읽어 결제 창구가 붙게 합니다
        wv.evaluateJavaScript("typeof window.KFNative") { v, _ in
            if (v as? String) != "object" { wv.evaluateJavaScript(KFBridge.startJS + KFBridge.layoutJS + "location.reload();", completionHandler: nil) }
        }
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let m = message.body as? [String: Any], let act = m["act"] as? String else { return }
        switch act {
        case "ready": KFStore.shared.ready()
        case "buy": KFStore.shared.buy(sku: (m["sku"] as? String) ?? "", account: (m["account"] as? String) ?? "")
        case "finish": KFStore.shared.finish(token: (m["token"] as? String) ?? "")
        case "share": DispatchQueue.main.async { self.share((m["text"] as? String) ?? "") }
        case "print": DispatchQueue.main.async { self.printPage() }
        default: break
        }
    }
}

/* =====================================================================
   KFStore — 애플 결제 (StoreKit 2)
   ===================================================================== */
final class KFStore {
    static let shared = KFStore()
    static let SKUS = ["kf_year", "kf_saju", "kf_toj"]
    private var updates: Task<Void, Never>?
    private var waiting: [String: Transaction] = [:]
    private var outbox: [String] = []
    private var sending = false

    func start() {
        if updates != nil { return }
        updates = Task.detached { [weak self] in
            for await r in Transaction.updates { await self?.handle(r) }
        }
    }

    /* 화면이 준비되면: 가격 알려 주기 + 끝나지 않은 결제 다시 보내기 */
    func ready() {
        Task {
            if let ps = try? await Product.products(for: KFStore.SKUS) {
                var m: [String: String] = [:]
                for p in ps { m[p.id] = p.displayPrice }
                if let d = try? JSONSerialization.data(withJSONObject: m), let s = String(data: d, encoding: .utf8) {
                    self.send("window.KF_PAY.onPrices(" + s + ")")
                }
            }
            for await r in Transaction.unfinished { await self.handle(r) }
        }
    }

    /* 기기 번호(kf + 32자리)를 애플이 받는 UUID 모양으로 — 서버(accountUuid)와 같은 규칙 */
    static func accountUUID(_ account: String) -> UUID? {
        var hex = ""
        let lower = account.lowercased()
        if lower.hasPrefix("kf"), lower.count == 34, lower.dropFirst(2).allSatisfy({ $0.isHexDigit }) {
            hex = String(lower.dropFirst(2))
        } else {
            let digest = SHA256.hash(data: Data(account.utf8))
            hex = String(digest.map { String(format: "%02x", $0) }.joined().prefix(32))
        }
        let h = Array(hex)
        guard h.count == 32 else { return nil }
        let s = String(h[0..<8]) + "-" + String(h[8..<12]) + "-" + String(h[12..<16]) + "-" + String(h[16..<20]) + "-" + String(h[20..<32])
        return UUID(uuidString: s)
    }

    func buy(sku: String, account: String) {
        if sku.isEmpty { result(["status": "error", "productId": sku, "msg": "no sku"]); return }
        Task {
            do {
                guard let p = try await Product.products(for: [sku]).first else {
                    self.result(["status": "error", "productId": sku, "msg": "product not found"])
                    return
                }
                var opts: Set<Product.PurchaseOption> = []
                if let u = KFStore.accountUUID(account) { opts.insert(.appAccountToken(u)) }
                let scene: UIWindowScene? = await MainActor.run {
                    KFBridge.shared.currentWebView()?.window?.windowScene
                        ?? UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }.first(where: { $0.activationState == .foregroundActive })
                }
                let finalOpts = opts
                func attempt() async throws -> Product.PurchaseResult {
                    if #available(iOS 17.0, *), let sc = scene { return try await p.purchase(confirmIn: sc, options: finalOpts) }
                    return try await p.purchase(options: finalOpts)
                }
                let r: Product.PurchaseResult
                do { r = try await attempt() }
                catch { try await Task.sleep(nanoseconds: 1_000_000_000); r = try await attempt() }
                switch r {
                case .success(let v): await self.handle(v)
                case .userCancelled: self.result(["status": "cancel", "productId": sku])
                case .pending: self.result(["status": "cancel", "productId": sku])
                @unknown default: self.result(["status": "error", "productId": sku])
                }
            } catch {
                self.result(["status": "error", "productId": sku, "msg": String(String(describing: error).prefix(120))])
            }
        }
    }

    private func handle(_ v: VerificationResult<Transaction>) async {
        guard case .verified(let t) = v else { return }
        if t.revocationDate != nil { await t.finish(); return }      // 환불 · 취소 — 정리만
        let token = "apple:" + String(t.id)
        await MainActor.run { self.waiting[token] = t }
        result(["status": "ok", "productId": t.productID, "purchaseToken": token, "orderId": "AP:" + String(t.id), "platform": "ios"])
    }

    func finish(token: String) {
        DispatchQueue.main.async {
            if let t = self.waiting[token] { self.waiting[token] = nil; Task { await t.finish() }; return }
            Task { for await r in Transaction.unfinished { if case .verified(let t) = r, "apple:" + String(t.id) == token { await t.finish() } } }
        }
    }

    private func result(_ r: [String: String]) {
        guard let d = try? JSONSerialization.data(withJSONObject: r), let s = String(data: d, encoding: .utf8) else { return }
        send("window.KF_PAY.onNative(" + s + ")")
    }

    /* 화면에 pay.js(KF_PAY)가 생겨야 받을 수 있습니다 — 없으면 0.5초마다 다시 (20초까지) */
    private func send(_ call: String) {
        DispatchQueue.main.async { self.outbox.append(call); self.drain() }
    }
    private func drain(tries: Int = 40, retry: Bool = false) {
        if sending && !retry { return }
        guard let first = outbox.first else { sending = false; return }
        sending = true
        guard let wv = KFBridge.shared.currentWebView() else {
            if tries > 0 { DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { self.drain(tries: tries - 1, retry: true) } } else { outbox.removeAll(); sending = false }
            return
        }
        let js = "(function(){try{if(window.KF_PAY&&window.KF_PAY.onNative){" + first + ";return 'ok';}}catch(e){}return 'wait';})()"
        wv.evaluateJavaScript(js) { v, _ in
            DispatchQueue.main.async {
                if (v as? String) == "ok" {
                    if !self.outbox.isEmpty { self.outbox.removeFirst() }
                    self.drain(retry: true)
                } else if tries > 0 {
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) { self.drain(tries: tries - 1, retry: true) }
                } else {
                    // 받지 못한 결제는 끝나지 않은 채 남아, 다음에 앱을 켤 때(ready) 다시 옵니다
                    self.outbox.removeAll(); self.sending = false
                }
            }
        }
    }
}
