import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './styles/style.css';

import View from './components/viewPage';
import Submit from './components/submitPage';


class App extends Component {
   render() {
      return (
         <div className="App">
            <BrowserRouter>
            <Route component= { Submit } exact path='/' />
            <Route component= { View } exact path='/view' />
            </BrowserRouter>
         </div>
      );
   }
}

export default App;
