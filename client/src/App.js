import React, { Component } from "react";
import "./App.css";

import { TableComponent } from "./components/table-component";
import { Layout, Col, Row, Switch, Button } from "antd";
import "antd/dist/antd.css";
import { LoginComponent } from "./components/login-component";

const { Header, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      avecQuettee: true,
      loggedIn: false,
      titre: '',
      ouvert: false
    };


    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        this.setState({titre: data.message});
      });
  }

  onQuettee(checked) {
    this.state.avecQuettee = checked;
    this.tableRef.current.brasser(this.state.avecQuettee);
  };

  onJeuOuvert(checked) {
    console.log(checked)
    
    this.setState(state => ({
      ouvert: !state.ouvert
    }));
  }

  onBrasser() {
    this.tableRef.current.brasser(this.state.avecQuettee);
  };

  login() {
    this.setState({ loggedIn: true });
  }

  render() {
    return (
      <div className="App"
        style={{
          backgroundColor: "rgb(50,50,50)"
        }}>
        <Header 
        style={{
          backgroundColor: "rgb(50,50,50)"
        }}>
          <h1
          style={{color: "white"}}>{this.state.titre}</h1>
        </Header>
        <Content>
          {
            (this.state.loggedIn) &&
            <div>
              <div className="App-controls">
                <Row gutter={6}>
                  <Col><p style={{ color: 'white' }}>Quettée </p></Col>
                  <Col>
                    <Switch defaultChecked onChange={(checked) => this.onQuettee(checked)} />
                  </Col>
                </Row>
                <Row gutter={6}>
                  <Col><p style={{ color: 'white' }}>Jeu ouvert</p></Col>
                  <Col>
                    <Switch onChange={(checked) => this.onJeuOuvert(checked)} />
                  </Col>
                </Row>
                <Button type="primary" onClick={() => this.onBrasser()}>Brasser</Button>
              </div>
              <div className="App-center" style={{ height: '100vh' }}>
                <TableComponent ref={this.tableRef} ouvert={this.state.ouvert} avecQuettee={this.state.avecQuettee}></TableComponent>
              </div>
            </div>
          }
          {
            (!this.state.loggedIn) &&
            <div className="App-center" style={{ height: '100vh' }}>
              <LoginComponent login={() => this.login()}></LoginComponent>
            </div>
          }
        </Content>
      </div>
    );
  }
}

export default App;