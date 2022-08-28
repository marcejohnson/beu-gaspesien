import React, { Component } from 'react';

import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import { CarteComponent } from './carte-component';

export class CartesComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('cartes ' + this.props.ouvert)
        return (
            <div>
                <Row gutter={6}>
                    {this.props.cartes.map(carte => (
                        <Col>
                            <CarteComponent carte={carte} ouvert={this.props.ouvert}></CarteComponent>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}