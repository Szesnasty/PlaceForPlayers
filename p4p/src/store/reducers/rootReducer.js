import * as actionTypes from 'store/actions/actionType';

const initialState = {
  listOfGames: [],
  searchValue: '',

  currentPage: null,
  hasMoreDataToInfinityScroll: true,
  error: null,
  msg: null,
  isModal: false,
  modalContent: null,
  listOfyourFavGames: [],
};

const initGamesListSuccess = (state, action) => {
  return {
    ...state,
    listOfGames: action.listOfGames,
    currentPage: action.currentPage,
    hasMoreDataToInfinityScroll: true,
    error: false,
    msg: action.msg,
  };
};

// const initGamesListFailed = (state, action) => {
//   return {
//     ...state,
//     error: action.error,
//   };
// };

const fetchMoreGamesSuccess = (state, action) => {
  return {
    ...state,
    listOfGames: [...state.listOfGames].concat(action.listOfGames),
    currentPage: action.currentPage,
  };
};

const handleShowModal = (state, action) => {
  return {
    ...state,
    modalContent: state.listOfGames.filter(singleGameDetails => singleGameDetails.id === action.e),
    isModal: true,
  };
};

const handleHideModal = (state, action) => {
  let isModal = true;
  if (action.e.target === action.referenceToModal.current) {
    isModal = false;
  }
  return {
    ...state,
    isModal,
  };
};

const setSearchValueToState = (state, action) => {
  return {
    ...state,
    searchValue: action.referenceToSearchInput,
  };
};

const getDataAfterSearching = (state, action) => {
  return {
    ...state,
    listOfGames: action.dataAfterSearching,
    hasMoreDataToInfinityScroll: false,
  };
};

const getDataFromLocalStorage = state => {
  let listOfyourFavGames = localStorage.getItem('favGames');

  if (listOfyourFavGames === [] || listOfyourFavGames === null) {
    listOfyourFavGames = localStorage.setItem('favGames', JSON.stringify([]));
  } else {
    listOfyourFavGames = JSON.parse(listOfyourFavGames);
  }

  return {
    ...state,
    listOfyourFavGames,
  };
};

const hanldeAddGameToFavList = (state, action) => {
  action.e.persist();
  const { selectedGame } = action;
  const { id } = selectedGame;
  const { listOfyourFavGames } = state;
  let listOfyourFavGamesFromState = listOfyourFavGames;

  const isAleradyExist = listOfyourFavGamesFromState.filter(item => item.id === id);

  if (isAleradyExist.length === 0) {
    listOfyourFavGamesFromState = listOfyourFavGamesFromState.concat(selectedGame);
    return {
      ...state,
      listOfyourFavGames: listOfyourFavGamesFromState,
    };
  }

  return {
    ...state,
  };
};

const handleDeleteGameFromFavList = (state, action) => {
  const { id } = action;

  const { listOfyourFavGames } = state;
  const listOfyourFavGamesFromState = listOfyourFavGames;

  const afterDeleteItemFromFavGame = listOfyourFavGamesFromState.filter(item => item.id !== id);

  return {
    ...state,
    listOfyourFavGames: afterDeleteItemFromFavGame,
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_GAMES_LIST_SUCCESS:
      return initGamesListSuccess(state, action);
    case actionTypes.FETCH_MORE_GAMES_SUCCESS:
      return fetchMoreGamesSuccess(state, action);
    case actionTypes.HANDLE_SHOW_MODAL:
      return handleShowModal(state, action);
    case actionTypes.HANDLE_HIDE_MODAL:
      return handleHideModal(state, action);
    case actionTypes.GET_DATA_FROM_LOCAL_STORAGE:
      return getDataFromLocalStorage(state, action);
    case actionTypes.SET_SEARCH_VALUE_TO_STATE:
      return setSearchValueToState(state, action);
    case actionTypes.GET_DATA_AFTER_SEARCHING:
      return getDataAfterSearching(state, action);
    case actionTypes.HANDLE_ADD_GAME_TO_FAV_LIST:
      return hanldeAddGameToFavList(state, action);
    case actionTypes.HANDLE_DELETE_GAME_FROM_FAV_LIST:
      return handleDeleteGameFromFavList(state, action);
    default:
      return state;
  }
};

export default rootReducer;
