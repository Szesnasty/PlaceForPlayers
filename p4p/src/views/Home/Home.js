import React, { Component } from 'react';

import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from 'react-redux';
import * as actionCreators from 'store/actions/actionCreators';

import Wrapper from 'components/Wrapper/Wrapper';
import ContentWrapper from 'components/ContentWrapper/ContentWrapper';
import List from 'components/List/List';
import Loading from 'components/Loading/Loading';
import Modal from 'components/Modal/Modal';
import Nav from 'components/Nav/Nav';

const URLAPI = `https://api.rawg.io/api/`;

class Home extends Component {
  state = {
    listOfyourFavGames: [],
  };

  modalRef = React.createRef();

  searchInputRef = React.createRef();

  componentDidMount() {
    window.scrollTo(0, 0);
    const { onInitGamesList, onGetDataFromLocalStorage } = this.props;
    const urlEndpoint = `${URLAPI}games`;

    const pageSize = 15;
    const startPage = 1;
    onInitGamesList(startPage, pageSize, urlEndpoint);

    onGetDataFromLocalStorage();
  }

  componentDidUpdate(prevProps) {
    const { listOfyourFavGames } = this.props;
    if (listOfyourFavGames !== prevProps.listOfyourFavGames) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        listOfyourFavGames,
      });
    }
  }

  componentWillUnmount() {
    const { listOfyourFavGames } = this.state;
    localStorage.setItem('favGames', JSON.stringify(listOfyourFavGames));
  }

  render() {
    const {
      onFetchMoreGames,
      listOfGames,
      onHandleShowModal,
      isModal,
      modalContent,
      onHandleHideModal,
      hasMoreDataToInfinityScroll,
    } = this.props;
    const referenceToModal = this.modalRef;

    return (
      <>
        <Wrapper>
          <Nav />
          <ContentWrapper>
            <InfiniteScroll
              dataLength={listOfGames.length}
              // next={this.FetchMoreData}
              next={() => onFetchMoreGames()}
              hasMore={hasMoreDataToInfinityScroll}
              loader={<Loading />}
            >
              <List
                wayOfDisplayingDetails="modal"
                onClick={e => onHandleShowModal(e)}
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
    hasMoreDataToInfinityScroll: state.hasMoreDataToInfinityScroll,
    listOfyourFavGames: state.listOfyourFavGames,
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
