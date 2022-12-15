import { Sorte, Symbole } from "../../models/carte";
import { MeilleureCarte } from "../../models/meilleure-carte";
import { Paquet } from "../../models/paquet";

export class GetCarte4 {
    constructor() {
        this.paquet = new Paquet(true);
     }

    runAll() {
        this.partenaireAvecPoints();
    }

    // La main est au partenaire, des points sont tombés et on a des points
    partenaireAvecPoints(){
        const cartes = [
            this.paquet.getCarte(14, Sorte.PIQUE),
            this.paquet.getCarte(13, Sorte.PIQUE),
            this.paquet.getCarte(12, Sorte.PIQUE),
            this.paquet.getCarte(13, Sorte.COEUR),
            this.paquet.getCarte(7, Sorte.CARREAU),
            this.paquet.getCarte(14, Sorte.TREFLE),
            this.paquet.getCarte(13, Sorte.TREFLE),
            this.paquet.getCarte(11, Sorte.TREFLE)
        ]
        const atout = Sorte.TREFLE;
        const meilleure = new MeilleureCarte();
        const carte = meilleure.getCarte4(Sorte.COEUR, atout, cartes)
        const ok = carte.symbole === Symbole.ROI && carte.sorte === Sorte.COEUR;
        console.log(`${ok}: TestMeilleureCarte: getCarte4: partenaireAvecPoints`);
    }    
}