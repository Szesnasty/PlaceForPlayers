import * as actionType from 'store/actions/actionType';
import axios from 'axios';

// const URLAPI = process.env.REACT_APP_URL_API;
const URLAPI = `https://api.rawg.io/api/`;

export const initGamesListSuccess = (listOfGames, currentPage, msg) => {
  return {
    type: actionType.INIT_GAMES_LIST_SUCCESS,
    listOfGames,
    currentPage,
    msg,
  };
};

export const initGamesListFailed = error => {
  return {
    type: actionType.INIT_GAMES_LIST_FAILED,
    error: error.response,
  };
};

export const initGamesList = (currentPage, pageSize, endpoint) => {
  return dispatch => {
    const fullURL = `${endpoint}?page=${currentPage}&page_size=${pageSize}`;

    axios
      .get(fullURL)
      .then(response => {
        console.log(response.status);
        const listOfGames = response.data.results;
        const msg = response.status;

        dispatch(initGamesListSuccess(listOfGames, currentPage, msg));
      })
      .catch(error => {
        dispatch(initGamesListFailed(error));
      });
  };
};

const fetchMoreGamesSuccess = (listOfGames, currentPage, msg) => {
  return {
    type: actionType.FETCH_MORE_GAMES_SUCCESS,
    listOfGames,
    currentPage,
    msg,
  };
};

export const fetchMoreGames = () => {
  return (dispatch, getState) => {
    const { currentPage } = getState();
    const nextPage = currentPage + 1;

    const pageSize = 12;
    const fullURL = `${URLAPI}games?page=${nextPage}&page_size=${pageSize}`;
    console.log(fullURL);
    const timer = setTimeout(() => {
      axios
        .get(fullURL)
        .then(response => {
          const listOfGames = response.data.results;
          console.log(listOfGames);
          const msg = response.status;

          dispatch(fetchMoreGamesSuccess(listOfGames, nextPage, msg));
        })
        .catch(error => {
          // dispatch(initGamesListFailed(error));
        });
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  };
};

export const handleShowModal = e => {
  return {
    type: actionType.HANDLE_SHOW_MODAL,
    e,
  };
};

export const handleHideModal = (e, referenceToModal) => {
  return {
    type: actionType.HANDLE_HIDE_MODAL,
    e,
    referenceToModal,
  };
};
