import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Competitions from './pages/Competitions'

const App = () => {


  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Competitions />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
