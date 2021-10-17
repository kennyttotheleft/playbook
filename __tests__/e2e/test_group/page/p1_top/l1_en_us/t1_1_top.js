import {
    getCaseCode,
    getCaseTitle
} from '../../../../helper/testHelper';
import TopPage from '../../../../model/TopPage';

const lang = 'en_us';
const topPage = new TopPage(lang);

const testCode = 'P1-L1-T1_1-C';
let caseCode = '';
let testTitle = '';

fixture('Top Page')
    .meta('fixtureID', testCode)
    .meta({
        creationDate: '2021/10/15'
    })
    .page(topPage.pageUrl);

// ページタイトルが正しいこと
caseCode = getCaseCode(testCode, 1);
testTitle = getCaseTitle(caseCode, 'Page title text should be collect');
test
    .meta('testID', caseCode)
    .meta({
        severity: 'normal',
        testedAppVersion: '0.9.1'
    })
    (testTitle, async t => {
        await t.expect(topPage.title.innerText).eql('Digital Services Playbook');
    });