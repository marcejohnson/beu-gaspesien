import React, { Component } from 'react';

import "antd/dist/antd.css";
import { CartesComponent } from './cartes-component';

export class JoueurComponent extends Component {

    render() {

        return (
            <div className="App-center">
                {/* Nom au-dessus */}
                {(!this.props.moi) &&
                    <p style={{ marginBottom: '0px', color: 'white', fontSize: '24px' }}>{this.props.joueur.getNom()}</p>
                }
                {/* Cartes */}
                <CartesComponent ouvert={this.props.ouvert} cartes={this.props.joueur.getCartes()}></CartesComponent>
                {/* Nom en-dessous */}
                {(this.props.moi) &&
                    <p style={{ marginBottom: '0px', color: 'white', fontSize: '24px' }}>{this.props.joueur.getNom()}</p>
                }
            </div>
        )
    }
}