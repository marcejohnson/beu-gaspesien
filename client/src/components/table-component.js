import React, { Component } from 'react';

import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import { CartesComponent } from './cartes-component';
import { JoueurComponent } from './joueur-component';
import { Paquet } from '../models/paquet';

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
    }

    getJoueurs() {
        return this.state.paquet.getJoueurs();
    }

    render() {
        return (
            <div>
                {/* Partenaire */}
                <JoueurComponent ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur3()}></JoueurComponent>
                {/* Adversaires et Quettée */}
                <Row style={{ marginTop: '30px', marginBottom: '30px' }}>
                    {/* Gauche */}
                    <Col style={{ marginRight: '120px' }}>
                        <JoueurComponent ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur2()}></JoueurComponent>
                    </Col>
                    {/* Quettée */}
                    {
                        (this.state.avecQuettee) &&
                        <Col style={{ marginTop: '38px' }}>
                            <CartesComponent ouvert={this.props.ouvert} cartes={this.state.paquet.getQuettee()}></CartesComponent>
                        </Col>
                    }
                    {/* Droite */}
                    <Col style={{ marginLeft: '120px' }}>
                        <JoueurComponent ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur4()}></JoueurComponent>
                    </Col>
                </Row>
                {/* Moi */}
                <div style={{ marginTop: '65px' }}> <JoueurComponent moi='true' ouvert='true' joueur={this.state.paquet.getJoueur1()}></JoueurComponent></div>
            </div>
        )
    }
}