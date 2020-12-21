import React, {useReducer, createContext} from 'react'
import contextReducer from './contextReducer.js'


const initialState= []

export const ExpenseTrackerContext = createContext(initialState)

export const Provider = ({children}) => {

    const [transactions, dispatch]= useReducer(contextReducer, initialState)
 

    // action creators
    const deleteTransaction = (id)=>{dispatch({type: 'DELETE_TRANSACTION', payload: id})} 
    const addTransaction = (transactions) => {dispatch({type: 'ADD_TRANSACTION', payload: transactions}) }

     console.log(transactions)
     console.log('read')

    return (
        <ExpenseTrackerContext.Provider value={{
           deleteTransaction,
           addTransaction,
           transactions
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}