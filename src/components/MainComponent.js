import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import { DISHES } from "../shared/dishes";
import DishDetail from './DishdetailComponent';

class Main extends Component {

    /**
     * this consttuctor will set state of the current instant
     * 
     * Initailly State of Dishes is set to be total dishes we have 
     *  and selected dish is null 
     */
    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null
        };
    }

    /**
     * 
     * @param {} dishID 
     * this will set the state of selected dish to the dishID 
     */
    onDishSelect(dishID) {
        this.setState({ selectedDish: dishID });
    }


    render() {
        return (
            <div>
                <Navbar dark color="primary">
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Menu dishes={this.state.dishes} onClick= {(dishID) => this.onDishSelect(dishID)} />
                <DishDetail selectedDish={this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0]} />
            </div>
        );
    }
}

export default Main;
