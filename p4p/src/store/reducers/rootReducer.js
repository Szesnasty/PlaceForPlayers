import * as actionTypes from 'store/actions/actionType';

const initialState = {
  listOfGames: [],
  currentPage: null,
  error: null,
  msg: null,
  isModal: false,
  modalContent: null,
};

const initGamesListSuccess = (state, action) => {
  return {
    ...state,
    listOfGames: action.listOfGames,
    currentPage: action.currentPage,
    error: false,
    msg: action.msg,
  };
};

const initGamesListFailed = (state, action) => {
  return {
    ...state,
    error: action.error,
  };
};

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
    default:
      return state;
  }
};

export default rootReducer;
