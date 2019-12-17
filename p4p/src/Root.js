import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from 'views/Home/Home';
import DetailsPage from 'views/DetailsPage/DetailsPage';
import FavGames from 'views/FavGames/FavGames';

// https://api.rawg.io/docs/

class Root extends Component {
  state = {};

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/details/:id" render={props => <DetailsPage {...props} />} />
          <Route exact path="/your-fav-games" render={props => <FavGames {...props} />} />
        </Switch>
      </Router>
    );
  }
}

export default Root;
