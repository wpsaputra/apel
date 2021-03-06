import React from 'react';
// import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
import './index.css';
// import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './pages/home'
import WrappedNormalLoginForm from './pages/login'
import Penilaian from './pages/penilaian'
import Penilaianes3 from './pages/penilaianes3'
import Rekapb from './pages/rekapb';
import Rekapp from './pages/rekapp';
// import Admin from './pages/admin';
import Panduan from './pages/panduan';
import RouteLayout from './layout/RouteLayout';
import NotFound from './pages/notfound';
import Rekapu from './pages/rekapu';

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
      nm_satker: "",
      date: ""
    };
    this.checkLocalStorage = this.checkLocalStorage.bind(this); 
  }

  checkLocalStorage(){
    let storage = localStorage.getItem("apel-state");
    if(storage!==null){
      // console.log("null");
      // console.log(storage);
      let temp = JSON.parse(storage);
      temp = temp.auth;
      let currentDate = new Date();
      let prevDate = Date.parse(temp.date);
      let diff = Math.abs(currentDate - prevDate) / 3600000; //get hours difference
      console.log(diff);
      if(diff<=2){
        this.setState({isSignedIn: true});
        this.setState({...temp});
      }

    }
  }

  componentWillMount(){
    this.checkLocalStorage();
    // this.setState({isSignedIn: true});
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
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
            <RouteLayout auth={this.state} path="/penilaian_eselon_3" component={Penilaianes3} />
            <RouteLayout auth={this.state} path="/rekapp" component={Rekapp} />
            <RouteLayout auth={this.state} path="/rekapb" component={Rekapb} />
            <RouteLayout auth={this.state} path="/rekapu" component={Rekapu} />
            {/* <RouteLayout auth={this.state} path="/admin" component={Admin} /> */}
            <RouteLayout auth={this.state} path="/faq" component={Panduan} />
            {/* <RouteLayout auth={this.state} path="/404" component={NotFound} /> */}
            {/* <RouteLayout auth={this.state} component={NotFound} /> */}
            {/* <Route auth={this.state} signIn={this.signIn} path="/login" component={WrappedNormalLoginForm} /> */}
            <Route
              path='/login'
              render={(props) => <WrappedNormalLoginForm {...props} auth={this.state} />}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
