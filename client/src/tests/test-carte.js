import { Carte, Couleur, Sorte } from "../models/carte";
import { Paquet } from "../models/paquet";

export class TestCarte {
    runAll() {
        const isChienTest = new IsChien();
        isChienTest.runAll();

        const isSecheTest = new IsSeche();
        isSecheTest.runAll();

        const isAtout = new IsAtout();
        isAtout.runAll();

        const isSorteDemandee = new IsSorteDemandee();
        isSorteDemandee.runAll();

        const isDisabled = new IsDisabled();
        isDisabled.runAll();

        const setFromPoids = new SetFromPoids();
        setFromPoids.runAll();
    }
}

// Tester la méthode Carte.isChien(atout, dixPasse)
export class IsChien {
    constructor() {
        this.paquet = new Paquet(true);
    }

    runAll() {
        this.bibitte();
        this.bibitteSansAtout();
        this.point();
        this.as();
        this.atout();
        this.jackDame10PasPasse();
        this.jackDame10Passe();
    }

    // Une bibitte n'est pas un chien
    bibitte() {
        const carte1 = this.paquet.getCarte(15, Sorte.JOKER);
        const carte2 = this.paquet.getCarte(16, Sorte.BLANCHE);
        const ok = !carte1.isChien(Sorte.PIQUE, true) && !carte2.isChien(Sorte.PIQUE, true);
        console.log(`${ok}: TestCarte: IsChien: bibitte`);
    }

    // Une bibitte sans atout est un chien
    bibitteSansAtout() {
        const carte1 = this.paquet.getCarte(15, Sorte.JOKER);
        const carte2 = this.paquet.getCarte(16, Sorte.BLANCHE);
        const ok = carte1.isChien(Sorte.SANS_ATOUT, true) && carte2.isChien(Sorte.SANS_ATOUT, true);
        console.log(`${ok}: TestCarte: IsChien: bibitteSansAtout`);
    }

    // Un point n'est pas un chien
    point() {
        const carte1 = this.paquet.getCarte(10, Sorte.PIQUE);
        const carte2 = this.paquet.getCarte(13, Sorte.PIQUE);
        const ok = !carte1.isChien(Sorte.COEUR, true) && !carte2.isChien(Sorte.COEUR, true);
        console.log(`${ok}: TestCarte: IsChien: point`);
    }

    // Un as n'est pas un chien
    as() {
        const carte = this.paquet.getCarte(14, Sorte.PIQUE);
        const ok = !carte.isChien(Sorte.COEUR, true);
        console.log(`${ok}: TestCarte: IsChien: as`);
    }

    // Les 7, 8, 9 sont des chiens
    septHuitNeuf() {
        const carte1 = this.paquet.getCarte(7, Sorte.PIQUE);
        const carte2 = this.paquet.getCarte(8, Sorte.PIQUE);
        const carte3 = this.paquet.getCarte(9, Sorte.PIQUE);
        const ok = !carte1.isChien(Sorte.COEUR, true) && !carte2.isChien(Sorte.COEUR, true) && !carte3.isChien(Sorte.COEUR, true);
        console.log(`${ok}: TestCarte: IsChien: septHuitNeuf`);
    }

    // Un chien d'atout n'est plus un chien
    atout() {
        const carte = this.paquet.cartes.find(c => c.sorte === Sorte.PIQUE && c.poids === 7);
        const ok = !carte.isChien(Sorte.PIQUE, true);
        console.log(`${ok}: TestCarte: IsChien: atout`);
    }

    // Jack et Dame ne sont pas des chiens si le 10 n'est pas passé
    jackDame10PasPasse() {
        const carte1 = this.paquet.cartes.find(c => c.sorte === Sorte.PIQUE && c.poids === 11);
        const carte2 = this.paquet.cartes.find(c => c.sorte === Sorte.PIQUE && c.poids === 12);
        const ok = !carte1.isChien(Sorte.COEUR, false) && !carte2.isChien(Sorte.COEUR, false);
        console.log(`${ok}: TestCarte: IsChien: jackDame10PasPasse`);
    }

    // Jack et Dame sont  des chiens si le 10 est passé
    jackDame10Passe() {
        const carte1 = this.paquet.cartes.find(c => c.sorte === Sorte.PIQUE && c.poids === 11);
        const carte2 = this.paquet.cartes.find(c => c.sorte === Sorte.PIQUE && c.poids === 12);
        const ok = carte1.isChien(Sorte.COEUR, true) && carte2.isChien(Sorte.COEUR, true);
        console.log(`${ok}: TestCarte: IsChien: jackDame10Passe`);
    }
}

// Tester la méthode Carte.isSeche(atout, dixPasse)
export class IsSeche {
    constructor() {
        this.paquet = new Paquet(true);
    }

