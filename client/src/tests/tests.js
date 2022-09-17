import { TestCarte } from "./test-carte";

export const TestType = {
    CARTES: 'CARTES'
}

export class Tests {
    runTest(test) {
        switch (test) {
            case TestType.CARTES: {
                const testCarte = new TestCarte();
                testCarte.runAll();
                break;
            }
            default: {
                break;
            }
        }
    }
}