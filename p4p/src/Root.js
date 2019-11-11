import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Root extends Component {
  state = {  }
  render() { 
    return ( 
      <Router>
        <Switch>
          <Route exact path="/"><h1>Main Board</h1></Route>
        </Switch>
        <Switch>
          <Route exact path="/details/:id"><h1>Details of game</h1></Route>
        </Switch>
      </Router>
     );
  }
}
 
export default Root;