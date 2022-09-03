import React, { Component } from "react";
import "./App.css";

import { TableComponent } from "./components/table-component";
import { Modal, Layout, Col, Row, Switch, Button } from "antd";
import "antd/dist/antd.css";
import { LoginComponent } from "./components/login-component";
import { MiseComponent } from "./components/mise-component";
import { Mise } from "./models/mise";
import { Action, ActionType } from "./models/action";

const { Header, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
    this.state = {
      action: new Action(),
      avecQuettee: true,
      loggedIn: true,
      titre: '',
      ouvert: true,
      showGager: false,
      mise: null
    };
    this.joueurs = [];

    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          titre: data.message
        })
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
    this.setState({
      action: new Action()
    })
  };

  login() {
    this.setState({ loggedIn: true });
  }

  getJoueurs() {
    return this.tableRef.current.getJoueurs();
  }

  onGager = () => {
    this.setState({
      mise: new Mise()
    })
    this.joueurs = this.getJoueurs();
    this.setState({
      showGager: true,
    });
  }

  onOk = (e) => {
    this.setState({
      showGager: false,
    });
    const titre = this.state.mise.getStr();
    this.setState({
      titre: titre
    })
    const paquet = this.tableRef.current.state.paquet;
    this.nextAction();
  }

  onCancel = (e) => {
    this.setState({
      showGager: false,
    });
  }

  nextAction() {
    const paquet = this.tableRef.current.state.paquet;
    const action = this.state.action.next(this.state.mise, this.state.avecQuettee, paquet, null);
    this.setState({
      action: action
    });
    if (action.type === ActionType.REMPORTER) {
      setTimeout(() => {
        this.nextAction();
      }, 3000);
    }
  }

  getSousTitre() {
    let sousTitre = this.state.action.getMsg();
    if (this.state.action.type === ActionType.JOUER && this.tableRef.current.state.paquet.sorteDemandee) {
      sousTitre = `${sousTitre} (${this.tableRef.current.state.paquet.sorteDemandee} demandé)`
    }
    return sousTitre;
  }

  onNextAction = (e) => {
    this.nextAction();
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
          <h1 style={{ color: "white", marginBottom: '-20px' }}>{this.state.titre}</h1>
          {
            // Sous-titre
            (this.state.loggedIn) &&
              <h2 style={{ color: "rgb(32,166,237)" }}>{this.getSousTitre()}</h2>
          }
        </Header>
        <Content>
          {/* Connecté */}
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
                    <Switch defaultChecked onChange={(checked) => this.onJeuOuvert(checked)} />
                  </Col>
                </Row>
                <Button type="primary" onClick={() => this.onBrasser()}>Brasser</Button>
                <Button style={{ marginTop: '15px' }} type="primary" onClick={() => this.onGager()}>Gager</Button>
              </div>
              {/* Table */}
              <div className="App-center" style={{ marginTop: '-60px', height: '100vh' }}>
                <TableComponent action={this.state.action} nextAction={this.onNextAction} mise={this.state.mise} ref={this.tableRef} ouvert={this.state.ouvert} avecQuettee={this.state.avecQuettee}></TableComponent>
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