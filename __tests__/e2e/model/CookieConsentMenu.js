import {
    t,
    Selector
} from 'testcafe';

class CookieConsentMenu {
    constructor() {
        this.menu = Selector('#cc--main');
        this.title = Selector('#cc--main #c-ttl');
        this.acceptButton = Selector('button#c-p-bn');
        this.settingsButton = Selector('button#c-s-bn');
        this.cookiePolicyLink = Selector('#c-txt a')
            .withAttribute('class', 'cc-link')
            .withAttribute('aria-label', 'Cookie policy')
            .withExactText('Read more')
            .nth(0);
    }

    async clickAcceptBtn() {
        await t.click(this.acceptButton);
    }

    async clickSettingsBtn() {
        await t.click(this.settingsButton);
    }

    async clickCookiePolicyLink() {
        await t.click(this.cookiePolicyLink);
    }
}

export default new CookieConsentMenu();