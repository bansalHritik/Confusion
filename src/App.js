import React, { Component } from "react";
import "./App.css";
import Main from "./components/MainComponent";

import { BrowserRouter } from "react-router-dom"; // used to route
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore"; // importing our configured store

//this will create new store for the app that is defined by us already
const store = ConfigureStore();
/** */
class App extends Component {
  // since we dont want any state of app components so no constructor
  render() {
    return (
      /**
       * The <Provider /> makes the Redux store available to any nested components
       * that have been wrapped in the connect() function.
       */
      <Provider store={store}>
        {/**Alias for Router and parent of all Route components
         * NOTE : It has only one child and it must be parent of all and has only one child*/}
        <BrowserRouter>
          <div className="App">
            {/** When main is called then it'll be connected to the store and all its props are mapped*/}
            <Main />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
