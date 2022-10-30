import React, { Component } from 'react';

import { Button, Form, Input, message } from 'antd';

import "antd/dist/antd.min.css";
import bcrypt from 'bcryptjs';

export class LoginComponent extends Component {

    onFinish = (credentials) => {
        const username = credentials.username;
        const password = credentials.password;
        const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u') // hash created previously created upon sign up
        const body = JSON.stringify({
            username: username,
            password: hashedPassword,
        });
        fetch('/api/credentials', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: body,
        }).then(async res => {
            try {
                await res;
                if (res.status !== 200) {
                    message.error('Pseudonyme ou mot de passe incorrect');
                } else {
                    this.props.login();
                }
            } catch (err) {
                console.log(err);
            };
        })
            .catch(err => {
                console.log(err);
            });
    };

    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    render() {
        return (
            <div>
                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    autoComplete="off"
                >
                    {/* Pseudonyme */}
                    <Form.Item
                        label={<label style={{ color: "white" }}>Pseudonyme</label>}
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Entrez votre pseudonyme!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* Mot de passe */}
                    <Form.Item

                        label={<label style={{ color: "white" }}>Mot de passe</label>}
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Entrez votre mot de passe!',
                            },
                        ]}
                    >
                        <Input.Password style={{ color: 'white' }} />
                    </Form.Item>
                    {/* Se connecter */}
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Se connecter
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}