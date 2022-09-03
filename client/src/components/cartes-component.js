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
        if (this.isDisabled(carte)) {
            return;
        }
        if (e.detail === 2 && this.props.actif) {  
            this.props.cliqueCarte(carte);
        }
    };

    isDisabled(carte) {
        if (!this.props.actif) {
            return false;
        }
        if (this.props.action === null) {
            return false;
        }
        if ((this.props.action.type === ActionType.DISCARTER) &&
            carte.points !== 0) {
            return true;
        }
        if (this.props.action.type === ActionType.JOUER) {
            if (carte.sorte === this.props.sorteDemandee) {
                return false;
            }
            const idx = this.props.cartes.findIndex(i => i.sorte === this.props.sorteDemandee);
            if (idx === -1) {
                return false;
            }
            return true;
        }
        return false;
    }

    render() {
        return (
            <div>
                <Row gutter={6}>
                    {/* Chaque carte */}
                    {this.props.cartes.map((item, index) => (
                        <Col onClick={e => this.onClick(e, item)} style={{marginTop: item.surelevee && this.props.actif? '-10px' : '0px'}}>
                            <CarteComponent clickable={this.props.actif} disabled={this.isDisabled(item)} carte={item} ouvert={this.props.ouvert}></CarteComponent>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}