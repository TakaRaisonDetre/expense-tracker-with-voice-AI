import React, {useState, useContext, useEffect} from 'react'
import {TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem, IconButton}
from '@material-ui/core'
import useStyles from './style'
import {v4 as uuidv4} from 'uuid'
import {useSpeechContext} from '@speechly/react-client'


import {ExpenseTrackerContext} from '../../../context/context'
import {incomeCategories, expenseCategories} from '../../../constants/category'
import formatDate from '../../../utils/formatDate'



const initialState ={
    amount: '',
    category:'',
    type: 'Income',
    date: formatDate(new Date()),
}

const Form = () => {
    const classes=useStyles();
    const [ formData, setFormData]  = useState(initialState)
    const {addTransaction} = useContext(ExpenseTrackerContext);
    const {segment } = useSpeechContext();

    console.log(formData)
    
    const createTransaction = ()=>{
    const transaction = {...formData, amount: Number(formData.amount), id: uuidv4()} 
        
    addTransaction(transaction);
    setFormData(initialState)
       }
  

       useEffect(()=>{
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
              setFormData({ ...formData, type: 'Expense' });
            } else if (segment.intent.intent === 'add_income') {
              setFormData({ ...formData, type: 'Income' });
            } else if (segment.isFinal && segment.intent.intent === 'create_transaction') {
              return createTransaction();
            } else if (segment.isFinal && segment.intent.intent === 'cancel_transaction') {
              return setFormData(initialState);
            }

            segment.entities.forEach((e)=>{
                const category =`${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}}`;
               
                switch(e.type){
                   case 'amount':
                       setFormData({...formData, amount:e.value})
                       break;
                   case 'category':
                       if(incomeCategories.map((iC)=>iC.type).includes(category)){
                        setFormData({...formData, type:'Income',  category})  
                       } else if(expenseCategories.map((iC)=>iC.type).includes(category)){
                        setFormData({...formData, type:'Expense',  category})  
                     }
                       break;
                   case 'date':
                        setFormData({...formData, date: e.value})   
                        break;
                   default:
                        break;    
               }
            });

          }
       }, [segment])

  const selectedCategories = formData.type==='Income' ? incomeCategories : expenseCategories;

    return (
       <Grid container spacing={2}>
           <Grid item xs={12}>
               <Typography align="center" variant="subtitle2" gutterButton>
                 {
                     segment && (
                         <>
                         {segment.words.map((w)=>w.value).join(" ")}
                         </>
                     ) 
                 }
               </Typography>
           </Grid>
           <Grid item xs={6}>
               <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select value={formData.type} onChange={(e)=>setFormData({...formData, type: e.target.value})}>
                      <MenuItem value="Income">Income</MenuItem>
                      <MenuItem value="Expense">Expense</MenuItem>
                  </Select>
               </FormControl>
           </Grid>
           <Grid item xs={6}>
               <FormControl fullWidth>
                   <InputLabel> Category </InputLabel>
                   <Select value={formData.category} onChange={(e)=>setFormData({...formData, category: e.target.value})}> 
                   { 
                   selectedCategories.map((c)=>(<MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)) 
                   }
                   </Select>
               </FormControl>
           </Grid>
           <Grid item xs={6}>
             <TextField value={formData.amount} onChange={(e)=>setFormData({...formData, amount : e.target.value})} type="number" label="Amount" fullWidth/>
           </Grid>
           <Grid item xs={6}>
             <TextField value={formData.date} onChange={(e)=> setFormData({...formData, date : formatDate(e.target.value) })} type="date" label="Date" fullWidth/>
           </Grid>
           <Button onClick={createTransaction} className={classes.button} variant="outlined" color="primary" fullWidth>Create</Button>
       </Grid>
    )
}

export default Form 
