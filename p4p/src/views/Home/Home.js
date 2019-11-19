import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

import HomeWrapper from 'components/HomeWrapper/HomeWrapper';
import List from 'components/List/List';
import Loading from 'components/Loading/Loading';
import Modal from 'components/Modal/Modal';
import HeroSection from 'components/HeroSection/HeroSection';
import Search from 'components/Search/Search';
import Nav from 'components/Nav/Nav';

class Home extends Component {
  state = {
    currentPage: 1,
    isModal: false,
    listOfGames: [],
    listOfyourFavGames: [],
    modalContent: '',
    pageSize: 12,
    hasMoreToInfinityScroll: true,
    searchValue: '',
  };

  modalRef = React.createRef();

  searchInputRef = React.createRef();

  componentDidMount() {
    this.getInitData();

    this.getDataFromLocalStorage();
  }

  componentWillUnmount() {
    const { listOfyourFavGames } = this.state;
    localStorage.setItem('favGames', JSON.stringify(listOfyourFavGames));
  }

  getDataFromLocalStorage = () => {
    let listOfyourFavGames = localStorage.getItem('favGames');

    if (listOfyourFavGames === null) {
      listOfyourFavGames = localStorage.setItem('favGames', JSON.stringify([]));
    } else {
      listOfyourFavGames = JSON.parse(listOfyourFavGames);
    }

    this.setState({
      listOfyourFavGames,
    });
  };

  getInitData = () => {
    const { currentPage, pageSize } = this.state;

    axios
      .get(`https://api.rawg.io/api/games?page=${currentPage}&page_size=${pageSize}`)
      .then(response => {
        const listOfGames = response.data.results;

        this.setState({
          currentPage: currentPage + 1,
          hasMoreToInfinityScroll: true,
          listOfGames,
        });
      });
  };

  handleShowModal = e => {
    const { listOfGames } = this.state;
    const singleGameObject = listOfGames.filter(singleGameDetails => singleGameDetails.id === e);

    this.setState({
      isModal: true,
      modalContent: singleGameObject,
    });
  };

  handleCloseModal = e => {
    if (e.target === this.modalRef.current) {
      this.setState({
        isModal: false,
      });
    }
  };

  FetchMoreData = () => {
    const { currentPage, pageSize, listOfGames } = this.state;
    this.setState(
      {
        currentPage: currentPage + 1,
      },
      () => {
        const timer = setTimeout(() => {
          axios
            .get(`https://api.rawg.io/api/games?page=${currentPage}&page_size=${pageSize}`)
            .then(response =>
              this.setState({
                listOfGames: [...listOfGames].concat(response.data.results),
              }),
            )
            .catch(err => err);
        }, 400);

        return () => {
          clearTimeout(timer);
        };
      },
    );
  };

  handleSearch = () => {
    window.scrollTo(0, 0);
    const searchInputFromRef = this.searchInputRef.current.value;
    const { searchValue } = this.state;
    this.setState(
      {
        searchValue: searchInputFromRef,
        currentPage: 1,
      },
      () => {
        const timerForSearch = setTimeout(() => {
          if (searchInputFromRef !== '') {
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

  addGameToFavList = (e, gameSelectedByClicking) => {
    const { listOfyourFavGames } = this.state;
    let listOfyourFavGamesFromState = listOfyourFavGames;

    // heck is alerady exist in array
    // handleCheck(val) {
    //     return this.state.data.some(item => val.name === item.name);
    // }

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
    const { isModal, modalContent, listOfGames, hasMoreToInfinityScroll } = this.state;

    return (
      <>
        <Nav />
        <HeroSection />
        <Search searchInputRef={this.searchInputRef} onChange={this.handleSearch} />

        <HomeWrapper>
          <InfiniteScroll
            dataLength={listOfGames.length}
            next={this.FetchMoreData}
            hasMore={hasMoreToInfinityScroll}
            loader={<Loading />}
          >
            <List
              wayOfDisplayingDetails="modal"
              onClick={this.handleShowModal}
              isModal={isModal}
              data={listOfGames}
            />
          </InfiniteScroll>
        </HomeWrapper>
        {isModal ? (
          <Modal
            addFavGame={this.addGameToFavList}
            modalRef={this.modalRef}
            onClick={this.handleCloseModal}
            modalContent={modalContent}
          />
        ) : null}
      </>
    );
  }
}

export default Home;
