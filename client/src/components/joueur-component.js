import React, { Component } from 'react';

import "antd/dist/antd.css";
import { CartesComponent } from './cartes-component';

export class JoueurComponent extends Component {

    render() {

        return (
            <div className="App-center">
                {(!this.props.moi) &&
                    <p style={{ marginBottom: '0px', color: 'white', fontSize: '24px' }}>{this.props.joueur.getNom()}</p>
                }
                <CartesComponent ouvert={this.props.ouvert} cartes={this.props.joueur.getCartes()}></CartesComponent>
                {(this.props.moi) &&
                    <p style={{ marginBottom: '0px', color: 'white', fontSize: '24px' }}>{this.props.joueur.getNom()}</p>
                }
            </div>
        )
    }
}