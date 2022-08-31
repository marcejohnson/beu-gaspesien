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

        this.joueur1 = new Joueur('Gilberte', 0, 'Georgette');
        this.joueur2 = new Joueur('Xavier', 1, 'Alexis');
        this.joueur3 = new Joueur('Georgette', 2, 'Gilberte');
        this.joueur4 = new Joueur('Alexis', 3, 'Xavier');

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
        const joueur = this.getJoueurParNom(mise.joueur);
        if (joueur !== null) {
            const carte1 = this.quettee[0].copy();
            const carte2 = this.quettee[1].copy();
            carte1.surelevee = true;
            carte2.surelevee = true;
            joueur.cartes.push(carte1);
            joueur.cartes.push(carte2);
            joueur.cartes.sort((a, b) => a.rang - b.rang);
            this.quettee = [];
        }
    }

    getJoueurParNom(nom) {
        return this.joueurs.find((item) => item.getNom() === nom);
    }

    getJoueurParIdx(idx) {
        return this.joueurs.find((item) => item.getIndex() === idx);
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
                const partenaire = this.getJoueurParNom(joueur.partenaire);
                const copie = carte.copy();
                copie.surelevee = true;
                partenaire.cartes.push(copie);
                partenaire.cartes.sort((a, b) => a.rang - b.rang);
            }
            const idx = joueur.cartes.findIndex((item) => item.key === carte.key);
            joueur.cartes.splice(idx, 1);
        }
    }
}