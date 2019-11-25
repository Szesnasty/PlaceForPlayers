import * as actionType from 'store/actions/actionType';
import axios from 'axios';

// const URLAPI = process.env.REACT_APP_URL_API;
const URLAPI = `https://api.rawg.io/api/`;

const currentPage = 1;
const pageSize = 20;

export const setGames = listOfGames => {
  return {
    type: actionType.SET_GAMES,
    listOfGames,
    currentPage,
  };
};

export const fetchGamesFailed = error => {
  return {
    type: actionType.FETCH_GAMES_FAILED,
    error,
  };
};

export const initGames = () => {
  return dispatch => {
    const fullURL = `${URLAPI}games?page=${currentPage}&page_size=${pageSize}`;

    axios
      .get(fullURL)
      .then(response => {
        const listOfGames = response.data.results;

        dispatch(setGames(listOfGames));
      })
      .catch(error => {
        dispatch(fetchGamesFailed(error));
        console.lof(error);
      });
  };
};
