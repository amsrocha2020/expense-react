import * as actionTypes from './actionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.MODAL_TRANSC:
      return {
        ...state,
        modalTransaction: action.payload,
      };
    case actionTypes.LOADING:
        return {
          ...state,
          loading: action.payload,
        };
    case actionTypes.CHECK_LOG:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.LOGIN:
      console.log("[AppReducer] payload", action.payload )
      return {
        ...state,
        loading: false,
        isAuthUser: true,
        user: action.payload.user,
      };
    case actionTypes.LOGIN_ERROR:
        return {
          ...state,
          msgError: action.payload,
        };
    case actionTypes.LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthUser: false,
        user: action.payload.user,
      };
    case actionTypes.GET_CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case actionTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case actionTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        ),
      };
    case actionTypes.CHECK_LOG_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.CATEGORY_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.GET_TYPECATEGORIES:
      return {
        ...state,
        loading: false,
        typecategories: action.payload,
      };
    case actionTypes.DELETE_TYPECATEGORY:
      return {
        ...state,
        typecategories: state.typecategories.filter(
          (typecategory) => typecategory._id !== action.payload
        ),
      };
    case actionTypes.TYPECATEGORIES_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case actionTypes.GET_TRANSACTIONS:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case actionTypes.ADD_TRANSACTION:
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case actionTypes.DELETE_TRANSACTION:
      return {
        ...state,
        loading: false,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case actionTypes.TRANSACTIONS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
