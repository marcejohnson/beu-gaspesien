import React, { Component } from "react";
import "./App.css";

import { TableComponent } from "./components/table-component";
import { Modal, Layout, Col, Row, Switch, Button } from "antd";
import "antd/dist/antd.css";
import { LoginComponent } from "./components/login-component";
import { MiseComponent } from "./components/mise-component";
import { Mise } from "./models/mise";
import { Action, ActionType } from "./models/action";
import { Partie } from "./models/partie";
import { Paquet } from "./models/paquet";
import { ScoreComponent } from "./components/score-component";

const { Header, Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    const avecQuettee = true;
    const paquet = new Paquet(avecQuettee);
    this.scoreRef = React.createRef();
    this.tableRef = React.createRef();
    this.state = {
      action: new Action(),
      avecQuettee: avecQuettee,
      loggedIn: true,
      ouvert: true,
      showGager: false,
      showScore: false,
      mise: null,
      paquet: paquet,
      choisirAtout: false,
      auto: false,
      titre: null
    };
    this.partie = new Partie(paquet);
    this.joueurs = [];
    this.attendre = false;
    this.atoutConnu = false;;
  }

  componentDidMount() {
    if (this.state.titre === null) {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => {
          this.setState({ titre: data.message });
        });
    }
  }

  onQuettee(checked) {
    this.setState({ avecQuettee: checked });
    this.state.paquet.brasser(checked);
    this.nextAction();
  };

  onJeuOuvert() {
    this.setState(state => ({
      ouvert: !state.ouvert
    }));
  }

  onAuto() {
    this.setState(state => ({
      auto: !state.auto
    }));
  }

  onBrasser() {
    this.partie.paquet.brasser(this.state.avecQuettee);
    this.setState({ mise: null });
    this.setState({
      action: new Action()
    })
  };

  login() {
    this.setState({ loggedIn: true });
  }

  onGager = () => {
    let mise;
    if (this.state.mise === null) {
      mise = new Mise();
      this.setState({
        mise: mise
      })
    }

    this.joueurs = this.state.paquet.getJoueurs();
    this.setState({
      showGager: true,
    });
  }

  onScore = () => {
    if (this.scoreRef.current !== null) {
      this.scoreRef.current.updateData(this.partie.brasses);
    }
    this.setState({
      showScore: true,
    });
  }

  onGagerOk = (e) => {
    this.setState({
      showGager: false,
      choisirAtout: !this.state.choisirAtout
    });
    const titre = this.state.mise.getStr();
    this.setState({
      titre: titre
    })
    this.nextAction();
  }

  onGagerCancel = (e) => {
    this.setState({
      showGager: false,
    });
  }

  onScoreOk = (e) => {
    this.setState({
      showScore: false,
    });
  }

  onScoreCancel = (e) => {
    this.setState({
      showScore: false,
    });
  }

  nextAction() {
    const paquet = this.state.paquet;
    const brasseur = this.partie.brasses[this.partie.brasses.length - 1].brasseur;
    const action = this.state.action.next(this.state.mise, this.state.avecQuettee, paquet, brasseur, this.state.auto);
    this.setState({
      action: action
    });
    if (action.type === ActionType.REMPORTER) {
      paquet.attendre = true;
      setTimeout(() => {
        this.nextAction();
        paquet.attendre = false;
      }, 500);
    }
    if (action.type === ActionType.BRASSER) {
      debugger
      this.partie.nextBrasse(this.state.paquet.points, this.state.mise);
      this.setState({ showScore: true },
        this.onScore);
    }

    if (action.type === ActionType.JOUER && action.joueur.index !== 0 && this.state.auto) {
      setTimeout(() => {
        this.tableRef.current.onCliqueCarte(this.state.paquet.getMeilleureCarte(action));
        paquet.attendre = false;
      }, 500);
    }
  }

  getSousTitre() {
    let sousTitre = this.state.action.getMsg();
    if (this.state.action !== null && this.state.partie !== null) {
      if (this.state.action.type === ActionType.JOUER && this.state.paquet.sorteDemandee) {
        sousTitre = `${sousTitre} (${this.state.paquet.sorteDemandee} demandé)`
      }
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
                <Row gutter={6}>
                  <Col><p style={{ color: 'white' }}>Auto</p></Col>
                  <Col>
                    <Switch onChange={(checked) => this.onAuto(checked)} />
                  </Col>
                </Row>
                <Button type="primary" onClick={() => this.onBrasser()}>Brasser</Button>
                <Button style={{ marginTop: '15px' }} type="primary" onClick={() => this.onGager()}>Gager</Button>
                <Button style={{ marginTop: '15px' }} type="primary" onClick={() => this.onScore()}>Score</Button>
              </div>
              {/* Table */}
              <div className="App-center" style={{ marginTop: '-60px', height: '100vh' }}>
                <TableComponent ref={this.tableRef} paquet={this.state.paquet} action={this.state.action} nextAction={this.onNextAction} mise={this.state.mise} ouvert={this.state.ouvert} avecQuettee={this.state.avecQuettee}></TableComponent>
              </div>
              {/* Gager */}
              <Modal styles={this.bg}
                title="Configurer la mise"
                visible={this.state.showGager}
                onOk={this.onGagerOk}
                onCancel={this.onGagerCancel}
              >
                <MiseComponent mise={this.state.mise} joueurs={this.joueurs} atoutEnabled={this.state.choisirAtout}></MiseComponent>
              </Modal>
              {/* Score */}
              <Modal styles={this.bg}
                title="Score"
                visible={this.state.showScore}
                onOk={this.onScoreOk}
                onCancel={this.onScoreCancel}
              >
                <ScoreComponent brasses={this.partie.brasses}
                  ref={this.scoreRef}></ScoreComponent>
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