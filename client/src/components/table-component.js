import React, { Component } from 'react';

import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import { CartesComponent } from './cartes-component';
import { JoueurComponent } from './joueur-component';
import { Paquet } from '../models/paquet';
import { ActionType } from '../models/action';
import { MainComponent } from './main-component';

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

    render() {
        return (
            <div>
                {/* Partenaire */}
                <div style={{marginBottom: '60px'}}><JoueurComponent discarte={(carte) => this.onDiscarte(carte)} ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur3()}></JoueurComponent></div>
                {/* Adversaires et Quettée */}
                <Row style={{ marginTop: '0px', marginBottom: '30px' }}>
                    {/* Gauche */}
                    <Col style={{ marginRight: '120px' }}>
                        <JoueurComponent discarte={(carte) => this.onDiscarte(carte)} ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur2()}></JoueurComponent>
                    </Col>
                    {/* Quettée */}
                    {
                        (this.state.avecQuettee && this.props.action.type === ActionType.GAGER) &&
                        <Col style={{ marginTop: '38px' }} onClick={this.onQuettee}>
                            <CartesComponent clickable={false} ouvert={this.props.ouvert} cartes={this.state.paquet.getQuettee()}></CartesComponent>
                        </Col>
                    }
                    {/* Main */}
                    {
                        (this.props.action.type === ActionType.JOUER) &&
                        <Col>
                            <MainComponent paquet={this.state.paquet} ouvert={this.props.ouvert}></MainComponent>
                        </Col>
                    }
                    {/* Droite */}
                    <Col style={{ marginLeft: '120px' }}>
                        <JoueurComponent discarte={(carte) => this.onDiscarte(carte)} ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur4()}></JoueurComponent>
                    </Col>
                </Row>
                {/* Moi */}
                <div style={{ marginTop: '105px' }}>
                    <JoueurComponent aria-hidden="true" discarte={(carte) => this.onDiscarte(carte)} moi='true' ouvert='true' joueur={this.state.paquet.getJoueur1()}></JoueurComponent>
                </div>
            </div>
        )
    }
}