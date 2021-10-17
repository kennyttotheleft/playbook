import {
    getCaseCode,
    getCaseTitle
} from '../../../../helper/testHelper';
import {
    getCookie
} from '../../../../helper/clientHelper';
import TopPage from '../../../../model/TopPage';
import CookiePage from '../../../../model/CookiePage';
import cookieConsentMenu from '../../../../model/CookieConsentMenu'
import cookieConsentSettingModal from '../../../../model/CookieConsentSettingsModal'

const lang = 'en_us';
const topPage = new TopPage(lang);
const cookiePage = new CookiePage(lang);

const testCode = 'P1-L1-T1_2_2-C';
let caseCode = '';
let testTitle = '';

fixture('Cookie consent settings modal')
    .meta('fixtureID', testCode)
    .meta({
        creationDate: '2021/10/15'
    })
    .page(topPage.pageUrl)
    .beforeEach(async t => {})
    .afterEach(async t => {});

//
// Checking UI visiblity
//

// Settings モーダルのタイトルが正しいこと
caseCode = getCaseCode(testCode, 1);
testTitle = getCaseTitle(caseCode,
    'Menu title text should be collect');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'normal',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await t.expect(cookieConsentSettingModal.title.innerText).eql('Cookie preferences');
    });

// Close ボタンが表示されていること
caseCode = getCaseCode(testCode, 2);
testTitle = getCaseTitle(caseCode,
    'Close button should be visible');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'normal',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await t.expect(cookieConsentSettingModal.closeButton.visible).ok();
    });

// Analytics cookie チェックボックスが表示されていること
caseCode = getCaseCode(testCode, 3);
testTitle = getCaseTitle(caseCode,
    'Analytics cookie checkbox should be visible');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await t.expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.visible).ok();
    });

// Accept all ボタンが表示されていること
caseCode = getCaseCode(testCode, 4);
testTitle = getCaseTitle(caseCode,
    'Accept all button should be visible');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await t.expect(cookieConsentSettingModal.acceptAllButton.visible).ok();
    });


// Save settings ボタンが表示されていること
caseCode = getCaseCode(testCode, 5);
testTitle = getCaseTitle(caseCode,
    'Save settings button should be visible');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await t.expect(cookieConsentSettingModal.saveSettingsButton.visible).ok();
    });

// Cookie policy ページへのリンクが表示されていること
caseCode = getCaseCode(testCode, 6);
testTitle = getCaseTitle(caseCode,
    'Cookie policy link should be visible');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await t
            .expect(cookieConsentSettingModal.cookiePolicyLink.visible).ok()
    });

//
// Checking UI action
//

// クローズボタンをクリックすると Settings モーダルが非表示になること
caseCode = getCaseCode(testCode, 7);
testTitle = getCaseTitle(caseCode,
    'Settings modal should be invisible after when the close button was clicked');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await cookieConsentSettingModal.clickCloseBtn();
        await t
            .expect(cookieConsentSettingModal.modal.visible).notOk();
    });

// Analytics cookie チェックボックスがオフの状態で Save settings ボタンをクリックするとモーダルは非表示になること
// Save settings ボタンをクリック後に画面をリロードしても Cookie consent メニューが表示されないこと
// -- UI visiblity check
// -- Save settings button click
// -- Analytics cookie checkbox: off
caseCode = getCaseCode(testCode, 8);
testTitle = getCaseTitle(caseCode,
    'Settings modal should be invisible after when the save settings button was clicked with the analytics cookie off');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).notOk();
        await cookieConsentSettingModal.clickSaveSettingsBtn();
        await t
            .expect(cookieConsentSettingModal.modal.visible).notOk();

        // Check if the menu was not displayed everytime for when the page reloaded 3 times.
        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();

        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();

        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();
    });

// Analytics cookie チェックボックスがオフの状態で Save settings ボタンをクリックすると Cookie consent 用の Cookie データのみが保存されること
// -- Cookie data check
// -- Save settings button click
// -- Analytics cookie checkbox: off
caseCode = getCaseCode(testCode, 9);
testTitle = getCaseTitle(caseCode,
    'Only cookie for cookie consent should be saved after when the save setting button was clicked with the analytics cookie off');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).notOk();
        await cookieConsentSettingModal.clickSaveSettingsBtn();
        await t
            .expect(cookieConsentSettingModal.modal.visible).notOk();
    })
    (testTitle, async t => {
        const cookie = await getCookie();
        await t.expect(cookie).eql('cc_cookie={"level":[],"revision":0}');
    });

