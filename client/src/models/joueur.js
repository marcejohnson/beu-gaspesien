export class Joueur {
    constructor(nom, index, partenaire) {
        this.cartes = [];
        this.nom = nom;
        this.index = index;
        this.partenaire = partenaire;
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
}