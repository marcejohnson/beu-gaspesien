export const ActionType = {
    GAGER: 0,
    QUETTEE: 1,
    PASSER: 2,
    DISCARTER: 3,
    JOUER: 4,
    BRASSER: 5
}

export class Action {
    constructor() {
        this.type = ActionType.GAGER;
        this.joueur = null;
        this.cptCarte = 0;
        this.cptJoueur = 0;
    }

    getMsg() {
        switch (this.type) {
            case ActionType.GAGER: {
                return `C'est le temps de gager!`;
            }
            case ActionType.QUETTEE: {
                return `${this.joueur.getNom()}, c'est le temps de prendre la quettée!`;
            }
            case ActionType.PASSER: {
                return `${this.joueur.getNom()}, c'est le temps de discarter!`;
            }
            case ActionType.DISCARTER: {
                return `${this.joueur.getNom()}, c'est le temps de discarter!`;
            }
            case ActionType.JOUER: {                
                return `${this.joueur.getNom()}, c'est le temps de jouer!`;
            }
            case ActionType.BRASSER: {
                return `C'est le temps de brasser!`;
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

    next(mise, avecQuettee, paquet, remporteur) {
        const action = this.copy();
        switch (this.type) {
            case ActionType.GAGER: {
                if (avecQuettee) {
                    action.type = ActionType.QUETTEE;
                } else {
                    action.type = ActionType.JOUER;
                }
                action.joueur = paquet.getJoueur(mise.joueur);
                break;
            }
            case ActionType.QUETTEE: {
                action.type = ActionType.PASSER;
                action.cptCarte = 0;
                break;
            }
            case ActionType.PASSER: {
                if (action.cptCarte === 0) {
                    action.cptCarte++;
                } else {
                    action.cptCarte = 0;
                    action.type = ActionType.DISCARTER;
                    action.joueur = paquet.getJoueur(this.joueur.getPartenaire());
                }
                break;
            }
            case ActionType.DISCARTER: {
                if (action.cptCarte === 0) {
                    action.cptCarte++;
                } else {
                    action.cptCarte = 0;
                    action.type = ActionType.JOUER;
                    action.joueur = paquet.getJoueur(mise.joueur);
                }
                break;
            }
            case ActionType.JOUER: {
                action.cptJoueur++;
                if (action.cptCarte === 8 && this.cptJoueur === 4) {
                    action.cptCarte = 0;
                    action.cptJoueur = 0;
                    action.type = ActionType.BRASSER;
                    action.joueur = null;
                } else if (action.cptJoueur === 4) {
                    action.cptCarte++;
                    action.cptJoueur = 0;
                    action.joueur = this.paquet.getJoueur(remporteur);
                }
                break;
            }
            default: {
            }
        }
        return action;
    }
}