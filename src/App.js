import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';

class App extends Component {

  //Note that we have changed/inserted the list of dishes in parent component 
  //This will create a empty navigation bar at the top
  //This will create a bootStrap container with some predefined CSS
  //Inside this container there is a navigation brand component 
  
  
  render() {
    return (
      <div className="App">
        <Main />
      </div>
    );
  }

}

export default App;
