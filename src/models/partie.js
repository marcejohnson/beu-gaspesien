export class Brasse {
    constructor(idx, brasseur, points) {
        this.idx = idx;
        this.brasseur = brasseur;
        this.points = [0,0];
        this.points[0] += points[0];
        this.points[1] += points[1];
        this.done = false;
    }
}

export class Partie {
    constructor(paquet) {        
        this.paquet = paquet;
        this.paquet.brasser();
        this.brasses = [new Brasse(0, this.paquet.joueur1, [0,0])];
    }

    nextBrasse(points, mise) {
        const brasseCourante = this.brasses[this.brasses.length - 1];
        const equipeMise = this.paquet.getJoueurParNom(mise.joueur).equipeIdx;
        const autreEquipe = equipeMise === 0 ? 1 : 0;

        if (points[equipeMise] >= mise.montant) {
            if (mise.montant === 150) {
                brasseCourante.points[equipeMise] += 500;
            } else {
                brasseCourante.points[equipeMise] += points[equipeMise];
            }
        } else {
            brasseCourante.points[equipeMise] -= mise.montant;
        }
        brasseCourante.points[autreEquipe] += points[autreEquipe];  
        brasseCourante.done = true;

        this.brasses.push(new Brasse(this.brasses.length, this.paquet.getNextJoueur(brasseCourante.brasseur), brasseCourante.points));
    }
}