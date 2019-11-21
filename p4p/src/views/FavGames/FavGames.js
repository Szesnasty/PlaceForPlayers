import React, { Component } from 'react';
import List from 'components/List/List';
import Nav from 'components/Nav/Nav';
import Wrapper from 'components/Wrapper/Wrapper';

class FavGames extends Component {
  state = {
    listOfFavGames: [],
  };

  componentDidMount() {
    let listOfyourFavGames = localStorage.getItem('favGames');
    listOfyourFavGames = JSON.parse(listOfyourFavGames);

    this.setState({
      listOfFavGames: listOfyourFavGames,
    });
  }

  componentWillUnmount() {
    const { listOfFavGames } = this.state;
    localStorage.setItem('favGames', JSON.stringify(listOfFavGames));
  }

  handleDeleteGameFromFavList = id => {
    const { listOfFavGames } = this.state;
    const listOfyourFavGamesFromState = listOfFavGames;

    const deleteItemFromFavGame = listOfyourFavGamesFromState.filter(item => item.id !== id);

    this.setState({
      listOfFavGames: deleteItemFromFavGame,
    });
  };

  render() {
    const { listOfFavGames } = this.state;
    console.log(listOfFavGames);
    return (
      <>
        <Nav />
        <Wrapper>
          <List
            data={listOfFavGames}
            handleDeleteGameFromFavList={this.handleDeleteGameFromFavList}
          />
        </Wrapper>
      </>
    );
  }
}

export default FavGames;