    runAll() {
        this.seche();
        this.pasSeche();
        this.pasSecheBibitte();
    }

    // Carte sèche
    seche() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);
        const cartes = [
            this.paquet.getCarte(10, Sorte.COEUR),
            this.paquet.getCarte(7, Sorte.COEUR),
            this.paquet.getCarte(8, Sorte.PIQUE)
        ];
        const ok = carte.isSeche(cartes, Sorte.TREFLE);
        console.log(`${ok}: TestCarte: IsSeche: seche`);
    }

    // Carte pas sèche
    pasSeche() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);
        const cartes = [
            this.paquet.getCarte(10, Sorte.COEUR),
            this.paquet.getCarte(7, Sorte.PIQUE),
            this.paquet.getCarte(8, Sorte.PIQUE)
        ];
        const ok = !carte.isSeche(cartes, Sorte.TREFLE);
        console.log(`${ok}: TestCarte: isSeche: pasSeche`);
    }

    // Pas sèche si atout en présence de bibittes
    pasSecheBibitte() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);
        const cartes = [
            this.paquet.getCarte(10, Sorte.COEUR),
            this.paquet.getCarte(8, Sorte.PIQUE),
            this.paquet.getCarte(15, Sorte.JOKER)
        ];
        const ok = !carte.isSeche(cartes, Sorte.PIQUE);
        console.log(`${ok}: TestCarte: IsSeche: pasSecheBibitte`);
    }
}

// Tester la méthode Carte.isAtout(atout)
export class IsAtout {
    constructor() {
        this.paquet = new Paquet(true);
    }

    runAll() {
        this.atout();
        this.atoutBibitte();
        this.pasAtout();
        this.pasAtoutBibitte();
        this.sansAtout();
    }

    // Carte d'atout
    atout() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);

        const ok = carte.isAtout(Sorte.PIQUE);
        console.log(`${ok}: TestCarte: IsAtout: atout`);
    }

    // Carte pas d'atout
    pasAtout() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);

        const ok = !carte.isAtout(Sorte.TREFLE);
        console.log(`${ok}: TestCarte: IsAtout: pasAtout`);
    }

    // Bibittes d'atout
    atoutBibitte() {
        const carte1 = this.paquet.getCarte(15, Sorte.JOKER);
        const carte2 = this.paquet.getCarte(16, Sorte.BLANCHE);

        const ok = carte1.isAtout(Sorte.PIQUE) && carte2.isAtout(Sorte.PIQUE);
        console.log(`${ok}: TestCarte: IsAtout: atoutBibitte`);
    }

    // Bibittes sans atout
    pasAtoutBibitte() {
        const carte1 = this.paquet.getCarte(15, Sorte.JOKER);
        const carte2 = this.paquet.getCarte(16, Sorte.BLANCHE);

        const ok = !carte1.isAtout(Sorte.SANS_ATOUT) && !carte2.isAtout(Sorte.SANS_ATOUT);
        console.log(`${ok}: TestCarte: IsAtout: pasAtoutBibitte`);
    }

    // Sans atout
    sansAtout() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);

        const ok = !carte.isAtout(Sorte.SANS_ATOUT);
        console.log(`${ok}: TestCarte: IsAtout: sansAtout`);
    }
}

// Tester la méthode Carte.isSorteDemandee(sorteDemandee, atout)
export class IsSorteDemandee {
    constructor() {
        this.paquet = new Paquet(true);
    }

    runAll() {
        this.demandee();
        this.pasDemandee();
        this.atoutDemandeBibitte();
    }

    // Sorte demandee
    demandee() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);

        const ok = carte.isSorteDemandee(Sorte.PIQUE, Sorte.Pique);
        console.log(`${ok}: TestCarte: IsSorteDemandee: demandee`);
    }

    // Pas sorte demandee
    pasDemandee() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);

        const ok = carte.isSorteDemandee(Sorte.PIQUE, Sorte.TREFLE);
        console.log(`${ok}: TestCarte: IsSorteDemandee: pasDemandee`);
    }

    // Bibitte et atout demande
    atoutDemandeBibitte() {
        const carte1 = this.paquet.getCarte(15, Sorte.JOKER);
        const carte2 = this.paquet.getCarte(16, Sorte.BLANCHE);

        const ok = carte1.isSorteDemandee(Sorte.PIQUE, Sorte.PIQUE) && carte2.isSorteDemandee(Sorte.PIQUE, Sorte.PIQUE);
        console.log(`${ok}: TestCarte: IsSorteDemandee: atoutDemandeBibitte`);
    }

    // Bibittes sans atout
    pasAtoutBibitte() {
        const carte1 = this.paquet.getCarte(15, Sorte.JOKER);
        const carte2 = this.paquet.getCarte(16, Sorte.BLANCHE);

        const ok = !carte1.isAtout(Sorte.SANS_ATOUT) && !carte2.isAtout(Sorte.SANS_ATOUT);
        console.log(`${ok}: TestCarte: IsSorteDemandee: pasAtoutBibitte`);
    }
}

