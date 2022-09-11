import React, { Component } from 'react';

import { Row, Col } from 'antd';

import "antd/dist/antd.css";
import { CarteComponent } from './carte-component';
import { ActionType } from '../models/action';

export class CartesComponent extends Component {

    onClick = (e, carte) => {
        if (this.isDisabled(carte)) {
            return;
        }
        if (e.detail === 2 && this.props.actif) {
            this.props.cliqueCarte(carte);
        }
    };

    atoutDemande() {
        return this.props.sorteDemandee === this.props.mise.atout;
    }

    isDisabled(carte) {
        if (!this.props.actif) {
            return false;
        }
        if (this.props.action === null) {
            return false;
        }
        if (this.props.mise === null) {
            return false;
        }
        if (this.props.action.type === ActionType.DISCARTER && carte.points !== 0) {
            return true;
        }
        if (this.props.action.type === ActionType.JOUER) {
            return carte.isDisabled(this.props.cartes, this.props.sorteDemandee, this.props.mise.atout);
        }
        return false;
    }

    render() {
        return (
            <div>
                <Row gutter={6}>
                    {/* Chaque carte */}
                    {this.props.cartes.map((carte, index) => (
                        <Col onClick={e => this.onClick(e, carte)} style={{ marginTop: carte.surelevee && this.props.actif ? '-10px' : '0px' }} key={index}>
                            <CarteComponent clickable={this.props.actif} disabled={this.isDisabled(carte)} carte={carte} ouvert={this.props.ouvert}></CarteComponent>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}