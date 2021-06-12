import React, {useState, useEffect} from 'react';
import {Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom';
import { Doc, fetchData} from './API';
import Docs from './components/Docs/Docs';
import Initial from './components/Initial/Initial';

function App() {


  return (

    <Router>
      <Switch>
        <Route exact path="/" component={Initial} />
        <Route exact path="/Docs" component={Docs} />
        <Redirect exact to="/intro" />
      </Switch>
    </Router>
  );
}

export default App;