import React, { Component } from "react";
import "./App.css";

import { TableComponent } from "./components/table-component";
import { Modal, Layout, Col, Row, Switch, Button } from "antd";
import "antd/dist/antd.css";
import { LoginComponent } from "./components/login-component";
import { MiseComponent } from "./components/mise-component";
import { Mise } from "./models/mise";

const { Header, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      avecQuettee: true,
      loggedIn: false,
      titre: '',
      ouvert: false,
      showGager: false,
      mise: new Mise()
    };
    this.joueurs = [];

    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        this.setState({ titre: data.message });
      });
  }

  onQuettee(checked) {
    this.state.avecQuettee = checked;
    this.tableRef.current.brasser(this.state.avecQuettee);
  };

  onJeuOuvert() {
    this.setState(state => ({
      ouvert: !state.ouvert
    }));
  }

  onBrasser() {
    this.tableRef.current.brasser(this.state.avecQuettee);
    this.state.mise = new Mise();
  };

  login() {
    this.setState({ loggedIn: true });
  }

  getJoueurs() {
    return this.tableRef.current.getJoueurs();
  }

  onGager = () => {
    this.joueurs = this.getJoueurs();
    this.setState({
      showGager: true,
    });
  }

  onOk = (e) => {
    console.log(e);
    this.setState({
      showGager: false,
    });
    const titre = this.state.mise.getStr();
    this.setState({ titre: titre });
  }

  onCancel = (e) => {
    console.log(e);
    this.setState({
      showGager: false,
    });
  }

  bg = {
    overlay: {
      background: "#FFFF00"
    }
  };

  render() {
    return (
      <div className="App"
        style={{
          backgroundColor: "rgb(50,50,50)"
        }}>
        {/* Titre */}
        <Header
          style={{
            backgroundColor: "rgb(50,50,50)"
          }}>
          <h1
            style={{ color: "white" }}>{this.state.titre}</h1>
        </Header>
        <Content>
          {/* Connexté */}
          {
            (this.state.loggedIn) &&
            <div>
              {/* Contrôles */}
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
                <Button style={{ marginTop: '15px' }} type="primary" onClick={() => this.onGager()}>Gager</Button>
              </div>
              {/* Table */}
              <div className="App-center" style={{ marginTop: '-60px', height: '100vh' }}>
                <TableComponent ref={this.tableRef} ouvert={this.state.ouvert} avecQuettee={this.state.avecQuettee}></TableComponent>
              </div>
              {/* Gager */}
              <Modal styles={this.bg}
                title="Configurer la mise"
                visible={this.state.showGager}
                onOk={this.onOk}
                onCancel={this.onCancel}
              >
                <MiseComponent mise={this.state.mise} joueurs={this.joueurs}></MiseComponent>
              </Modal>
            </div>
          }
          {/* Connexion */}
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