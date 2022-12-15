import { TestCarte } from "./test-carte";
import { TestJoueur } from "./test-joueur";
import { TestMeilleureCarte } from "./test-meilleure-carte/test-meilleure-carte";

export const TestType = {
    ALL: 'ALL', CARTE: 'CARTE', JOUEUR: 'JOUEUR', MEILLEURE_CARTE: 'MEILLEURE_CARTE'
}

export class Tests {
    runTest(test) {
        if (test === TestType.ALL || test === TestType.CARTE) {
            const testCarte = new TestCarte();
            testCarte.runAll();
        } 
        if (test === TestType.ALL || test === TestType.JOUEUR) {
            const testJoueur = new TestJoueur();
            testJoueur.runAll();
        }        
        if (test === TestType.ALL || test === TestType.MEILLEURE_CARTE) {
            const testMeilleure = new TestMeilleureCarte();
            testMeilleure.runAll();
        }
    }
}