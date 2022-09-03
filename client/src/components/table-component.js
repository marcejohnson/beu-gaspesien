import React, { Component } from 'react';
import { Row, Col, message } from 'antd';
import "antd/dist/antd.css";
import { CartesComponent } from './cartes-component';
import { JoueurComponent } from './joueur-component';
import { Paquet } from '../models/paquet';
import { ActionType } from '../models/action';
import { MainComponent } from './main-component';
import { Sorte } from '../models/carte';

export class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paquet: new Paquet(this.props.avecQuettee),
            avecQuettee: props.avecQuettee
        }
        this.state.paquet.brasser();

        this.cartesAtout = 0;
    }

    brasser(avecQuettee) {
        const paquet = new Paquet(avecQuettee);
        paquet.brasser();
        this.setState({
            paquet: paquet,
            avecQuettee: avecQuettee
        });
        this.props.nextAction();
    }

    getJoueurs() {
        return this.state.paquet.getJoueurs();
    }

    onQuettee = (e) => {
        if (e.detail === 2) {
            if (this.props.mise !== null) {
                this.state.paquet.prendreQuettee(this.props.mise);
            }
            this.props.nextAction();
        }
    };

    onCliqueCarte(carte) {
        if (this.state.paquet.attendre) {
            return;
        }
        this.state.paquet.cliqueCarte(carte, this.props.action.joueur, this.props.action);
        if (this.props.action.cptJoueur === 0) {
            this.state.paquet.sorteDemandee = carte.sorte;
            if (carte.sorte === Sorte.BLANCHE || carte.sorte === Sorte.JOKER) {
                this.state.paquet.sorteDemandee = this.props.mise.atout;
            }
        }

        if (this.props.action.type === ActionType.DISCARTER && carte.isAtout(this.props.mise.atout)) {
            this.cartesAtout++;
        } else if (this.props.action.cptCarte === 1) {
            if (this.cartesAtout > 0) {
                this.onDiscarterAtout();
            }
            this.cartesAtout = 0;
        }
        this.props.nextAction();
    }

    onDiscarterAtout = () => {
        const nCartes = this.cartesAtout === 1 ? '1 carte' : '2 cartes';
        message.info(`${this.props.action.joueur.getNom()} a discarter ${nCartes} d'atout.`);
    };

    render() {
        return (
            <div>
                {/* Partenaire */}
                <div style={{ marginBottom: '60px' }}>
                    <JoueurComponent sorteDemandee={this.state.paquet.sorteDemandee} action={this.props.action} cliqueCarte={(carte) => this.onCliqueCarte(carte)} ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur3()}></JoueurComponent>
                </div>
                {/* Adversaires et Quettée */}
                <Row style={{ marginTop: '0px', marginBottom: '30px' }}>
                    {/* Gauche */}
                    <Col style={{ marginRight: '120px' }}>
                        <JoueurComponent sorteDemandee={this.state.paquet.sorteDemandee} action={this.props.action} cliqueCarte={(carte) => this.onCliqueCarte(carte)} ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur2()}></JoueurComponent>
                    </Col>
                    {/* Quettée */}
                    {
                        (this.state.avecQuettee && this.props.action.type === ActionType.GAGER) &&
                        <Col style={{ marginTop: '38px' }} onClick={this.onQuettee}>
                            <CartesComponent action={this.props.action} actif={false} ouvert={this.props.ouvert} cartes={this.state.paquet.getQuettee()}></CartesComponent>
                        </Col>
                    }
                    {/* Main */}
                    {
                        (this.props.action.type === ActionType.JOUER || this.props.action.type === ActionType.REMPORTER) &&
                        <Col>
                            <MainComponent paquet={this.state.paquet} ouvert={this.props.ouvert}></MainComponent>
                        </Col>
                    }
                    {/* Droite */}
                    <Col style={{ marginLeft: '120px' }}>
                        <JoueurComponent sorteDemandee={this.state.paquet.sorteDemandee} action={this.props.action} cliqueCarte={(carte) => this.onCliqueCarte(carte)} ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur4()}></JoueurComponent>
                    </Col>
                </Row>
                {/* Moi */}
                <div style={{ marginTop: '105px' }}>
                    <JoueurComponent sorteDemandee={this.state.paquet.sorteDemandee} action={this.props.action} cliqueCarte={(carte) => this.onCliqueCarte(carte)} moi='true' ouvert='true' joueur={this.state.paquet.getJoueur1()}></JoueurComponent>
                </div>
            </div>
        )
    }
}