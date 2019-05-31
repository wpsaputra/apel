import React from 'react';
// import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
// import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/home'
import WrappedNormalLoginForm from './pages/login'
import Penilaian from './pages/penilaian'
import Rekapb from './pages/rekapb';
import Rekapp from './pages/rekapp';
import Admin from './pages/admin';
import Panduan from './pages/panduan';
import RouteLayout from './layout/RouteLayout';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      id_gol: "",
      id_level: "",
      id_org: "",
      id_satker: "",
      nama: "",
      niplama: "",
    };
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            {/* <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              <Route path="/login" component={Login} />
              <RouteLayout path="/home" component={Home} />
              <RouteLayout path="/page1" component={Page1} />
              <RouteLayout path="/page2" component={Page2} />
              <Route component={PageNotFound} /> */}
            <RouteLayout auth={this.state} exact path="/" component={Home} />
            <RouteLayout auth={this.state} path="/penilaian" component={Penilaian} />
            <RouteLayout auth={this.state} path="/rekapp" component={Rekapp} />
            <RouteLayout auth={this.state} path="/rekapb" component={Rekapb} />
            <RouteLayout auth={this.state} path="/admin" component={Admin} />
            <RouteLayout auth={this.state} path="/faq" component={Panduan} />
            {/* <Route auth={this.state} signIn={this.signIn} path="/login" component={WrappedNormalLoginForm} /> */}
            <Route
              path='/login'
              render={(props) => <WrappedNormalLoginForm {...props} auth={this.state} />}
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
