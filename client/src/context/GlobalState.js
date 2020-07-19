import React, { createContext, useReducer } from "react";
import * as actionTypes from './actionTypes';
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  leftOpen: true,
  categories: [],
  typecategories: [],
  transactions: [],
  transactionUpdate: [],
  budgets: [],
  error: null,
  loading: false,
  user: undefined,
  isAuthUser: false,
  msgError: '',
  modalTransaction: false
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  
  // Loading
  function loadingFx(loading) {
    
    dispatch({
      type: actionTypes.LOADING,
      payload: true,
    });
  }

  // SideBar
  function sidebar(leftOpen){
    dispatch({
      type: actionTypes.SIDEBAR,
      payload: leftOpen,
    });
  }

  // Modal Transactions
  function modalTrans(modalTransaction) {
    dispatch({
      type: actionTypes.MODAL_TRANSC,
      payload: modalTransaction,
    });
  }

  async function logIn(user) {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/users/login", user, config);
      localStorage.setItem("auth-token", res.data.token);

      dispatch({
        type: actionTypes.LOGIN,
        payload: res.data,
      });
      
    } catch (err) {
      dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: err.response.data,
      });
    }
  }

  async function logOut(user) {
    try {
      localStorage.clear();

      dispatch({
        type: actionTypes.LOGOUT,
        payload: user,
      });
      
    } catch (err) {
      dispatch({
        type: actionTypes.LOGIN_ERROR,
        payload: err.response.data,
      });
    }
  }

  // Categories
  async function getCategories() {
    try {
      const res = await axios.get("/categories");

      dispatch({
        type: actionTypes.GET_CATEGORIES,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.CATEGORY_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function getCategoriesById(id) {
    try {
      state.loading = true
      const res = await axios.get(`/categories/${id}`)
      dispatch({
        type: actionTypes.GET_CATEGORIES,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.CATEGORY_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function addCategory(categories) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/categories", categories, config);

      dispatch({
        type: actionTypes.ADD_CATEGORY,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.CATEGORY_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function deleteCategory(id) {
    try {
      await axios.delete(`/categories/${id}`);

      dispatch({
        type: actionTypes.DELETE_CATEGORY,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.CATEGORY_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  // Transaction
  async function getTransactions() {
    try {
      state.loading = true;
      const res = await axios.get("/dashboard");

      const result = res.data.data.sort((a, b) => new Date(a.date) - new Date(b.date))

      dispatch({
        type: actionTypes.GET_TRANSACTIONS,
        payload: result,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.TRANSACTIONS_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function getTransactionsById(id) {
    try {
      const res = await axios.get(`/dashboard/${id}`);
      dispatch({
        type: actionTypes.GET_TRANSACTIONSID,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.TRANSACTIONS_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function updateTransaction(id,transactions) {
    try {
      const res = await axios.put(`/dashboard/${id}`, transactions);
      
      dispatch({
        type: actionTypes.UPDATE_TRANSACTION,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.TRANSACTIONS_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function addTransactions(transactions) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/dashboard", transactions, config);

      dispatch({
        type: actionTypes.ADD_TRANSACTION,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.TRANSACTIONS_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/dashboard/${id}`);

      dispatch({
        type: actionTypes.DELETE_TRANSACTION,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.TRANSACTIONS_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  // Type Categories
  async function getTypeCategories() {
    try {
      const res = await axios.get("/typecategories");

      dispatch({
        type: actionTypes.GET_TYPECATEGORIES,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.TYPECATEGORIES_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function addTypeCategory(typecategories) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/typecategories", typecategories, config);

      dispatch({
        type: actionTypes.ADD_TYPECATEGORY,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.TYPECATEGORIES_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTypeCategories(id) {
    try {
      await axios.delete(`/typecategories/${id}`);

      dispatch({
        type: actionTypes.DELETE_TYPECATEGORY,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.TYPECATEGORIES_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  // Budgets
  async function getBudgets() {
    try {
      const res = await axios.get("/budgets");

      dispatch({
        type: actionTypes.GET_BUDGETS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.BUDGET_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function addBudget(budgets) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/budgets", budgets, config);

      dispatch({
        type: actionTypes.ADD_BUDGET,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.BUDGET_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function deleteBudgets(id) {
    try {
      await axios.delete(`/budgets/${id}`);

      dispatch({
        type: actionTypes.DELETE_BUDGET,
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.BUDGET_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        leftOpen: state.leftOpen,
        categories: state.categories,
        typecategories: state.typecategories,
        transactions: state.transactions,
        transactionUpdate: state.transactionUpdate,
        budgets: state.budgets,
        error: state.error,
        loading: state.loading,
        user: state.user,
        isAuthUser: state.isAuthUser,
        msgError: state.msgError,
        modalTransaction: state.modalTransaction,
        getCategories,
        getCategoriesById,
        addCategory,
        deleteCategory,
        getTransactions,
        getTransactionsById,
        addTransactions,
        deleteTransaction,
        updateTransaction,
        getTypeCategories,
        addTypeCategory,
        deleteTypeCategories,
        getBudgets,
        addBudget,
        deleteBudgets,
        logIn,
        logOut,
        modalTrans,
        loadingFx,
        sidebar
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
