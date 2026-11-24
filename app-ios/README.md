# KFortune(한국전통운세) 아이폰 앱

koreanfortune.kr 화면을 띄우는 Capacitor 껍데기 + 애플 결제(StoreKit 2).
빌드는 Codemagic 이 합니다 — 저장소 맨 위의 `codemagic.yaml`(working_directory: app-ios).

- 번들 ID: com.weaveapp.kfortune
- 인앱 상품: kf_year(비갱신형 구독) · kf_saju(소모성) · kf_toj(소모성)
- 결제 확인: 서버 /api/fortune/apple/verify (my-lotto-lab, APPLE_IAP_* 열쇠 그대로)
- 구매 복원: 애플 영수증 메일의 주문 번호(M…) → /api/fortune/restore
