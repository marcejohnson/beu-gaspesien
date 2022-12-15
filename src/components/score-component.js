import React, { Component } from 'react';

import { Table } from 'antd';

import "antd/dist/antd.min.css";

export class ScoreComponent extends Component {
    constructor(props) {
        super(props);

        this.data = [];
        this.updateData(props.brasses);
        this.columns = [
            {
                title: 'Brasse',
                dataIndex: 'key',
                key: 'key',
            },
            {
                title: 'Brasseur',
                dataIndex: 'brasseur',
                key: 'brasseur',
            },
            {
                title: 'Nous',
                dataIndex: 'nous',
                key: 'eux',
            },
            {
                title: 'Eux',
                dataIndex: 'eux',
                key: 'eux',
            },
        ];
    }

    updateData(brasses) {
        this.data = [];
        for (let brasse of brasses) {
            const ligne = { key: brasse.idx + 1, 
                brasseur: brasse.brasseur.getNom(), 
                nous: brasse.done ? brasse.points[0] : null, 
                eux: brasse.done ? brasse.points[1] : null };
            this.data.push(ligne);
        }
    }

    render() {
        return (
            <div>
                <Table size="small" columns={this.columns} dataSource={this.data} />
            </div>
        )
    }
}