import React, { Component } from 'react';

import { Form, Select } from 'antd';
import { TestType } from './tests';

export class TestComponent extends Component {
    constructor(props) {
        super(props);
        this.tests = [];
        Object.keys(TestType).map((item, index) => 
            this.tests.push(<Select.Option key={index}>{item}</Select.Option>)
        );
        this.test = this.tests[0].props.children;
    }

    onChange(test) {
        this.test = this.tests[String(test)].props.children;
    }    

    render() {
        return (
            <div>
                <Form
                    colon={false}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                >
                    <Form.Item label="Test" required style={{width: '600px'}}>
                        {/* Joueur */}
                        <Select allowClear onChange={(test) => this.onChange(test)} defaultValue={this.tests[0]}>
                            {this.tests}
                        </Select>
                    </Form.Item>                    
                </Form>
            </div>
        )
    }
}