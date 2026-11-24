# KFortune iOS — Codemagic 이 "npx cap add ios" 로 만든 아이폰 폴더에 우리 설정을 끼워 넣습니다.
# (PaperLotto · 부름과 같은 방식: 폴더는 빌드 때 만들고, 파일만 저장소에 둡니다)
import plistlib, shutil, json
A = 'ios/App/App/'
CFG = json.load(open('capacitor.config.json', encoding='utf-8'))
APP_ID = CFG['appId']
APP_NAME = CFG.get('appName', 'KFortune')

shutil.copy('AppDelegate.swift', A + 'AppDelegate.swift')
shutil.copy('App.entitlements', A + 'App.entitlements')
shutil.copy('AppIcon.png', A + 'Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png')
for n in ['splash-2732x2732.png', 'splash-2732x2732-1.png', 'splash-2732x2732-2.png']:
    shutil.copy('Splash.png', A + 'Assets.xcassets/Splash.imageset/' + n)

p = A + 'Info.plist'
d = plistlib.load(open(p, 'rb'))
d['CFBundleDevelopmentRegion'] = 'en'
d['CFBundleDisplayName'] = APP_NAME
d['CFBundleLocalizations'] = ['en', 'ko', 'ja', 'zh-Hans', 'zh-Hant', 'es', 'de', 'fr', 'id', 'th', 'vi', 'ar', 'ru']
d['UIRequiredDeviceCapabilities'] = ['arm64']
d['UISupportedInterfaceOrientations'] = ['UIInterfaceOrientationPortrait']
d.pop('UISupportedInterfaceOrientations~ipad', None)
d['UIUserInterfaceStyle'] = 'Light'
d['ITSAppUsesNonExemptEncryption'] = False      # 일반 HTTPS 만 씁니다 — 수출 규정 질문을 매번 건너뜁니다
plistlib.dump(d, open(p, 'wb'))

p = 'ios/App/App.xcodeproj/project.pbxproj'
s = open(p).read()
key = 'ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;\n'
if 'CODE_SIGN_ENTITLEMENTS' not in s:
    assert s.count(key) == 2, 'pbxproj 모양이 예상과 다릅니다'
    s = s.replace(key, key + '\t\t\t\tCODE_SIGN_ENTITLEMENTS = App/App.entitlements;\n')
s = s.replace('TARGETED_DEVICE_FAMILY = "1,2";', 'TARGETED_DEVICE_FAMILY = 1;')
s = s.replace('MARKETING_VERSION = 1.0;', 'MARKETING_VERSION = 1.0.0;')
open(p, 'w').write(s)
print(APP_NAME + ' iOS 설정을 넣었습니다 (' + APP_ID + ')')
