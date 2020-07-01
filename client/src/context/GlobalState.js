import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

// Initial state
const initialState = {
  leftOpen: true,
  categories: [],
  typecategories: [],
  transactions: [],
  error: null,
  loading: true,
  user: undefined,
  isAuthUser: false
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  
  // Actions
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
          type: "CHECK_LOG",
          payload: userRes.data,
        });
        
      }
      
    } catch (err) {
      dispatch({
        type: "CHECK_LOG_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function logIn(user, isAuthUser) {

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
      console.log("[GlobalState] isAuthUser >> ", isAuthUser)

      dispatch({
        type: "LOGIN",
        payload: res.data,
      });
      
    } catch (err) {
      
    }
  }

  async function getCategories() {
    try {
      const res = await axios.get("/categories");

      dispatch({
        type: "GET_CATEGORIES",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "CATEGORY_ERROR",
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
        type: "ADD_CATEGORY",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "CATEGORY_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteCategory(id) {
    try {
      await axios.delete(`/categories/${id}`);

      dispatch({
        type: "DELETE_CATEGORY",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "CATEGORY_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function getTransactions() {
    try {
      const res = await axios.get("/dashboard");

      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
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
        type: "ADD_TRANSACTION",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      console.log(id);
      await axios.delete(`/dashboard/${id}`);

      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TRANSACTIONS_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function getTypeCategories() {
    try {
      const res = await axios.get("/typecategories");

      dispatch({
        type: "GET_TYPECATEGORIES",
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: "TYPECATEGORIES_ERROR",
        payload: err.response.data.error,
      });
    }
  }

  async function deleteTypeCategories(id) {
    try {
      console.log(id);
      await axios.delete(`/typecategories/${id}`);

      dispatch({
        type: "DELETE_TYPECATEGORY",
        payload: id,
      });
    } catch (err) {
      dispatch({
        type: "TYPECATEGORY_ERROR",
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
        error: state.error,
        loading: state.loading,
        user: state.user,
        isAuthUser: state.isAuthUser,
        getCategories,
        addCategory,
        deleteCategory,
        getTransactions,
        addTransactions,
        deleteTransaction,
        getTypeCategories,
        deleteTypeCategories,
        checkLoggedIn,
        logIn
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
