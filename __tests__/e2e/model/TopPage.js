import {t, Selector } from 'testcafe';
import SiteHelper from '../helper/SiteHelper';

class TopPage {
    /**
     * @param {string} lang language label
     */
    constructor (lang) {
        const basePath = '/';
        const siteHelper = new SiteHelper(lang);
        this.pagePath = siteHelper.getPagePath(basePath);
        this.pageUrl = siteHelper.getPageUrl(basePath);

        this.title = Selector('h1#digital-services-playbook');
    }

    async open() {
        await t
            .navigateTo(this.pageUrl);
    }
}

export default TopPage;