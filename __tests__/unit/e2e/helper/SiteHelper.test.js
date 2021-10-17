// const SiteHelper = require('../../../e2e/helper/SiteHelper');

import {jest} from '@jest/globals';
import SiteHelper from '../../../e2e/helper/SiteHelper';

describe('SiteHelper', () => {
  const OLD_ENV = process.env;
  let testTitle;

  beforeEach(() => {
    jest.resetModules() // Most important - it clears the cache
    process.env = {
      ...OLD_ENV
    }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  testTitle = 'env: %s, lang: %s, getPagePath(%s) -> %s';
  test.each([
    ['', 'en_us', '', ''],
    ['', 'en_us', '/', '/'],
    ['', 'en_us', '/cookie', '/cookie/'],
    ['develpment', 'en_us', '', ''],
    ['develpment', 'en_us', '/', '/'],
    ['develpment', 'en_us', '/cookie', '/cookie/'],
    ['staging', 'en_us', '', ''],
    ['staging', 'en_us', '/', '/'],
    ['staging', 'en_us', '/cookie', '/cookie/'],
    ['testing', 'en_us', '', ''],
    ['testing', 'en_us', '/', '/'],
    ['testing', 'en_us', '/cookie', '/cookie/'],
    ['production', 'en_us', '', ''],
    ['production', 'en_us', '/', '/playbook/'],
    ['production', 'en_us', '/cookie', '/playbook/cookie/'],
    ['', 'ja_jp', '', ''],
    ['', 'ja_jp', '/', '/ja_jp/'],
    ['', 'ja_jp', '/cookie', '/ja_jp/cookie/'],
    ['develpment', 'ja_jp', '', ''],
    ['develpment', 'ja_jp', '/', '/ja_jp/'],
    ['develpment', 'ja_jp', '/cookie', '/ja_jp/cookie/'],
    ['staging', 'ja_jp', '', ''],
    ['staging', 'ja_jp', '/', '/ja_jp/'],
    ['staging', 'ja_jp', '/cookie', '/ja_jp/cookie/'],
    ['testing', 'ja_jp', '', ''],
    ['testing', 'ja_jp', '/', '/ja_jp/'],
    ['testing', 'ja_jp', '/cookie', '/ja_jp/cookie/'],
    ['production', 'ja_jp', '', ''],
    ['production', 'ja_jp', '/', '/playbook/ja_jp/'],
    ['production', 'ja_jp', '/cookie', '/playbook/ja_jp/cookie/'],
  ])(testTitle, (env, lang, path, expected) => {
    process.env.ENVIRONMENT = env;
    const siteHelper = new SiteHelper(lang);
    expect(siteHelper.getPagePath(path)).toBe(expected);
  });

  testTitle = 'env: %s, lang: %s, getPageUrl(%s) -> %s';
  test.each([
    ['', 'en_us', '', ''],
    ['', 'en_us', '/', 'http://localhost:4000/'],
    ['', 'en_us', '/cookie', 'http://localhost:4000/cookie/'],
    ['', 'ja_jp', '', ''],
    ['', 'ja_jp', '/', 'http://localhost:4000/ja_jp/'],
    ['', 'ja_jp', '/cookie', 'http://localhost:4000/ja_jp/cookie/'],
    ['develpment', 'en_us', '', ''],
    ['develpment', 'en_us', '/', 'http://localhost:4000/'],
    ['develpment', 'en_us', '/cookie', 'http://localhost:4000/cookie/'],
    ['develpment', 'ja_jp', '', ''],
    ['develpment', 'ja_jp', '/', 'http://localhost:4000/ja_jp/'],
    ['develpment', 'ja_jp', '/cookie', 'http://localhost:4000/ja_jp/cookie/'],
    ['staging', 'en_us', '', ''],
    ['staging', 'en_us', '/', '/'],
    ['staging', 'en_us', '/cookie', '/cookie/'],
    ['staging', 'ja_jp', '', ''],
    ['staging', 'ja_jp', '/', '/ja_jp/'],
    ['staging', 'ja_jp', '/cookie', '/ja_jp/cookie/'],
    ['testing', 'en_us', '', ''],
    ['testing', 'en_us', '/', '/'],
    ['testing', 'en_us', '/cookie', '/cookie/'],
    ['testing', 'ja_jp', '', ''],
    ['testing', 'ja_jp', '/', '/ja_jp/'],
    ['testing', 'ja_jp', '/cookie', '/ja_jp/cookie/'],
    ['production', 'en_us', '', ''],
    ['production', 'en_us', '/', 'https://tanakaoriginal.github.io/playbook/'],
    ['production', 'en_us', '/cookie', 'https://tanakaoriginal.github.io/playbook/cookie/'],
    ['production', 'ja_jp', '', ''],
    ['production', 'ja_jp', '/', 'https://tanakaoriginal.github.io/playbook/ja_jp/'],
    ['production', 'ja_jp', '/cookie', 'https://tanakaoriginal.github.io/playbook/ja_jp/cookie/'],
  ])(testTitle, (env, lang, path, expected) => {
    process.env.ENVIRONMENT = env;
    const siteHelper = new SiteHelper(lang);
    expect(siteHelper.getPageUrl(path)).toBe(expected);
  });
});