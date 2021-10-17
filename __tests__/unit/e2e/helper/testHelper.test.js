import {
    jest
} from '@jest/globals';
import {
    getCaseCode,
    getCaseTitle
} from '../../../e2e/helper/testHelper';

describe('testHelper', () => {
    let testTitle;

    beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
    });

    afterAll(() => {});

    testTitle = 'getCaseCode(%s, %i)';
    test.each([
        [undefined, undefined, ''],
        [undefined, null, ''],
        [undefined, 0, ''],
        [undefined, 1, ''],
        [undefined, '', ''],
        [undefined, '1', ''],
        [null, undefined, ''],
        [null, null, ''],
        [null, 0, ''],
        [null, 1, ''],
        [null, '', ''],
        [null, '1', ''],
        [0, undefined, ''],
        [0, null, ''],
        [0, 0, ''],
        [0, 1, ''],
        [0, '', ''],
        [0, '1', ''],
        ['', undefined, ''],
        ['', null, ''],
        ['', 0, ''],
        ['', 1, ''],
        ['', '', ''],
        ['', '1', ''],
        ['some-test-code-c', undefined, ''],
        ['some-test-code-c', null, ''],
        ['some-test-code-c', 0, ''],
        ['some-test-code-c', 1, 'some-test-code-c1'],
        ['some-test-code-c', '1', 'some-test-code-c1'],
    ])(testTitle, (testCode, caseNumber, expected) => {
        expect(getCaseCode(testCode, caseNumber)).toBe(expected);
    });

    testTitle = 'getCaseTitle(%s, %s)';
    test.each([
        [undefined, undefined, ''],
        [undefined, null, ''],
        [undefined, 0, ''],
        [undefined, 1, ''],
        [undefined, '', ''],
        [undefined, '1', ''],
        [null, undefined, ''],
        [null, null, ''],
        [null, 0, ''],
        [null, 1, ''],
        [null, '', ''],
        [null, '1', ''],
        [0, undefined, ''],
        [0, null, ''],
        [0, 0, ''],
        [0, 1, ''],
        [0, '', ''],
        [0, '1', ''],
        ['', undefined, ''],
        ['', null, ''],
        ['', 0, ''],
        ['', 1, ''],
        ['', '', ''],
        ['', '1', ''],
        ['some-case-code-c1', undefined, ''],
        ['some-case-code-c1', null, ''],
        ['some-case-code-c1', 0, ''],
        ['some-case-code-c1', 1, 'some-case-code-c1:1'],
        ['some-case-code-c1', 'case-title', 'some-case-code-c1:case-title'],
    ])(testTitle, (caseCode, caseTitle, expected) => {
        expect(getCaseTitle(caseCode, caseTitle)).toBe(expected);
    });

});