import React, { Component } from 'react';

import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import { CarteComponent } from './carte-component';

export class MainComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{width: '100%'}}>
                {/* Carte partenaire */}
                <Row justify="center" style={{marginTop: '-30px'}}>
                    <Col><CarteComponent carte={this.props.paquet.main[2]} ouvert={this.props.ouvert}></CarteComponent></Col>
                </Row>
                {/* Adversaires et Quettée */}
                <Row>
                    {/* Carte adversaire gauche */}
                    <Col>
                        <CarteComponent carte={this.props.paquet.main[1]} ouvert={this.props.ouvert}></CarteComponent>
                    </Col>
                    {/* Carte adversaire droit */}
                    <Col style={{marginLeft: '55px'}}>
                        <CarteComponent carte={this.props.paquet.main[3]} ouvert={this.props.ouvert}></CarteComponent>
                    </Col>
                </Row>
                {/* Ma carte */}
                <Row justify="center" style={{marginBottom: '-80px'}}>
                    <Col><CarteComponent carte={this.props.paquet.main[0]} ouvert={true}></CarteComponent></Col>
                </Row>
            </div>
        )
    }
}