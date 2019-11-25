import * as actionTypes from 'store/actions/actionType';

const initialState = {
  listOfGames: [],
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GAMES:
      return {
        ...state,
        listOfGames: action.listOfGames,
        error: false,
        currentPage: action.currentPage + 1,
      };

    default:
      return state;
  }
};

export default rootReducer;
