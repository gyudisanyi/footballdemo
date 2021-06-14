import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Competitions from './pages/Competitions'
import Matches from './pages/Matches'
import Match from './pages/Match'

const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Competitions />
        </Route>
        <Route exact path="/matches/:matchId">
          <Match />
        </Route>
        <Route path="/:competitionId">
          <Matches />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
