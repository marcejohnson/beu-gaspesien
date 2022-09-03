export const ActionType = {
    GAGER: 0,
    PASSER: 1,
    DISCARTER: 2,
    JOUER: 3,
    REMPORTER: 4,
    BRASSER: 5
}

export class Action {
    constructor(brasseur) {
        this.type = ActionType.GAGER;
        this.joueur = null;
        this.brasseur = brasseur;
        this.remporteur = null;
        this.cptCarte = 0;
        this.cptJoueur = 0;
    }

    getMsg() {
        switch (this.type) {
            case ActionType.GAGER: {
                return `C'est le temps de gager!`;
            }
            case ActionType.PASSER: {
                return `${this.joueur.getNom()}, c'est à toi à discarter!`;
            }
            case ActionType.DISCARTER: {
                return `${this.joueur.getNom()}, c'est à toi à discarter!`;
            }
            case ActionType.JOUER: {                
                return `${this.joueur.getNom()}, c'est à toi à jouer!`;
            }
            case ActionType.BRASSER: {
                return `${this.joueur.getNom()}, c'est à toi à brasser!`;
            }            
            case ActionType.REMPORTER: {
                return `${this.remporteur.getNom()} a remporté la main!`;
            }
            default: {
                return '';
            }
        }
    }

    copy() {
        const action = new Action();
        action.type = this.type;
        action.joueur = this.joueur;
        action.cptCarte = this.cptCarte;
        action.cptJoueur = this.cptJoueur;
        return action;
    }

    next(mise, avecQuettee, paquet) {
        const action = this.copy();
        switch (this.type) {
            case ActionType.GAGER: {
                if (avecQuettee) {
                    paquet.prendreQuettee(mise);
                    action.type = ActionType.PASSER;
                    action.cptCarte = 0;
                } else {
                    action.type = ActionType.JOUER;
                }
                action.joueur = paquet.getJoueurParNom(mise.joueur);
                break;
            }
            case ActionType.PASSER: {
                if (action.cptCarte === 0) {
                    action.cptCarte++;
                } else {
                    action.cptCarte = 0;
                    action.type = ActionType.DISCARTER;
                    action.joueur = paquet.getJoueurParNom(this.joueur.getPartenaire());
                }
                break;
            }
            case ActionType.DISCARTER: {
                if (action.cptCarte === 0) {
                    action.cptCarte++;
                } else {
                    action.cptCarte = 0;
                    action.type = ActionType.JOUER;
                    paquet.sorteDemandee = null;
                    const miseur = paquet.getJoueurParNom(mise.joueur);
                    // Clear quettee pour miseur
                    for (let carte of miseur.cartes) {
                        carte.surelevee = false;
                    }
                    // Clear quettee pour partenaire
                    for (let carte of action.joueur.cartes) {
                        carte.surelevee = false;
                    }
                    action.joueur = paquet.getNextJoueur(miseur);
                }
                break;
            }
            case ActionType.JOUER: {
                action.cptJoueur++;
                 if (action.cptJoueur === 4) {
                    action.type = ActionType.REMPORTER;
                    action.cptCarte++;
                    action.cptJoueur = 0;
                    action.remporteur = paquet.getRemporteur(mise);
                    action.joueur = action.remporteur;
                } else {
                    action.joueur = paquet.getNextJoueur(action.joueur);
                }
                break;
            } 
            case ActionType.REMPORTER: {                
                paquet.clearMain();
                if (action.cptCarte === 8) {
                    action.cptCarte = 0;
                    action.cptJoueur = 0;
                    action.type = ActionType.BRASSER;
                    action.brasseur = paquet.getNextJoueur(action.brasseur);
                    action.joueur = action.remporteur.copy();
                    action.remporteur = null;
                } else {
                    action.type = ActionType.JOUER;
                }
                break;
            }
            default: {
            }
        }
        paquet.setJoueurActif(action.joueur);
        return action;
    }
}