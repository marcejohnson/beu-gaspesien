import React, { Component } from 'react';

import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import { CarteComponent } from './carte-component';

export class CartesComponent extends Component {
    constructor(props) {
        super(props);
    }

    onClick = (e,carte) => {;
        if (e.detail === 2 && this.props.actif) {  
            this.props.discarte(carte);
        }
    };

    render() {
        return (
            <div>
                <Row gutter={6}>
                    {/* Chaque carte */}
                    {this.props.cartes.map((item, index) => (
                        <Col onClick={e => this.onClick(e, item)} style={{marginTop: item.surelevee && this.props.actif? '-10px' : '0px'}}>
                            <CarteComponent carte={item} ouvert={this.props.ouvert}></CarteComponent>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}