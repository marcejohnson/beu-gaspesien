import React, { Component } from 'react';

import "antd/dist/antd.css";
import { CartesComponent } from './cartes-component';

export class JoueurComponent extends Component {

    constructor(props) {
        super(props);
    }

    onDiscarte(carte) {
        this.props.cliqueCarte(carte);
    } 

    isJoueurActif() {
        return this.props.joueur.actif;
    }

    render() {

        return (
            <div className="App-center">
                {/* Nom au-dessus */}
                {(!this.props.moi) &&
                    <p style={{fontSize: '24px', marginBottom: '0px', color: this.props.joueur.actif ? 'rgb(32,166,237)' : 'white'}}>{this.props.joueur.getNom()}</p>
                }
                {/* Cartes */}
                <CartesComponent sorteDemandee={this.props.sorteDemandee} action={this.props.action} actif={this.props.joueur.actif} cliqueCarte={(carte) => this.onDiscarte(carte)} ouvert={this.props.ouvert} cartes={this.props.joueur.getCartes()}></CartesComponent>
                {/* Nom en-dessous */}
                {(this.props.moi) &&
                    <p style={{fontSize: '24px', marginBottom: '0px', color: this.props.joueur.actif ? 'rgb(32,166,237)' : 'white'}}>{this.props.joueur.getNom()}</p>
                }
            </div>
        )
    }
}