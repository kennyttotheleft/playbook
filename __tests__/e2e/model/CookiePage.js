import {t, Selector } from 'testcafe';
import SiteHelper from '../helper/SiteHelper';

class CookiePage {
    /**
     * @param {string} lang language label
     */
    constructor (lang) {
        const basePath = '/cookies';
        const siteHelper = new SiteHelper(lang)
        this.pagePath = siteHelper.getPagePath(basePath)
        this.pageUrl = siteHelper.getPageUrl(basePath);

        this.title = Selector('h1#cookies');
    }

    async open() {
        await t
            .navigateTo(this.pageUrl);
    }
}

export default CookiePage;