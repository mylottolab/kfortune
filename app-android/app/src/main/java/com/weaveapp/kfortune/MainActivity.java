package com.weaveapp.kfortune;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

/* KFortune — koreanfortune.kr 을 여는 앱. 구글 결제 플러그인(KFBilling)을 붙입니다. */
public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(KFBilling.class);   // ⚠ super.onCreate 보다 먼저
        super.onCreate(savedInstanceState);
        try { getBridge().getWebView().getSettings().setTextZoom(100); } catch (Throwable ignore) {}   // 휴대폰 글자 크기 때문에 화면이 깨지지 않게
    }
}
