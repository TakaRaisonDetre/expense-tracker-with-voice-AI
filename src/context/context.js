import React, {useReducer, createContext} from 'react'
import contextReducer from './contextReducer.js'


const initialState=JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpenseTrackerContext = createContext(initialState)

export const Provider = ({children}) => {

    const [transactions, dispatch]= useReducer(contextReducer, initialState)
 

    // action creators
    const deleteTransaction = (id)=>{dispatch({type: 'DELETE_TRANSACTION', payload: id})} 
    const addTransaction = (transactions) => {dispatch({type: 'ADD_TRANSACTION', payload: transactions}) }


    const balance = transactions.reduce((acc, currentVal)=>{
        return (currentVal.type ==='Expense'? acc - currentVal.amount: acc + currentVal.amount)
    },0)

     console.log(transactions)
     console.log('read')

    return (
        <ExpenseTrackerContext.Provider value={{
           deleteTransaction,
           addTransaction,
           transactions,
           balance
        }}>
            {children}
        </ExpenseTrackerContext.Provider>
    )
}