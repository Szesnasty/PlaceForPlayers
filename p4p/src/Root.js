import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from 'views/Home/Home'

class Root extends Component {
  state = {  }
  render() { 
    return ( 
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
        <Switch>
          <Route exact path="/details/:id"><h1>Details of game</h1></Route>
        </Switch>
      </Router>
     );
  }
}
 
export default Root;