// Tester la méthode Carte.isDisabled(cartes, sorteDemandee, atout)
export class IsDisabled {
    constructor() {
        this.paquet = new Paquet(true);
    }

    runAll() {
        this.sorteDemandee();
        this.autreSorteADemandee();
        this.autreSorteAPasDemandee();
        this.atoutDemandeBibitte();
        this.atoutPasDemandeBibitte();
        this.pasSorteDemandee();
    }

    // Carte de la sorte demandee
    sorteDemandee() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);
        const cartes = [carte, this.paquet.getCarte(8, Sorte.COEUR), this.paquet.getCarte(10, Sorte.PIQUE)];

        const ok = !carte.isDisabled(cartes, Sorte.PIQUE, Sorte.COEUR);
        console.log(`${ok}: TestCarte: IsDisabled: sorteDemandee`);
    }

    // Carte pas de la sorte demandee et a la sorte demandee
    autreSorteADemandee() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);
        const cartes = [carte, this.paquet.getCarte(8, Sorte.PIQUE), this.paquet.getCarte(10, Sorte.TREFLE)];

        const ok = carte.isDisabled(cartes, Sorte.TREFLE, Sorte.COEUR);
        console.log(`${ok}: TestCarte: IsDisabled: autreSorteADemandee`);
    }

    // Carte pas de la sorte demandee et n'a pas la sorte demandee
    autreSorteAPasDemandee() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);
        const cartes = [carte, this.paquet.getCarte(8, Sorte.PIQUE), this.paquet.getCarte(10, Sorte.COEUR)];

        const ok = !carte.isDisabled(cartes, Sorte.TREFLE, Sorte.COEUR);
        console.log(`${ok}: TestCarte: IsDisabled: autreSorteAPasDemandee`);
    }

    // Bibitte quand atout est demandé
    atoutDemandeBibitte() {
        const carte1 = this.paquet.getCarte(15, Sorte.JOKER);
        const carte2 = this.paquet.getCarte(16, Sorte.BLANCHE);
        const cartes = [carte1, carte2, this.paquet.getCarte(8, Sorte.COEUR), this.paquet.getCarte(10, Sorte.PIQUE)];

        const ok = !carte1.isDisabled(cartes, Sorte.PIQUE, Sorte.PIQUE) && !carte2.isDisabled(cartes, Sorte.PIQUE, Sorte.PIQUE);;
        console.log(`${ok}: TestCarte: IsDisabled: atoutDemandeBibitte`);
    }

    // Bibitte quand atout pas demandé
    atoutPasDemandeBibitte() {
        const carte1 = this.paquet.getCarte(15, Sorte.JOKER);
        const carte2 = this.paquet.getCarte(16, Sorte.BLANCHE);
        const cartes = [carte1, carte2, this.paquet.getCarte(8, Sorte.COEUR), this.paquet.getCarte(10, Sorte.PIQUE)];

        const ok = carte1.isDisabled(cartes, Sorte.PIQUE, Sorte.COEUR) && carte2.isDisabled(cartes, Sorte.PIQUE, Sorte.COEUR);;
        console.log(`${ok}: TestCarte: IsDisabled: atoutPasDemandeBibitte`);
    }

    // Pas de sorte demandée
    pasSorteDemandee() {
        const carte = this.paquet.getCarte(8, Sorte.PIQUE);
        const cartes = [carte, this.paquet.getCarte(8, Sorte.COEUR), this.paquet.getCarte(10, Sorte.PIQUE)];

        const ok = !carte.isDisabled(cartes, null, Sorte.COEUR);
        console.log(`${ok}: TestCarte: IsDisabled: pasSorteDemandee`);
    }

    // Bibittes sans atout
    pasAtoutBibitte() {
        const carte1 = this.paquet.getCarte(15, Sorte.JOKER);
        const carte2 = this.paquet.getCarte(16, Sorte.BLANCHE);

        const ok = !carte1.isAtout(Sorte.SANS_ATOUT) && !carte2.isAtout(Sorte.SANS_ATOUT);
        console.log(`${ok}: TestCarte: IsDisabled: pasAtoutBibitte`);
    }
}

    // Tester la méthode Carte.setFromPoids(poids, sorte)
export class SetFromPoids {
    constructor() {}

    runAll() {
        this.basic();
    }

    // Test de base
    basic() {
        const carte = new Carte();
        carte.setFromPoids(11, Sorte.TREFLE);

        const ok = carte.key === 'J|trèfle' && carte.rang === 28 && carte.couleur === Couleur.NOIR;
        console.log(`${ok}: TestCarte: SetFromPoids: basic`);
    }
}