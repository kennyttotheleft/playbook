const PROD_URL = 'https://tanakaoriginal.github.io/playbook';
const TESTING_URL = '';
const STG_URL = '';
const DEV_URL = '';
const LOCAL_URL = 'http://localhost:4000';

const PROD_LABEL = 'production';
const STG_LABEL = 'staging';
const TESTING_LABEL = 'testing';
const DEV_LABEL = 'development';
const LOCAL_LABEL = 'local';

const PAGE_ROOT_PATH_EN_US = '/';
const PAGE_ROOT_PATH_JA_JP = '/ja_jp/';
const LANG_LABEL_EN_US = 'en_us';
const LANG_LABEL_JA_JP = 'ja_jp';

/**
 * Returns an environment label according to the ENVIRONMENT env var
 * @returns {string} An environment label
 */
function getEnv() {
    switch (process.env.ENVIRONMENT) {
        case PROD_LABEL:
            return PROD_LABEL;
        case STG_LABEL:
            return STG_LABEL;
        case TESTING_LABEL:
            return TESTING_LABEL;
        case DEV_LABEL:
            return DEV_LABEL;
        case LOCAL_LABEL:
            return LOCAL_LABEL;
        default:
            return LOCAL_LABEL;
    }
}

/**
 * Returns a site root URL according to the environment parameter
 * @param {string} env label for the envirnment
 *   production
 *   testing
 *   staging
 *   development
 *   local
 * @returns {string} A site root URL
 */
function getSiteUrl(env) {
    switch (env) {
        case PROD_LABEL:
            return PROD_URL;
        case TESTING_LABEL:
            return TESTING_URL;
        case STG_LABEL:
            return STG_URL;
        case DEV_LABEL:
            return DEV_URL;
        case LOCAL_LABEL:
            return LOCAL_URL;
        default:
            return LOCAL_URL;
    }
}

/**
 * Returns page root path for the specific language code.
 * @param {string} lang language label
 *   * en_us
 *   * ja_jp
 * @returns {string}
 */
function getLangRootPath(lang) {
    switch (lang) {
        case LANG_LABEL_EN_US:
            return PAGE_ROOT_PATH_EN_US;
        case LANG_LABEL_JA_JP:
            return PAGE_ROOT_PATH_JA_JP;
        default:
            return PAGE_ROOT_PATH_EN_US;
    }
}

/**
 * Returns root URL for the language on the environment
 * @param {string} lang language label
 *   * en_us
 *   * ja_jp
 * @param {string} env environment label
 *   * production
 *   * staging
 *   * testing
 *   * development
 *   * local
 */
function getLangRootUrl(lang, env) {
    const siteRootUrl = getSiteUrl(env);
    const langRootPath = getLangRootPath(lang);
    return siteRootUrl + langRootPath;
}

class SiteHelper {
    /**
     * @param {string} lang language label
     *   * en_us
     *   * ja_jp
     */
    constructor(lang) {
        this.lang = lang;
    }

    /**
     * Returns a language specific page path
     * @param {string} pageBasePath
     * @returns {string}
     */
    getPagePath(pageBasePath) {
        const langRootPath = getLangRootPath(this.lang);
        if (!pageBasePath || pageBasePath === '/') {
            return langRootPath;
        }
        return langRootPath + pageBasePath;
    }

    /**
     * Returns a language specific page URL
     * @param {string} pageBasePath
     * @returns {string}
     */
    getPageUrl(pageBasePath) {
        const env = getEnv();
        const langRootUrl = getLangRootUrl(this.lang, env);
        if (!pageBasePath || pageBasePath === '/') {
            return langRootUrl;
        }
        return langRootUrl + pageBasePath;
    }
}

export default SiteHelper;