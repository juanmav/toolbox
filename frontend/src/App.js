import React, { Component } from 'react';
import './App.css';
import StockList from './components/Stock/List';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to React - Stock App</h2>
        </div>
        <div className="App-intro">
            <StockList/>
        </div>
      </div>
    );
  }
}

export default App;
