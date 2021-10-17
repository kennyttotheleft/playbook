/**
 * Returns a test case code
 * @param {string} testCode
 * @param {int} testNumber
 * @returns {string}
 */
function getCaseCode(testCode, testNumber) {
    if(!testCode || !testNumber) {
        return '';
    }
    return testCode + testNumber.toString();
}

/**
 * Returns a test case title
 * @param {string} caseCode
 * @param {string} caseTitle
 * @returns {string}
 */
function getCaseTitle(caseCode, caseTitle) {
    if(!caseCode || !caseTitle) {
        return '';
    }
    return caseCode + ':' + caseTitle;
}

export {
    getCaseCode,
    getCaseTitle
};