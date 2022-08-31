import { Carte, Sorte, Symbole } from "./carte";
import { Joueur } from "./joueur";

export class Paquet {
    constructor(avecQuettee) {
        this.cartes = [];
        let rang = 0;
        for (let sorte of [Sorte.COEUR, Sorte.PIQUE, Sorte.CARREAU, Sorte.TREFLE]) {
            for (let symbole of [Symbole.SEPT, Symbole.HUIT, Symbole.NEUF, Symbole.DIX, Symbole.JACK, Symbole.DAME, Symbole.ROI, Symbole.AS]) {
                this.cartes.push(new Carte(rang++, sorte, symbole));
            }
        }

        this.quettee = null;
        if (avecQuettee) {
            this.quettee = [];
            this.cartes.push(new Carte(rang++, Sorte.JOKER, ''));
            this.cartes.push(new Carte(rang, Sorte.BLANCHE, ''));
        }

        this.joueur1 = new Joueur('Gilberte', 1, 'Georgette');
        this.joueur2 = new Joueur('Xavier', 2, 'Alexis');
        this.joueur3 = new Joueur('Georgette', 3, 'Gilberte');
        this.joueur4 = new Joueur('Alexis', 4, 'Xavier');

        this.joueurs = [this.joueur1, this.joueur2, this.joueur3, this.joueur4];
    }

    getCartes() {
        return this.cartes;
    }

    getJoueur1() {
        return this.joueur1;
    }

    getJoueur2() {
        return this.joueur2;
    }

    getJoueur3() {
        return this.joueur3;
    }

    getJoueur4() {
        return this.joueur4;
    }

    getJoueurs() {
        return this.joueurs.map((item) => item.getNom());
    }

    findJoueur(nom) {
        return this.joueurs.find((item) => item.getNom() === nom);
    }

    getQuettee() {
        return this.quettee;
    }

    prendreQuettee(mise) {
        const joueur = this.getJoueur(mise.joueur);
        if (joueur !== null) {
            joueur.cartes.push(this.quettee[0].copy());
            joueur.cartes.push(this.quettee[1].copy());
            joueur.cartes.sort((a, b) => a.rang - b.rang);
            this.quettee = [];
        }
    }

    getJoueur(nom) {
        return this.joueurs.find((item) => item.getNom() === nom);
    }

    pretPourQuettee(mise) {
        const joueur = this.getJoueur(mise.joueur);
        if (joueur !== null) {
            const action = `${joueur.getNom()}, tu peux prendre la quettée`;
            return action;
        }
        return '';
    }

    brasser() {
        for (let i = this.cartes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = this.cartes[i];
            this.cartes[i] = this.cartes[j];
            this.cartes[j] = temp;
        }
        this.joueur1.setCartes(this.cartes.slice(0, 8).sort((a, b) => a.rang - b.rang));
        this.joueur2.setCartes(this.cartes.slice(8, 16).sort((a, b) => a.rang - b.rang));
        this.joueur3.setCartes(this.cartes.slice(16, 24).sort((a, b) => a.rang - b.rang));
        this.joueur4.setCartes(this.cartes.slice(24, 32).sort((a, b) => a.rang - b.rang));

        if (this.quettee !== null) {
            this.quettee = this.cartes.slice(32, 34).sort((a, b) => a.rang - b.rang);
        }
    }

    discarte(carte, joueur, final) {
        if (joueur !== null) {
            if (!final) {
                const partenaire = this.getJoueur(joueur.partenaire);
                partenaire.cartes.push(carte.copy());
                partenaire.cartes.sort((a, b) => a.rang - b.rang);
            }
            const idx = joueur.cartes.findIndex((item) => item.key === carte.key);
            joueur.cartes.splice(idx, 1);
        }
    }
}