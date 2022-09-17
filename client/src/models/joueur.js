import { Sorte } from "./carte";

export class Joueur {
    constructor(nom, index, partenaire) {
        this.cartes = [];
        this.nom = nom;
        this.index = index;
        this.partenaire = partenaire;
        this.actif = false;
        this.equipeIdx = this.index % 2;
    }

    getNom() {
        return this.nom;
    }

    getIndex() {
        return this.index;
    }

    getPartenaire() {
        return this.partenaire;
    }

    setCartes(cartes) {
        this.cartes = cartes;
    }

    getCartes() {
        return this.cartes;
    }

    compteSorte(sorte, atout) {
        let cartesSorte = this.cartes.filter(c => c.sorte === sorte);
        if (atout !== Sorte.SANS_ATOUT) {
            const bibittes = this.cartes.filter(c => c.sorte === Sorte.JOKER || c.sorte === Sorte.BLANCHE);
            cartesSorte = cartesSorte.concat(bibittes);
        }
        return cartesSorte.length;
    }
}