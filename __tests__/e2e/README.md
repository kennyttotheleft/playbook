# E2E テストについて

主に、公開後のリグレッションテストとして E2E テストを利用しています。

## Testing ツール

TestCafe: [https://testcafe.io/](https://testcafe.io/)

## Severities

これらのレベルがテストケースで使用されています。

- blocker
- critical
- normal
- minor
- trivial

Ref: [testcafe-reporter-allure](https://www.npmjs.com/package/testcafe-reporter-allure/v/1.0.3#severities)

## E2E テストディレクトリの構成

```
__test__/e2e
├── helper <- for helpers
├── model  <- for page object class
│   ├── en_us
│   │   ├── someEnglishPage.js
│   │   ...
│   │   └── ...
│   └── ja_jp
│       ├── someJapanesePage.js
│       ...
│       └── ...
└── test_group <- for test cases
    ├── module_test
    │   └── m1_some_module
    │       ├── l1_en_us
    │       │   ├── c1_english_module.js
    │       │   └── ...
    │       └── l2_ja_jp
    └── page_test
        └── p1_top
            ├── l1_en_us
            │   └── c1_english_page.js
            └── l2_ja_jp
                └── c1_japanese_page.js
```

## リグレッションテストケース

English, Japanese 画面ともにテスト項目は同様になっています。

### Playbook トップ画面

- Cookie consent 用 Cookie が無い状態で画面にアクセスすると Cookie consent メニューが表示される。

### Cookie consent メニュー

- Cookie consent メニューには Accept ボタンが表示されている。
- Cookie consent メニューには Settings 選択メニューが表示される。
- Cookie consent メニューの説明文内にある、Read more テキストをクリックすると以下の URL に遷移できる。
  - 英語版
    - 本番：/playbook/cookies/
    - ローカル：/cookies/
  - 日本語版
    - 本番：/playbook/ja_jp/cookies/
    - ローカル：/ja_jp/cookies/
- Accept ボタンをクリック後、画面をリロードすると Cookie consent メニューが表示されなくなる。
- Settings ボタンをクリックすると、保存内容設定モーダルが表示される。

### Cookie consent 設定モーダル

- モーダルクローズボタンが表示されている。
- モーダルクローズボタンをクリックするとモーダルが閉じ、Cookie consent メニューが表示された状態の playbook 画面が表示される。
- Cookie usage の本文テキスト内にある Read more テキストをクリックすると以下の URL に遷移できる。
  - 英語版
    - 本番：/playbook/cookies/
    - ローカル：/cookies/
  - 日本語版
    - 本番：/playbook/ja_jp/cookies/
    - ローカル：/ja_jp/cookies/
- Accept all ボタンをクリックするとモーダルが閉じ、playbook 画面では Cookie consent メニューが表示されない状態となる。
  - その後、playbook 画面をリロードすると、Cookie consent メニューが表示されなくなる。
- Analytics cookies のスイッチメニューの初期状態は OFF になっている。
  - Analytics cookies のスイッチメニューが OFF の状態で Save settings ボタンをクリックすると、Cookie consent メニューが表示された状態の playbook 画面が表示される。
  - Analytics cookies のスイッチメニューが OFF の状態で Save settings ボタンをクリックして表示された playbook 画面をリロードすると Cookie consent メニューが表示される。
  - Analytics cookies のスイッチメニューが ON の状態で Save settings ボタンをクリックすると、Cookie consent メニューが非表示の状態の playbook 画面が表示される。
  - Analytics cookies のスイッチメニューが ON の状態で Save settings ボタンをクリックして表示された playbook 画面をリロードすると Cookie consent メニューが非表示になる。