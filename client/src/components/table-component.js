import React, { Component } from 'react';

import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import { CartesComponent } from './cartes-component';
import { JoueurComponent } from './joueur-component';
import { Paquet } from '../models/paquet';
import { ActionType } from '../models/action';

export class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paquet: new Paquet(this.props.avecQuettee),
            avecQuettee: props.avecQuettee
        }
        this.state.paquet.brasser();
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

    onDiscarte(carte) {   
        this.state.paquet.discarte(carte, this.props.action.joueur, this.props.action.type === ActionType.DISCARTER);
        this.props.nextAction();
    }

    isJoueurActif(idx) {
        if (this.props.joueurActif === null) return false;
        return this.props.joueurActif.getIndex() === idx;
    }

    render() {
        return (
            <div>
                {/* Partenaire */}
                <JoueurComponent discarte={(carte) => this.onDiscarte(carte)} actif={this.isJoueurActif(3)} ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur3()}></JoueurComponent>
                {/* Adversaires et Quettée */}
                <Row style={{ marginTop: '30px', marginBottom: '30px' }}>
                    {/* Gauche */}
                    <Col style={{ marginRight: '120px' }}>
                        <JoueurComponent discarte={(carte) => this.onDiscarte(carte)} actif={this.isJoueurActif(2)} ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur2()}></JoueurComponent>
                    </Col>
                    {/* Quettée */}
                    {
                        (this.state.avecQuettee) &&
                        <Col style={{ marginTop: '38px' }} onClick={this.onQuettee}>
                            <CartesComponent clickable={false} ouvert={this.props.ouvert} cartes={this.state.paquet.getQuettee()}></CartesComponent>
                        </Col>
                    }
                    {/* Droite */}
                    <Col style={{ marginLeft: '120px' }}>
                        <JoueurComponent discarte={(carte) => this.onDiscarte(carte)} actif={this.isJoueurActif(4)} ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur4()}></JoueurComponent>
                    </Col>
                </Row>
                {/* Moi */}
                <div style={{ marginTop: '65px' }}>
                    <JoueurComponent discarte={(carte) => this.onDiscarte(carte)}actif={this.isJoueurActif(1)} moi='true' ouvert='true' joueur={this.state.paquet.getJoueur1()}></JoueurComponent>
                </div>
            </div>
        )
    }
}