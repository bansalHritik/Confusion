import React, { Component } from 'react';
import './App.css';
import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom'
class App extends Component {

 // since we dont want any state of app components so no constructor
 
  render() {
    return (
      /**Alias for Router and parent of all Route components 
       * NOTE : It has only one child
       */
      <BrowserRouter>
        <div className="App">        
          <Main /> {/* We will call the main component just like main method */}
        </div>
      </BrowserRouter>
    );
  }

}

export default App;
