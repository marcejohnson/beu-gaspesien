export class Joueur {
    constructor(nom) {
        this.cartes = [];
        this.nom = nom;
    }

    getNom() {
        return this.nom;
    }

    setCartes(cartes) {
        this.cartes = cartes;
    }

    getCartes() {
        return this.cartes;
    }
}