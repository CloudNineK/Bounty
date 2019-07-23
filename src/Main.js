import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch} from "react-router-dom"

// Components
import Bar from './Components/Bar.js'
import Landing from './Components/Routes/Landing'
import CardDisplay from './Components/Bounty/CardDisplay'
import Home from './Components/Routes/Home.js'
import BountyPage from './Components/Bounty/BountyPage'


function Main (props) {
  return (
    <>
      <CssBaseline />

      <BrowserRouter>
        <Bar/>
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/Bounties" component={CardDisplay}/>
          <Route path="/Home" component={Home}/>
          <Route path="/Bounty:ID" component={BountyPage}/>
          {/* TODO: Error: Invalid Path component*/}
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Main;
