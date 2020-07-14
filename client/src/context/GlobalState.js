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

  // Login
  async function checkLoggedIn() {  
    try {
      
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await axios.post("/users/tokenIsValid", null, {
        headers: { "x-auth-token": token },
      });
      
      if (tokenRes.data) {
        const userRes = await axios.get("/users/", {
          headers: { "x-auth-token": token },
        });
        
        dispatch({
          type: actionTypes.CHECK_LOG,
          payload: userRes.data,
        });
        
      }
      
    } catch (err) {
      dispatch({
        type: actionTypes.CHECK_LOG_ERROR,
        payload: err.response.data.error,
      });
    }
  }

  async function logIn(user, loading) {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      console.log("[GlobalState] User Data >> ", user)
      const res = await axios.post("/users/login", user, config);
      
      localStorage.setItem("auth-token", res.data.token);
      console.log("[GlobalState] result get uses >> ", res.data)
      console.log("[GlobalState] isAuthUser >> ", state.isAuthUser)

      dispatch({
        type: actionTypes.LOGIN,
        payload: res.data,
      });
      
    } catch (err) {
      console.log("[GlobalState] LOGIN ERROR", err.response.data)
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
      console.log("[GlobalState] res.Categorie >> ", res)
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

      console.log("[GlobalState] res >> ", res)

      const result = res.data.data.sort((a, b) => new Date(a.date) - new Date(b.date))

      

      console.log("[GlobalState] res 2 >> ", result)

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
        type: actionTypes.GET_TRANSACTIONS,
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
      console.log("[GlobalState DeleteTransaction] loading", state.loading);
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
      console.log(id);
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
        getTypeCategories,
        addTypeCategory,
        deleteTypeCategories,
        getBudgets,
        addBudget,
        deleteBudgets,
        checkLoggedIn,
        logIn,
        modalTrans,
        loadingFx,
        sidebar
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
