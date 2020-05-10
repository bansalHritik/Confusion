import React, {Component} from 'react';
import {Navbar,NavbarBrand} from 'reactstrap'
import './App.css';
import Menu from './components/MenuComponent';
import { DISHES } from "./shared/dishes";

class App extends Component {

  constructor(props) {
    super(props);
  this.state = {
    dishes : DISHES
  };
}


  //This will create a empty navigation bar at the top
  //This will create a bootStrap container with some predefined CSS
  //Inside this container there is a navigation brand component 
  render() {
    return (
      <div className="App">
        <Navbar dark color = "primary"> 
          <div className = "container">
            <NavbarBrand href = "/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes  = {this.state.dishes}/>
      </div>
    );
  }
  
}

export default App;
