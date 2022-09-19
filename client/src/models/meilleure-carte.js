import { Symbole } from "./carte";

class AsInfo {
    constructor(as) {
        this.as = as;
        this.beu = null;
        this.nSorte = 0;
    }
}

class ChienInfo {
    constructor(chien) {
        this.chien = chien;
        this.ratio = 0;
    }
}

export class MeilleureCarte {
    constructor(cartes, atout, sorteDemandee) {
        this.cartes = cartes;
        this.atout = atout;
    }

    piger(cartes, contrainte) {
        if (cartes.length === 1) {
            return cartes[0];
        }
        let choix = [];
        switch (contrainte) {
            case 'min': {
                const minVal = Math.min(...cartes.map(c => c.poids));
                choix = cartes.filter(c => c.poids === minVal);
                break;
            }
            case 'max': {
                const minVal = Math.max(...cartes.map(c => c.poids));
                choix = cartes.filter(c => c.poids === minVal);
                break;
            }
            default: {
                choix = cartes;
                break;
            }
        }
        const idx = Math.floor(Math.random() * choix.length);
        return cartes[idx];
    }

    getMain1Carte1() {
        const cartesAs = this.cartes.filter(c => c.symbole === Symbole.AS);
        const cartesBeu = this.cartes.filter(c => c.symbole === Symbole.ROI)

        // Cherche une pair beu-as (pas d'atout)
        const asInfos = [];
        for (let as of cartesAs) {
            if (!as.isAtout(this.atout)) {
                const asInfo = new AsInfo(as);
                const beuMemeSorte = cartesBeu.find(c => c.sorte === as.sorte);
                if (beuMemeSorte !== undefined) {
                    asInfo.beu = beuMemeSorte;
                }
                asInfo.nSorte = this.cartes.filter(c => c.sorte === as.sorte).length;
                asInfos.push(asInfo);
            }
        }
        if (asInfos.length > 0){
            const avecBeu = asInfos.filter(as => as.beu !== null);
            if (avecBeu.length > 0) {
                // Joue le beu accoté par un as qui a le plus faible nombre de cartes de cette sorte
                const nMin = Math.min(...avecBeu.map(as => as.nSorte));
                const avecBeuMin = avecBeu.filter(as => as.nSorte === nMin);
                return this.piger(avecBeuMin.map(as => as.beu));
            }
            // Joue l'as qui a le plus faible nombre de cartes de cette sorte
            const nMin = Math.min(...asInfos.map(as => as.nSorte));
            const asMin = asInfos.filter(as => as.nSorte === nMin);
            return this.piger(asMin.map(as => as.as));
        }

        // Cherche une carte sèche (sauf atout)
        const cartesSeches = this.cartes.filter(c => c.isSeche(this.cartes, this.atout) && !c.isAtout(this.atout));
        const chiensSecs = cartesSeches.filter(c => c.isChien(this.atout, true));
        if (chiensSecs.length > 0) {
            // Priorise les chiens
            return this.piger(chiensSecs, 'min');
        }
        const dixSecs = cartesSeches.filter(c => c.poids === 10);
        if (dixSecs.length > 0) {
            // Priorise 10
            return this.piger(dixSecs);
        }
        const beuxSecs = cartesSeches.filter(c => c.symbole === Symbole.ROI);
        if (beuxSecs.length > 0) {
            // Priorise beu
            return this.piger(beuxSecs);
        }

        // Cherche un chien
        let chiens = this.cartes.filter(c => c.isChien(this.atout, false));
        let ratios = [];
        if (chiens.length > 0) {
            // Priorise les chiens qui ont le meilleur ratio chien/point
            for (let chien of chiens) {
                const pointsSorte = this.cartes.filter(c => c.sorte === chien.sorte && c.points > 0);
                let totPoints = 0;
                for (let p of pointsSorte) {
                    totPoints += p.points;
                }
                const chiensSorte = this.cartes.filter(c => c.sorte === chien.sorte && c.isChien());
                ratios.push(new ChienInfo(chien, chiensSorte.length/totPoints));
            }
            const minRatio = Math.min(...ratios.map(r => r.ratio));
            const chiensMinRatio = ratios.filter(r => r.ratio === minRatio);
            return this.piger(chiensMinRatio.map(c => c.chien), 'min');
        }

        // Regarde si bien positionné pour faire tomber atout

        // Joue un 10
        const dix = this.cartes.filter(c => c.poids === 10);
        if (dix.length > 0) {
            return this.piger(dix);
        }

        return this.piger(this.cartes, 'min');
    }
}