// Analytics cookie チェックボックスがオンの状態で Save settings ボタンをクリックするとモーダルは非表示になること
// Save settings ボタンをクリック後に画面をリロードしても Cookie consent メニューが表示されないこと
// -- UI visiblity check
// -- Save settings button click
// -- Analytics cookie radio: on
caseCode = getCaseCode(testCode, 10);
testTitle = getCaseTitle(caseCode,
    'Settings modal should be invisible after when the save setting button was clicked with the analytics cookie on');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).notOk();
        await cookieConsentSettingModal.clickAnalyitcsCookiesCheckbox();
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).ok();
        await cookieConsentSettingModal.clickSaveSettingsBtn();
        await t
            .expect(cookieConsentSettingModal.modal.visible).notOk();

        // Check if the menu was not displayed everytime for when the page reloaded 3 times.
        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();

        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();

        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();
    });

// Analytics cookie チェックボックスがオフの状態で Save settings ボタンをクリックすると Cookie consent と Google Analytics 用の Cookie データが保存されること
// -- Cookie data check
// -- Save settings button click
// -- Analytics cookie checkbox: on
caseCode = getCaseCode(testCode, 11);
testTitle = getCaseTitle(caseCode,
    'GA Tracking cookie and cookie consent cookie should be saved after when the save setting button was clicked with the analytics cookie on');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).notOk();
        await cookieConsentSettingModal.clickAnalyitcsCookiesCheckbox();
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).ok();
        await cookieConsentSettingModal.clickSaveSettingsBtn();
        await t
            .expect(cookieConsentSettingModal.modal.visible).notOk();
    })
    (testTitle, async t => {
        const cookie = await getCookie();
        await t
            .expect(cookie).contains('cc_cookie={"level":["analytics_cookies"],"revision":0};')
            .expect(cookie).contains('_ga_')
            .expect(cookie).contains('_ga=')
    });

// Analytics cookie チェックボックスがオフの状態で Accept all ボタンをクリックするとモーダルは非表示になること
// Save settings ボタンをクリック後に画面をリロードしても Cookie consent メニューが表示されないこと
// -- UI visiblity check
// -- Accept all button click
// -- Analytics cookie checkbox: off
caseCode = getCaseCode(testCode, 12);
testTitle = getCaseTitle(caseCode,
    'Settings modal should be invisible after when the accept all button was clicked with the analytics cookie off');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).notOk();
        await cookieConsentSettingModal.clickAcceptAllBtn();

        // Check if the menu was not displayed everytime for when the page reloaded 3 times.
        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();

        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();

        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();
    });

// Analytics cookie チェックボックスがオフの状態で Accept all ボタンをクリックすると Google Analytics と Cookie consent 用の Cookie データが保存されること
// -- Cookie data check
// -- Accept all button click
// -- Analytics cookie checkbox: off
caseCode = getCaseCode(testCode, 13);
testTitle = getCaseTitle(caseCode,
    'GA Tracking cookie and cookie consent cookie should be saved after when the accept all button was clicked with the analytics cookie on');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).notOk();
        await cookieConsentSettingModal.clickAnalyitcsCookiesCheckbox();
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).ok();

        await cookieConsentSettingModal.clickAcceptAllBtn();
        await t
            .expect(cookieConsentSettingModal.modal.visible).notOk();
    })
    (testTitle, async t => {
        const cookie = await getCookie();
        await t
            .expect(cookie).contains('cc_cookie={"level":["analytics_cookies"],"revision":0};')
            .expect(cookie).contains('_ga_')
            .expect(cookie).contains('_ga=')
    });

