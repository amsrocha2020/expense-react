export default (state = [], action) => {
  switch (action.type) {
    case "CHECK_LOG":
      return {
        ...state,
        userData: action.payload,
      };
    case "GET_CATEGORIES":
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };
    case "ADD_CATEGORY":
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        ),
      };
    case "CHECK_LOG_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "CATEGORY_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "GET_TYPECATEGORIES":
      return {
        ...state,
        loading: false,
        typecategories: action.payload,
      };
    case "DELETE_TYPECATEGORY":
      return {
        ...state,
        typecategories: state.typecategories.filter(
          (typecategory) => typecategory._id !== action.payload
        ),
      };
    case "TYPECATEGORIES_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "GET_TRANSACTIONS":
      // console("Action ->", action.type);
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case "DELETE_TRANSACTIONS":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case "TRANSACTIONS_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
