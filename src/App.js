import React from 'react'
import Main from './components/Main/Main'
import Detail from './components/Detail/Detail'
import {Grid} from '@material-ui/core'
import useStyles from './style'
import {PushToTalkButton, PushToTalkButtonContainer, ErrorPanel} from '@speechly/react-ui'

const App =()=>{

    const classes = useStyles();

   return (
       <div>
           <Grid className={classes.grid} container spacing={0} alignItems="center" justify="center" style={{height:'100vh'}}>
               <Grid item xs={12} sm={4}>
                   <Detail title="Income"/>
               </Grid>
               <Grid item xs={12} sm={3}>
                  <Main/>
               </Grid>
               <Grid item xs={12} sm={4}>
                   <Detail title="Expense"/>
               </Grid>
           </Grid>

           <PushToTalkButtonContainer>
             <PushToTalkButton/>
             <ErrorPanel/>
           </PushToTalkButtonContainer>
           
           </div>
   )
}

export default App