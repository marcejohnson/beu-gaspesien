export const ActionType = {
    GAGER: 'GAGER',
    CHOISIR_ATOUT: 'CHOISIR_ATOUT',
    PASSER: 'PASSER',
    DISCARTER: 'DISCARTER',
    JOUER: 'JOUER',
    REMPORTER: 'REMPORTER',
    BRASSER: 'BRASSER'
}

export class Action {
    constructor() {
        this.type = ActionType.GAGER;
        this.joueur = null;
        this.remporteur = null;
        this.cptCarte = 0;
        this.cptJoueur = 0;
    }

    getMsg() {
        switch (this.type) {
            case ActionType.GAGER: {
                return `C'est le temps de gager!`;
            }
            case ActionType.CHOISIR_ATOUT: {
                return `${this.joueur.getNom()}, c'est le temps de choisir l'atout!`;
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

    next(mise, avecQuettee, paquet, brasseur, auto) {
        const action = this.copy();
        switch (this.type) {
            case ActionType.GAGER: {
                if (avecQuettee) {
                    paquet.prendreQuettee(mise);
                    action.type = ActionType.CHOISIR_ATOUT;
                    action.cptCarte = 0;
                } else {
                    action.type = ActionType.JOUER;
                }
                action.joueur = paquet.getJoueurParNom(mise.joueur);
                break;
            }
            case ActionType.CHOISIR_ATOUT: {
                paquet.trierBibittes(mise);
                action.type = ActionType.PASSER;
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
                    action.remporteur = paquet.getRemporteur(mise, action.cptCarte === 8);
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
                    action.joueur = paquet.getNextJoueur(brasseur);
                    action.remporteur = null;
                } else {
                    action.type = ActionType.JOUER;
                }
                break;
            }
            case ActionType.BRASSER: {                
                action.type = ActionType.BRASSER;
                break;
            }
            default: {
            }
        }
        paquet.setJoueurActif(action.joueur);
        return action;
    }
}