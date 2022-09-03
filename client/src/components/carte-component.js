import React, { Component } from 'react';

import { Card } from 'antd';

import "antd/dist/antd.css";

export class CarteComponent extends Component {
    
    render() {
        return (
            <div>
                <Card 
                    hoverable
                    bordered
                    style={{
                        width: 45, height: 70, 
                        backgroundColor: this.props.carte.rang === -1 ? 'transparent' : 'white',                        
                        borderColor: this.props.carte.rang === -1 ? 'transparent' : 'white'
                    }}
                    cover={
                        <div className="App-center">
                            {/* Ouvert */}
                            {
                                (this.props.ouvert) &&
                                <div hidden={this.props.carte.rang === -1}>
                                    <p style={{ color: this.props.carte.couleur, fontSize: '24px', marginTop: '-5px' }}>
                                        {this.props.carte.symbole}
                                    </p>
                                    <div style={{ marginTop: this.props.carte.symbole === '' ? '-10px' : '-25px' }}><img alt="oups..." className={this.props.carte.symbole === '' ? 'App-jokers' : 'App-sorte'} src={require(`../assets/images/${this.props.carte.image}`)} /></div>
                                </div>
                            }
                            {/* Cachée */}
                            {
                                (!this.props.ouvert) &&
                                <div>
                                    <div className="App-center" style={{marginTop: '3px'}}><img style={{height: '65px', width: '40px'}} alt="oups..." src={require(`../assets/images/endos.png`)} /></div>
                                </div>
                            }
                        </div>
                    }
                >
                </Card>
            </div>
        )
    }
}