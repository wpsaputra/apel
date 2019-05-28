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
            <RouteLayout exact path="/" component={Home} />
            <RouteLayout path="/penilaian" component={Penilaian} />
            <RouteLayout path="/rekapp" component={Rekapp} />
            <RouteLayout path="/rekapb" component={Rekapb} />
            <RouteLayout path="/admin" component={Admin} />
            <RouteLayout path="/faq" component={Panduan} />
            <Route path="/login" component={WrappedNormalLoginForm} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
