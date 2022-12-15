import { Sorte } from "./carte";

export const Montant = {
    NOMBRE: 'Nombre',
    GROSSE: 'la grosse',
    PETITE: 'la petite'
}

export class Mise {
    constructor() {
        this.joueur = null;
        this.montant = null;
        this.atout = null;
        this.petite = false;
    }

    getStr() {
        let montantStr = `${this.montant}`;
        if (this.montant === 150) {
            montantStr = this.petite? Montant.PETITE : Montant.GROSSE;
        }
        let atoutStr = '';
        if (this.atout !== null) {
            atoutStr = this.atout === Sorte.SANS_ATOUT? ` ${Sorte.SANS_ATOUT}` : ` en ${this.atout}`;
        }
        return `${this.joueur} a gagé ${montantStr}${atoutStr}.`;
    }
}