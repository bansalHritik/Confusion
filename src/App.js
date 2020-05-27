import React, { Component } from "react";
import "./App.css";
import Main from "./components/MainComponent";
//used to route
import { BrowserRouter } from "react-router-dom";
// The <Provider /> makes the Redux store available to any nested components 
// that have been wrapped in the connect() function.
import { Provider } from "react-redux";
// A friendly abstraction over the standard Redux createStore function that adds
// good defaults to the store setup for a better development experience.
import { ConfigureStore } from "./redux/configureStore";

const store = ConfigureStore();
class App extends Component {
  // since we dont want any state of app components so no constructor

  render() {
    return (
      <Provider store={store}> 
        {/**Alias for Router and parent of all Route components
         * NOTE : It has only one child and it must be parent of all and has only one child*/}
        <BrowserRouter>
          <div className="App">
            {/**  */}
            <Main />
            {/* We will call the main component just like main method */}
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
