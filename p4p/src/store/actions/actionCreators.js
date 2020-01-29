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
        const listOfGames = response.data.results;
        const msg = response.status;
        console.log(listOfGames);
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

    const pageSize = 15;
    const fullURL = `${URLAPI}games?page=${nextPage}&page_size=${pageSize}`;
    console.log(fullURL);
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

const setSearchValueToState = referenceToSearchInput => {
  return {
    type: actionType.SET_SEARCH_VALUE_TO_STATE,
    referenceToSearchInput: referenceToSearchInput.current.value,
  };
};

const getDataAfterSearching = dataAfterSearching => {
  return {
    type: actionType.GET_DATA_AFTER_SEARCHING,
    dataAfterSearching,
  };
};

export const handleSearch = (e, referenceToSearchInput) => {
  window.scrollTo(0, 0);
  return (dispatch, getState) => {
    dispatch(setSearchValueToState(referenceToSearchInput));

    const searchInputFromRef = referenceToSearchInput.current.value;

    const timerForSearch = setTimeout(() => {
      if (searchInputFromRef !== '') {
        const { searchValue } = getState();

        if (searchValue === searchInputFromRef) {
          const query = `https://api.rawg.io/api/games?search=${searchValue}&page_size=20&ordering=-rating`;
          axios.get(query).then(response => {
            const dataAfterSearching = response.data.results;
            dispatch(getDataAfterSearching(dataAfterSearching));
          });
        }
      } else {
        const urlEndpoint = `${URLAPI}games`;
        dispatch(initGamesList(1, 15, urlEndpoint));
      }
    }, 500);
    return () => {
      clearTimeout(timerForSearch);
    };
  };
};

export const getDataFromLocalStorage = () => {
  return {
    type: actionType.GET_DATA_FROM_LOCAL_STORAGE,
  };
};

export const hanldeAddGameToFavList = (e, selectedGame) => {
  return {
    type: actionType.HANDLE_ADD_GAME_TO_FAV_LIST,
    selectedGame,
    e,
  };
};

export const handleDeleteGameFromFavList = id => {
  return {
    type: actionType.HANDLE_DELETE_GAME_FROM_FAV_LIST,
    id,
  };
};