// Analytics cookie チェックボックスがオンの状態で Accept all ボタンをクリックするとモーダルは非表示になること
// Save settings ボタンをクリック後に画面をリロードしても Cookie consent メニューが表示されないこと
// -- UI visiblity check
// -- Accept all button click
// -- Analytics cookie checkbox: on
caseCode = getCaseCode(testCode, 14);
testTitle = getCaseTitle(caseCode,
    'Settings modal should be invisible after when the accept all button was clicked with the analytics cookie on');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
    })
    (testTitle, async t => {
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).notOk();
        await cookieConsentSettingModal.clickAcceptAllBtn();
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).ok();

        await t
            .expect(cookieConsentSettingModal.modal.visible).notOk();

        // Check if the menu was not displayed everytime for when the page reloaded 3 times.
        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();

        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();

        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();
    });

// Analytics cookie チェックボックスがオンの状態で Accept all ボタンをクリックすると Google Analytics と Cookie consent 用の Cookie データが保存されること
// -- Cookie data check
// -- Accept all button click
// -- Analytics cookie radio: on
caseCode = getCaseCode(testCode, 15);
testTitle = getCaseTitle(caseCode,
    'GA Tracking cookie and cookie consent cookie should be saved after when the accept all button was clicked with the analytics cookie off');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickSettingsBtn();
        await t
            .expect(cookieConsentSettingModal.analyitcsCookiesCheckbox.checked).notOk();
        await cookieConsentSettingModal.clickAcceptAllBtn();

        await t
            .expect(cookieConsentSettingModal.modal.visible).notOk();
    })
    (testTitle, async t => {
        const cookie = await getCookie();
        await t
            .expect(cookie).contains('cc_cookie={"level":["analytics_cookies"],"revision":0};')
            .expect(cookie).contains('_ga_')
            .expect(cookie).contains('_ga=')
    });

// Cookie policy ページへのリンクをクリックすると Cookie policy ページに遷移すること
/**
 * This test is skipped due to the client side error.
 */
caseCode = getCaseCode(testCode, 16);
testTitle = getCaseTitle(caseCode,
    'Cookie policy page should be displayed when the cookie policy link was clicked (workaround)');
test.skip
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await t.expect(cookieConsentSettingModal.cookiePolicyLink.visible).ok();
        await cookieConsentSettingModal.clickCookiePolicyLink();
    })
    (testTitle, async t => {
        /**
         1) - Error in test.before hook -
            A JavaScript error occurred on "http://localhost:4000/cookies/".
            Repeat test actions in the browser and check the console for errors.
            To ignore client-side JavaScript errors, enable the "--skip-js-errors" CLI option, or set the "skipJsErrors" configuration file property to "true".
            If the website only throws this error when you test it with TestCafe, please create a new issue at:
            "https://github.com/DevExpress/testcafe/issues/new?template=bug-report.md".

            JavaScript error details:
            ReferenceError: $ is not defined
                at http://localhost:4000/assets/js/cookie-consent.js:5:1
         */
        await t.expect(await getPageUrl()).eql(cookiePage.pageUrl);
    });

// Cookie policy ページへのリンクをクリックすると Cookie policy ページに遷移すること
/**
 * This test is skipped due to the client side error.
 */
caseCode = getCaseCode(testCode, 17);
testTitle = getCaseTitle(caseCode,
    'Cookie policy page should be displayed when the cookie policy link was clicked');
test.skip
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    (testTitle, async t => {
        await t.expect(cookieConsentSettingModal.cookiePolicyLink.visible).ok();
        /**
         * The click action produce this client error below.
         *
            1) A JavaScript error occurred on "http://localhost:4000/cookies/".
               Repeat test actions in the browser and check the console for errors.
               To ignore client-side JavaScript errors, enable the "--skip-js-errors" CLI option, or set the "skipJsErrors"
               configuration file property to "true".
               If the website only throws this error when you test it with TestCafe, please create a new issue at:
               "https://github.com/DevExpress/testcafe/issues/new?template=bug-report.md".

               JavaScript error details:
               ReferenceError: $ is not defined
                    at http://localhost:4000/assets/js/cookie-consent.js:5:1
        *
        */
        await cookieConsentSettingModal.clickCookiePolicyLink();
        await t
            .wait(2000)
            .expect(await getPageUrl()).eql(cookiePage.pageUrl);
    });