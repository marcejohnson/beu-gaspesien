export class Brasse {
    constructor(brasseur, points) {
        this.brasseur = brasseur;
        this.points = [0,0];
        this.points[0] += points[0];
        this.points[1] += points[1];
    }
}

export class Partie {
    constructor(paquet) {        
        this.paquet = paquet;
        this.paquet.brasser();
        this.brasses = [new Brasse(this.paquet.joueur1, [0,0])];
    }

    nextBrasse(points) {
        const brasseCourante = this.brasses[this.brasses.length - 1];
        brasseCourante.points[0] += points[0];        
        brasseCourante.points[1] += points[1];

        this.brasses.push(new Brasse(this.paquet.getNextJoueur(brasseCourante.brasseur), brasseCourante.points));
    }
}