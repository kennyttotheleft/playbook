import {
    getCaseCode,
    getCaseTitle
} from '../../../../helper/testHelper';
import {
    getPageUrl
} from '../../../../helper/clientHelper';

import TopPage from '../../../../model/TopPage';
import CookiePage from '../../../../model/CookiePage';
import cookieConsentMenu from '../../../../model/CookieConsentMenu'
import cookieConsentSettingModal from '../../../../model/CookieConsentSettingsModal'

const lang = 'en_us';
const topPage = new TopPage(lang);
const cookiePage = new CookiePage(lang);

const testCode = 'P1-L1-T1_2_1-C';
let caseCode = '';
let testTitle = '';

fixture('Cookie consent menu')
    .meta('fixtureID', testCode)
    .meta({
        creationDate: '2021/10/14'
    })
    .page(topPage.pageUrl);

//
// Checking UI visiblity
//

// メニュータイトルが正しいこと
caseCode = getCaseCode(testCode, 1);
testTitle = getCaseTitle(caseCode,
    'Menu title should be collect');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'normal',
        testedAppVersion: '0.9.1'
    })
    (testTitle, async t => {
        await t
            .expect(cookieConsentMenu.title.visible).ok()
            .expect(cookieConsentMenu.title.innerText).eql('Cookies on the Playbook site');
    });

// Accept ボタンが表示されていること
caseCode = getCaseCode(testCode, 2);
testTitle = getCaseTitle(caseCode,
    'Accept button should be visible');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    (testTitle, async t => {
        await t
            .expect(cookieConsentMenu.acceptButton.visible).ok()
    });

// Settings ボタンが表示されていること
caseCode = getCaseCode(testCode, 3);
testTitle = getCaseTitle(caseCode,
    'Settings button should be visible');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'normal',
        testedAppVersion: '0.9.1'
    })
    (testTitle, async t => {
        await t
            .expect(cookieConsentMenu.settingsButton.visible).ok()
    });

// Cookie policy ページへのリンクが表示されていること
caseCode = getCaseCode(testCode, 4);
testTitle = getCaseTitle(caseCode,
    'Cookie policy link should be visible and the link should be the policy page path');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'normal',
        testedAppVersion: '0.9.1'
    })
    (testTitle, async t => {
        await t
            .expect(cookieConsentMenu.cookiePolicyLink.visible).ok()
            .expect(cookieConsentMenu.cookiePolicyLink.getAttribute('href'))
            .eql(cookiePage.pagePath);
    });

//
// Checking UI action
//

// Settings ボタンをクリックしたら settings モーダルが表示されること
caseCode = getCaseCode(testCode, 5);
testTitle = getCaseTitle(caseCode,
    'Settings modal should be visible after the settings button was clicked');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'normal',
        testedAppVersion: '0.9.1'
    })
    (testTitle, async t => {
        await cookieConsentMenu.clickSettingsBtn();
        await t
            .expect(cookieConsentSettingModal.title.visible).ok()
            .expect(cookieConsentSettingModal.title.innerText).eql('Cookie preferences');
    });

// Accept ボタンをクリックした後は、Cookie consent メニューが表示されなくなること。
// Accept ボタンをクリックした後は、画面をリロードしても Cookie consent メニューが表示されなくなること。
caseCode = getCaseCode(testCode, 6);
testTitle = getCaseTitle(caseCode,
    'Cookie consent menu should not be displayed after the accept button was clicked');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'critical',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await cookieConsentMenu.clickAcceptBtn();
        // @link [The element that matches the specified selector is not visible.#1994 ](https://github.com/DevExpress/testcafe/issues/1994#issuecomment-350790299)
        await t.expect(cookieConsentMenu.title.visible).notOk();
    })
    (testTitle, async t => {
        // Check if the menu was not displayed everytime for when the page reloaded 3 times.

        // @link [TestCafe how to reload actual page](https://stackoverflow.com/questions/56157048/testcafe-how-to-reload-actual-page)
        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();

        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();

        await t.eval(() => location.reload());
        await t.expect(cookieConsentMenu.menu.visible).notOk();
    });

// Cookie policy ページへのリンクをクリックすると Cookie policy ページに遷移すること
/**
 * This test is skipped due to the client side error.
 */
caseCode = getCaseCode(testCode, 7);
testTitle = getCaseTitle(caseCode,
    'Cookie policy page should be displayed when the cookie policy link was clicked (workaround)');
test.skip
    .meta('testID', caseCode)
    .meta({
        severity: 'normal',
        testedAppVersion: '0.9.1'
    })
    .before(async t => {
        await t.expect(cookieConsentMenu.cookiePolicyLink.visible).ok();
        await cookieConsentMenu.clickCookiePolicyLink();
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
caseCode = getCaseCode(testCode, 8);
testTitle = getCaseTitle(caseCode,
    'Cookie policy page should be displayed when the cookie policy link was clicked');
test.skip
    .meta('testID', caseCode)
    .meta({
        severity: 'normal',
        testedAppVersion: '0.9.1'
    })
    (testTitle, async t => {
        await t.expect(cookieConsentMenu.cookiePolicyLink.visible).ok();
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
        await cookieConsentMenu.clickCookiePolicyLink();
        await t
            .wait(2000)
            .expect(await getPageUrl()).eql(cookiePage.pageUrl);
    });