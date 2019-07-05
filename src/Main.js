import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Route, Switch} from "react-router-dom"
import Bar from './Components/Bar.js'
import Landing from './Components/Routes/Landing'
import CardDisplay from './Components/Bounty/CardDisplay'
import Home from './Components/Routes/Home.js'

function Main (props) {
  return (
    <>
      <CssBaseline />

      <BrowserRouter>
        <div>
        <Bar/>
        <Switch>
          <Route path="/" exact component={Landing}/>
          <Route path="/Bounties" component={CardDisplay}/>
          <Route path="/Home" component={Home}/>
          {/* TODO: Error: Invalid Path component*/}
        </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default Main;
