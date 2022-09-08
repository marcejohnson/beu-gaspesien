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
}