import { Sorte } from "./carte";

export const Montant = {
    NOMBRE: 'Nombre',
    GROSSE: 'la grosse',
    PETITE: 'la petite'
}

export class Mise {
    constructor() {
        this.joueur = 'Gilberte';
        this.montant = 95;
        this.atout = Sorte.PIQUE;
        this.petite = false;
    }

    getStr() {
        let montantStr = `${this.montant}`;
        if (this.montant === 150) {
            montantStr = this.petite? Montant.PETITE : Montant.GROSSE;
        }
        let atoutStr = this.atout === Sorte.SANS_ATOUT? Sorte.SANS_ATOUT : `en ${this.atout}`;
        return `${this.joueur} a gagé ${montantStr} ${atoutStr}.`;
    }
}