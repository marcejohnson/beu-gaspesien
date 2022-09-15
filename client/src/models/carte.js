export const Sorte = {
    COEUR: 'coeur',
    PIQUE: 'pique',
    CARREAU: 'carreau',
    TREFLE: 'trèfle',
    JOKER: 'joker',
    BLANCHE: 'blanche',
    SANS_ATOUT: 'sans atout'
}

const Couleur = {
    NOIR: 'black',
    ROUGE: 'red'
}

export const Symbole = {
    SEPT: '7',
    HUIT: '8',
    NEUF: '9',
    DIX: '10',
    JACK: 'J',
    DAME: 'Q',
    ROI: 'K',
    AS: 'A',
}

export class Carte {
    constructor(rang = -1, sorte = '', symbole = '', poids = 0) {
        this.rang = rang;
        this.key = `${symbole}|${sorte}`;
        this.sorte = sorte;
        this.symbole = symbole;
        this.surelevee = false;
        this.poids = poids;
        
        switch (this.sorte) {
            case Sorte.COEUR: {
                this.image = 'coeur.png';
                break;
            }
            case Sorte.PIQUE: {
                this.image = 'pique.png';
                break;
            }
            case Sorte.CARREAU: {
                this.image = 'carreau.png';
                break;
            }
            case Sorte.TREFLE: {
                this.image = 'trefle.png';
                break;
            }
            case Sorte.JOKER: {
                this.image = 'joker.png';
                break;
            }
            case Sorte.BLANCHE: {
                this.image = 'blanche.png';
                break;
            }
            default: {
                this.image = 'blanche.png';
                break;
            }
        }
        this.couleur = this.sorte === Sorte.COEUR || this.sorte === Sorte.CARREAU || this.sorte === Sorte.JOKER ? Couleur.ROUGE : Couleur.NOIR;
        this.points = 0;
        if (symbole === Symbole.DIX) {
            this.points = 10;
        } else if (this.symbole === Symbole.ROI) {
            this.points = 25;
        }
    }

    copy() {
        const carte = new Carte(this.rang, this.sorte, this.symbole, this.poids);
        return carte;
    }

    isAtout(atout) {
        if (atout === Sorte.SANS_ATOUT) {
            return false;
        }
        return this.sorte === Sorte.BLANCHE || this.sorte === Sorte.JOKER || this.sorte === atout;
    }

    isSorteDemandee(sorteDemandee, atout) {
        if (sorteDemandee === this.sorte) {
            return true;
        }
        if (sorteDemandee === atout && this.isAtout()) {
            return true;
        }
        return false;
    }

    isDisabled(cartes, sorteDemandee, atout) {
        if (sorteDemandee === null) {
            return false;
        }

        if (this.isSorteDemandee(sorteDemandee, atout)) {
            return false;
        }

        const idx = cartes.findIndex(i => i.isSorteDemandee(sorteDemandee, atout));
        if (idx === -1) {
            return false;
        }
        return true;
    }

    isSeche(cartes, atout) {
        // Cherche même sorte
        const memeSorte = cartes.find(c => c.sorte === this.sorte && c.symbole !== this.symbole);
        if (memeSorte !== undefined) {
            // Si trouvé, carte pas sèche
            return false;
        }
        // Si carte d'atout, cherche bibittes
        if (this.isAtout(atout)) {
            const bibittes = cartes.filter(c => c.poids > 14);
            if (bibittes.length > 0) {
                // Si trouvées, carte pas sèche
                return false;
            }
        }
        // Carte sèche
        return true;
    }

    isChien(atout, dixPasse) {
        if (this.sorte === atout) {
            return false;
        }
        if (this.points !== 0) {
            return false;
        }
        if (this.poids < 10) {
            return true;
        }
        if ((this.symbole === Symbole.JACK || this.symbole === Symbole.DAME) && dixPasse) {
            return true;
        }
        if (this.poids > 14 && atout === Sorte.SANS_ATOUT) {
            return true;
        }
        return false;
    }
}