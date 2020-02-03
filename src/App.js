import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'


import './App.css';

function App () {
  return (
    <Switch>
      <div>
        <Route exact path='/' component={Home} />   
        <Route path='/card' component={Home} />   
        
      
      </div>
    </Switch>
  )
}

export default App;
