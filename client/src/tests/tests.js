import { TestCarte } from "./test-carte";
import { TestJoueur } from "./test-joueur";

export const TestType = {
    CARTE: 'CARTE', JOUEUR: 'JOUEUR'
}

export class Tests {
    runTest(test) {
        switch (test) {
            case TestType.CARTE: {
                const testCarte = new TestCarte();
                testCarte.runAll();
                break;
            }
            case TestType.JOUEUR: {
                const testJoueur = new TestJoueur();
                testJoueur.runAll();
                break;
            }
            default: {
                break;
            }
        }
    }
}