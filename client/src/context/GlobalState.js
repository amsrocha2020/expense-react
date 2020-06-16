import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
    leftOpen: true,
    categories: [],
    typecategories: [],
    transactions: [],
    error: null,
    loading: true
}

// Create context 
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
    const [state,dispatch] = useReducer(AppReducer, initialState);
    
    // Actions

    async function getCategories() {
        try {
            const res = await axios.get('/categories');
            
            dispatch({
                type: 'GET_CATEGORIES',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'CATEGORY_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function addCategory(categories) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/categories', categories, config);

            dispatch({
                type: 'ADD_CATEGORY',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'CATEGORY_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function deleteCategory(id) {
        try {
            await axios.delete(`/categories/${id}`)

            dispatch({
                type: 'DELETE_CATEGORY',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'CATEGORY_ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function getTransactions() {
        
        try {
            const res = await axios.get('/dashboard');
            
            dispatch({
                type: 'GET_TRANSACTIONS',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function addTransactions(transactions) {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/dashboard', transactions, config);

            dispatch({
                type: 'ADD_TRANSACTION',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTION_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function deleteTransaction(id) {
        try {
            console.log(id);
            await axios.delete(`/dashboard/${id}`)

            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TRANSACTIONS_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function getTypeCategories() {
        
        try {
            const res = await axios.get('/typecategories');
            
            dispatch({
                type: 'GET_TYPECATEGORIES',
                payload: res.data.data
            });
        } catch (err) {
            dispatch({
                type: 'TYPECATEGORIES_ERROR',
                payload: err.response.data.error
            });
        }
    }

    async function deleteTypeCategories(id) {
        try {
            console.log(id);
            await axios.delete(`/typecategories/${id}`)

            dispatch({
                type: 'DELETE_TYPECATEGORY',
                payload: id
            });
        } catch (err) {
            dispatch({
                type: 'TYPECATEGORY_ERROR',
                payload: err.response.data.error
            })
        }
    }

    return (<GlobalContext.Provider value={{
        leftOpen: state.leftOpen,
        categories: state.categories,
        typecategories: state.typecategories,
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getCategories,
        addCategory,
        deleteCategory,
        getTransactions,
        addTransactions,
        deleteTransaction,
        getTypeCategories,
        deleteTypeCategories
    }}>
        {children}
    </GlobalContext.Provider>)
}
