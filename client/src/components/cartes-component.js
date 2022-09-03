import React, { Component } from 'react';

import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import { CarteComponent } from './carte-component';
import { ActionType } from '../models/action';

export class CartesComponent extends Component {
    constructor(props) {
        super(props);
    }

    onClick = (e,carte) => {
        if (!this.isDesactive(carte)) {
            return;
        }
        if (e.detail === 2 && this.props.actif) {  
            this.props.cliqueCarte(carte);
        }
    };

    isDesactive(carte) {
        if (!this.props.actif) {
            return true;
        }
        if (this.props.action === null) {
            return false
        }
        if ((this.props.action.type === ActionType.DISCARTER || this.props.action.type === ActionType.PASSER) &&
            carte.points !== 0) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <div>
                <Row gutter={6}>
                    {/* Chaque carte */}
                    {this.props.cartes.map((item, index) => (
                        <Col onClick={e => this.onClick(e, item)} style={{marginTop: item.surelevee && this.props.actif? '-10px' : '0px'}}>
                            <CarteComponent clickable={this.isDesactive(item)} carte={item} ouvert={this.props.ouvert}></CarteComponent>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}