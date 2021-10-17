import {
    ClientFunction
} from 'testcafe';

const getPageUrl = ClientFunction(() => window.location.href);

const getCookie = ClientFunction(() => document.cookie);

export {
    getPageUrl,
    getCookie
};