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

    render() {
        return (
            <div>
                <JoueurComponent ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur3()}></JoueurComponent>
                <Row style={{ marginTop: '30px', marginBottom: '30px' }}>
                    <Col style={{ marginRight: '60px' }}>
                        <JoueurComponent ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur2()}></JoueurComponent>
                    </Col>
                    {
                        (this.state.avecQuettee) &&
                        <Col style={{ marginTop: '38px' }}>
                            <CartesComponent ouvert={this.props.ouvert} cartes={this.state.paquet.getQuettee()}></CartesComponent>
                        </Col>
                    }

                    <Col style={{ marginLeft: '60px' }}>
                        <JoueurComponent ouvert={this.props.ouvert} joueur={this.state.paquet.getJoueur4()}></JoueurComponent>
                    </Col>
                </Row>
                <JoueurComponent ouvert='true' joueur={this.state.paquet.getJoueur1()}></JoueurComponent>
            </div>
        )
    }
}