import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from 'views/Home/Home';
import DetailsPage from 'views/DetailsPage/DetailsPage';

// https://api.rawg.io/docs/

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
          <Route 
              exact 
              path="/details/:id" 
              render={props => (
                <DetailsPage {...props} />
                )
              }
          />
        </Switch>
      </Router>
     );
  }
}
 
export default Root;