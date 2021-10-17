import {
    t,
    Selector
} from 'testcafe';

class CookieConsentSettingsModal {
    constructor() {
        this.modal = Selector('#c-s-in');
        this.title = Selector('#c-s-in #s-ttl').withAttribute('role', 'heading');
        this.closeButton = Selector('button#s-c-bn');
        this.analyitcsCookiesCheckbox = Selector('input.c-tgl')
            .withAttribute('value', 'analytics_cookies')
            .nth(0);
        this.acceptAllButton = Selector('button#s-all-bn');
        this.saveSettingsButton = Selector('button#s-sv-bn');
        this.cookiePolicyLink = Selector('#c-txt a.cc-link')
            .withAttribute('aria-label', 'Cookie policy')
            .withExactText('Read more')
            .nth(0);
    }

    async clickCloseBtn() {
        await t.click(this.closeButton);
    }

    async clickAnalyitcsCookiesCheckbox() {
        await t.click(this.analyitcsCookiesCheckbox);
    }

    async clickAcceptAllBtn() {
        await t.click(this.acceptAllButton);
    }

    async clickSaveSettingsBtn() {
        await t.click(this.saveSettingsButton);
    }

    async clickCookiePolicyLink() {
        await t.click(this.cookiePolicyLink);
    }
}

export default new CookieConsentSettingsModal();