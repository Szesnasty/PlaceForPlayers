import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/actionCreators';

import Wrapper from 'components/Wrapper/Wrapper';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper';
import List from 'components/List/List';
import Loading from 'components/Loading/Loading';
import Modal from 'components/Modal/Modal';
import MainHeader from 'components/MainHeader/MainHeader';

import Nav from 'components/Nav/Nav';

const URLAPI = `https://api.rawg.io/api/`;

class Home extends Component {
  state = {
    listOfyourFavGames: [],

    hasMoreToInfinityScroll: true,
    searchValue: '',
  };

  modalRef = React.createRef();

  searchInputRef = React.createRef();

  componentDidMount() {
    window.scrollTo(0, 0);
    const { onInitGamesList, onGetDataFromLocalStorage } = this.props;
    const urlEndpoint = `${URLAPI}games`;

    onInitGamesList(1, 15, urlEndpoint);

    onGetDataFromLocalStorage();
  }

  componentWillUnmount() {
    const { listOfyourFavGames } = this.state;
    localStorage.setItem('favGames', JSON.stringify(listOfyourFavGames));
  }

  // getDataFromLocalStorage = () => {
  //   let listOfyourFavGames = localStorage.getItem('favGames');

  //   if (listOfyourFavGames === null) {
  //     listOfyourFavGames = localStorage.setItem('favGames', JSON.stringify([]));
  //   } else {
  //     listOfyourFavGames = JSON.parse(listOfyourFavGames);
  //   }

  //   this.setState({
  //     listOfyourFavGames,
  //   });
  // };

  handleSearch = e => {
    window.scrollTo(0, 0);
    const searchInputFromRef = this.searchInputRef.current.value;

    this.setState(
      {
        searchValue: searchInputFromRef,
        currentPage: 1,
      },
      () => {
        const timerForSearch = setTimeout(() => {
          console.log(searchInputFromRef);
          if (searchInputFromRef !== '') {
            const { searchValue } = this.state;
            const searchInputFromState = searchValue;

            if (searchInputFromState === searchInputFromRef) {
              const query = `https://api.rawg.io/api/games?search=${searchInputFromState}&page_size=20&ordering=-rating`;
              axios.get(query).then(response => {
                this.setState({
                  listOfGames: response.data.results,
                  hasMoreToInfinityScroll: false,
                });
              });
            }
          } else {
            this.getInitData();
          }
        }, 500);
        return () => {
          clearTimeout(timerForSearch);
        };
      },
    );
  };

  hanldeAddGameToFavList = (e, gameSelectedByClicking) => {
    const { listOfyourFavGames } = this.state;
    let listOfyourFavGamesFromState = listOfyourFavGames;

    const isAleradyExist = listOfyourFavGamesFromState.filter(
      item => item.id === gameSelectedByClicking.id,
    );

    // let msg = '';
    if (isAleradyExist.length === 0) {
      //   msg = 'The game has been added to your list!';
      listOfyourFavGamesFromState = listOfyourFavGamesFromState.concat(gameSelectedByClicking);

      this.setState({
        // msg,
        listOfyourFavGames: listOfyourFavGamesFromState,
      });
    } else {
      //   msg = 'Cannot add because the game is already in your list...';
      //   this.setState({
      //     msg,
      //   });
    }
  };

  render() {
    //   crop/600/400
    const { hasMoreToInfinityScroll } = this.state;
    const {
      onFetchMoreGames,
      listOfGames,
      onHandleShowModal,
      isModal,
      modalContent,
      onHandleHideModal,
    } = this.props;
    const referenceToModal = this.modalRef;

    return (
      <>
        <Wrapper>
          <MainHeader />

          <Nav />
          <ContentWrapper>
            <InfiniteScroll
              dataLength={listOfGames.length}
              // next={this.FetchMoreData}
              next={() => onFetchMoreGames()}
              hasMore={hasMoreToInfinityScroll}
              loader={<Loading />}
            >
              <List
                wayOfDisplayingDetails="modal"
                onClick={e => onHandleShowModal(e)}
                isModal={isModal}
                data={listOfGames}
              />
            </InfiniteScroll>
          </ContentWrapper>
        </Wrapper>
        {isModal ? (
          <Modal
            addFavGame={this.hanldeAddGameToFavList}
            modalRef={referenceToModal}
            onClick={e => onHandleHideModal(e, referenceToModal)}
            modalContent={modalContent}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    listOfGames: state.listOfGames,
    error: state.error,
    msg: state.msg,
    currentPageProps: state.currentPage,
    isModal: state.isModal,
    modalContent: state.modalContent,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onInitGamesList: (currentPage, pageSize, endpoint) =>
      dispatch(actionCreators.initGamesList(currentPage, pageSize, endpoint)),
    onFetchMoreGames: () => dispatch(actionCreators.fetchMoreGames()),
    onHandleShowModal: e => dispatch(actionCreators.handleShowModal(e)),

    onHandleHideModal: (e, referenceToModal) =>
      dispatch(actionCreators.handleHideModal(e, referenceToModal)),
    onGetDataFromLocalStorage: () => dispatch(actionCreators.getDataFromLocalStorage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
