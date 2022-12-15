import React, { Component } from 'react';

import { Row, Col } from 'antd';

import "antd/dist/antd.min.css";
import { CarteComponent } from './carte-component';
import { ActionType } from '../models/action';

export class CartesComponent extends Component {

    onClick = (e, carte) => {
        if (this.isDisabled(carte) || !this.isClickable()) {
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

    isClickable(){
        return this.props.actif && this.props.action.type !== ActionType.CHOISIR_ATOUT;
    }

    render() {
        return (
            <div>
                <Row gutter={6}>
                    {/* Chaque carte */}
                    {this.props.cartes.map((carte, index) => (
                        <Col onClick={e => this.onClick(e, carte)} style={{ marginTop: carte.surelevee && this.props.actif ? '-10px' : '0px' }} key={index}>
                            <CarteComponent clickable={this.isClickable()} disabled={this.isDisabled(carte)} carte={carte} ouvert={this.props.ouvert} auto={this.props.auto}></CarteComponent>
                        </Col>
                    ))}
                </Row>
            </div>
        )
    }
}