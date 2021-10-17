const createTestCafe = require('testcafe');

(async function () {
    const testcafe = await createTestCafe('localhost', 1337, 1338);

    try {
        const runner = testcafe.createRunner();
        await runner
            .src(['__tests__/e2e/'])
            .browsers([
                // userAgent assignment is only for chrome browser
                'chrome:emulation:userAgent=TEST_CAFE_REGRESSION',
            ])
            .run();
    } finally {
        await testcafe.close();
    }
})();
