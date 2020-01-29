import React, { Component } from 'react';
import { connect } from 'react-redux';
import List from 'components/List/List';
import Nav from 'components/Nav/Nav';
import Wrapper from 'components/Wrapper/Wrapper';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper';
import * as actionCreators from 'store/actions/actionCreators';

class FavGames extends Component {
  state = {
    listOfFavGames: [],
  };

  componentDidMount() {
    const { onGetDataFromLocalStorage, listOfyourFavGames } = this.props;
    onGetDataFromLocalStorage();

    // let listOfyourFavGames = localStorage.getItem('favGames');
    // listOfyourFavGames = JSON.parse(listOfyourFavGames);

    this.setState({
      listOfFavGames: listOfyourFavGames,
    });
  }

  componentDidUpdate(prevProps) {
    const { listOfyourFavGames } = this.props;
    console.log(listOfyourFavGames);

    if (listOfyourFavGames !== prevProps.listOfyourFavGames) {
      this.setState({
        listOfFavGames: listOfyourFavGames,
      });
    }
  }

  componentWillUnmount() {
    const { listOfFavGames } = this.state;
    localStorage.setItem('favGames', JSON.stringify(listOfFavGames));
  }

  render() {
    const { listOfFavGames } = this.state;
    const { onHandleDeleteGameFromFavList } = this.props;
    console.log(listOfFavGames);
    return (
      <>
        <Nav />
        <Wrapper>
          <ContentWrapper>
            <List
              data={listOfFavGames}
              handleDeleteGameFromFavList={id => onHandleDeleteGameFromFavList(id)}
            />
          </ContentWrapper>
        </Wrapper>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    listOfyourFavGames: state.listOfyourFavGames,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onHandleDeleteGameFromFavList: id => dispatch(actionCreators.handleDeleteGameFromFavList(id)),
    onGetDataFromLocalStorage: () => dispatch(actionCreators.getDataFromLocalStorage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavGames);
