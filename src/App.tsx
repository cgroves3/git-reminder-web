import React, {Component} from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import logo from './logo.svg';
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import './App.css';
import Backdrop from "./components/backdrop/backdrop";
import SideDrawer from "./components/sideDrawer/sideDrawer";
import PasswordReset from "./pages/passwordReset/passwordReset";

interface SideDrawerState {
  sideDrawerOpen: boolean
}

class App extends Component {

  state: Readonly<SideDrawerState> = {
    sideDrawerOpen: false
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState: SideDrawerState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen}
    })
  }

  sideDrawerCloseClickHandler = () => {
    this.setState({sideDrawerOpen: false})
  }

  render () {
    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop/>
    }
    return (
        <Router>
          <Switch>
            <Route exact path="/">
              <Home/>
            </Route>
            <Route exact path="/signin">
              <Login/>
            </Route>
            <Route exact path="/signup">
              <SignUp/>
            </Route>
            <Route exact path="/password_reset">
              <PasswordReset/>
            </Route>
          </Switch>
          <SideDrawer onClose={this.sideDrawerCloseClickHandler} show={this.state.sideDrawerOpen}/>
          {backdrop}
        </Router>
    );
  }
}

export default App;
