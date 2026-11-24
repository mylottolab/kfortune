# KFortune 안드로이드 앱 (com.weaveapp.kfortune)

화면은 https://koreanfortune.kr 을 그대로 불러옵니다. 그래서 운세 글이나 화면을 고쳐도 **앱을 다시 올릴 필요가 없습니다.**
앱을 다시 올려야 하는 때는 아이콘 · 이름 · 결제 같은 "앱 껍데기"를 바꿀 때뿐입니다.

- 스토어 이름: **KoreanFortune: Saju & Tojeong** (한국어: 한국전통운세: 사주·토정비결)
- 홈 화면 이름: KFortune (휴대폰 언어가 한국어면 「한국전통운세」, 일본어 「韓国運勢」, 중국어 「韩国运势 / 韓國運勢」)
- 아이콘: 팔괘 · 먹색 바탕
- 결제: 구글 플레이 (한 번 사는 상품 3개 — 아래 참고). 앱 안에서는 카드 · PayPal 결제가 보이지 않습니다.
- 버전: 1 (1.0) · targetSdk 36 · Capacitor 7.4.2 (npm 없이 열리도록 프로젝트 안에 들어 있음)

## 1. 앱 만들기 (처음 한 번)

1. 이 저장소(mylottolab/kfortune)를 받습니다: GitHub → **Code → Download ZIP** → 풀기
2. 풀린 폴더 안의 `app-android` 폴더를 통째로 `C:\kfortune-app` 으로 복사합니다.
3. Android Studio → **Open** → `C:\kfortune-app` 선택 → 아래쪽 Sync 가 끝날 때까지 기다립니다.
   - "Android Gradle Plugin 을 올리라" 거나 "Android Studio 를 새로 받으라" 는 안내가 나오면 따라 주세요.
4. **Build → Generate Signed App Bundle or APK → Android App Bundle → Next**
5. 서명 키 — 🔴 **이 앱은 새 앱이라 이번 한 번만 `Create new...`** 를 누릅니다.
   - Key store path: `C:\keys\kfortune-upload.jks` (⚠ 다른 앱 폴더나 다른 앱 키를 고르지 마세요)
   - 비밀번호 · Alias(`kfortune`) 는 직접 정해서 **안전한 곳에 적어 두세요.** 채팅에는 쓰지 마세요.
   - 인증서 칸: First and Last Name `Weave App Solution`, Country Code `KR` 정도면 됩니다.
   - ⚠ 다음 업데이트부터는 언제나 **Choose existing → `C:\keys\kfortune-upload.jks`** 입니다. 절대 새로 만들지 마세요.
6. Build Variants: **release** → Create. 끝나면 `C:\kfortune-app\app\release\app-release.aab` 이 생깁니다.

## 2. 플레이 콘솔

1. **앱 만들기** — 앱 이름 `KoreanFortune: Saju & Tojeong`, 기본 언어 한국어(또는 영어), 앱 · 무료
2. **테스트 → 내부 테스트** 에 `app-release.aab` 를 올립니다 (결제 상품은 앱을 한 번 올린 뒤에 만들 수 있습니다).
3. **수익 창출 → 제품 → 인앱 상품(한 번 사는 상품)** 3개를 만듭니다. 이름 · 번호가 정확해야 합니다.

   | 제품 ID | 이름 | 가격 |
   |---|---|---|
   | `kf_year` | 1년 이용권 | ₩19,900 |
   | `kf_saju` | 평생 사주 풀이 | ₩9,900 |
   | `kf_toj` | 토정비결 (그해) | ₩4,900 |

   다른 나라 가격은 플레이 콘솔이 자동으로 바꿔 줍니다. 세 상품 모두 **활성화** 해 주세요.
4. **사용자 및 권한** → 부름 · 와파 결제를 확인하는 그 서비스 계정 → 이 앱(KFortune)에도
   **재무 데이터 보기 · 주문 및 구독 관리** 권한을 줍니다. (안 주면 결제 확인이 실패합니다)

## 3. 로또 서버(Render) 환경변수 — 한 번만

Render → my-lotto-lab-api → Environment 에 아래를 넣고 저장합니다. (⚠ 값은 채팅에 붙여 넣지 마세요)

- `GOOGLE_PLAY_SERVICE_ACCOUNT` — 부름 · 와파에서 쓰는 **구글 서비스 계정 JSON 파일 내용 통째로**
- (선택) `FORTUNE_ANDROID_PACKAGE` = `com.weaveapp.kfortune` (넣지 않아도 이 값으로 동작)

## 4. 시험

내부 테스트에 본인 구글 계정을 테스터로 넣고, 플레이 콘솔 → 설정 → **라이선스 테스트** 에도 같은 계정을 넣으면
실제 돈이 나가지 않는 시험 결제가 됩니다. 결제 후 토정비결 · 사주가 바로 열리면 성공입니다.

## 파일 지도
- `app/src/main/java/com/weaveapp/kfortune/MainActivity.java` — 앱 시작, 결제 플러그인 붙이기
- `app/src/main/java/com/weaveapp/kfortune/KFBilling.java` — 구글 결제 (영수증 확인은 서버가 함)
- `app/src/main/assets/capacitor.config.json` — 여는 주소 · 인터넷이 끊겼을 때 화면(offline.html)
- `app/src/main/res/` — 아이콘 · 첫 화면 그림 · 언어별 앱 이름
