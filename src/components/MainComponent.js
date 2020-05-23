import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

// TODO :
const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        comments : state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }    
}
class Main extends Component {

    constructor(props) {  
        super(props);
    }

    /**
     * this will render a header footer and a component on the basis of the url 
     */

    render() {
        //just to make code more readable
        const HomePage = () => {
            return(
                <Home 
                    dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                    promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                    leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
        //just to make code more readable
        const DishWithId = ({match}) => {
            return(
                <DishDetail selectedDish = {this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                comments = {this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                />
            );
        }
         //A functional component that will render Home page 
        //nClick={(dishId) => this.onDishSelect(dishId)}
        return (
            <div>
                <Header />
                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <Switch>
                    {/* since calling Home component here directly is too long so we used sfunctions*/}
                    <Route path="/home" component={HomePage} />
                    {/* if something is to be passed with props then this syntex will help */}
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    
                    <Route exact path = "/contactus" component = {Contact} /> 
                    
                    <Route path = "/menu/:dishId" component = {DishWithId} />

                    <Route exact path ="/aboutus" component = { () => <About leaders = {this.props.leaders}/> } />
                    {/* Otherwise will redirect to home Componet or will redirect to /home */}
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}
// TODO
export default withRouter(connect(mapStateToProps)(Main));