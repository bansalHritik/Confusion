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
import { postComment,fetchDishes, fetchComments, fetchPromos, fetchleaders,postFeedback } from '../redux/ActionCreators';
import {actions} from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// ? this will return a object with the corresponding 
// maybe the state refereing to the state of store
const mapStateToProps = state => {
    return {
        dishes : state.dishes,
        comments : state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }    
}

// ?  dispatch means to give commands with some data in it
const mapDispatchToProps = dispatch => ({
    // dispatching what need to be done here posting Commentss
    //? Whenever we need to post comment then it will need these 4 parameters
    // ! here we are passing postComment as a function and are not passing type of action 
     
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  resetFeedbackForm:() => { dispatch(actions.reset('feedback'))},
  fetchDishes: ()=> {dispatch(fetchDishes())},
  fetchComments: ()=> {dispatch(fetchComments())},
  fetchPromos: ()=> {dispatch(fetchPromos())},
  fetchleaders: ()=> {dispatch(fetchleaders())},
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchleaders();
    }

    /**
     * this will render a header footer and a component on the basis of the url 
     */
    render() {
        /**
         * this will render Home component
         */
        const HomePage = () => {
            return(
                <Home 
                    dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading= {this.props.dishes.isLoading}
                    dishesErrMess = {this.props.dishes.errMess}
                    promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                    promosLoading= {this.props.promotions.isLoading}
                    promosErrMess = {this.props.promotions.errMess}
                    leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                    leadersLoading= {this.props.leaders.isLoading}
                    leadersErrMess = {this.props.leaders.errMess}
                    />
            );
        }
        //just to make code more readable
        const DishWithId = ({match}) => {
            return(
                <DishDetail 
                selectedDish = {this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
                isLoading= {this.props.dishes.isLoading}
                errMess = {this.props.dishes.errMess}
                comments = {this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                commentsErrMess = {this.props.comments.errMess}
                postComment = {this.props.postComment}
                />
            );
        }
         //A functional component that will render Home page 
        return (
            <div>
                <Header />
                <TransitionGroup>
                <CSSTransition key = {this.props.location.key} classNames = "page" timeout = {300} >
                {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
                <Switch>
                    {/* since calling Home component here directly is too long so we used IFEE*/}
                    <Route path="/home" component={HomePage} />
                    {/* if something is to be passed with props then this syntex will help */}
                    <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes} />} />
                    
                    <Route exact path = "/contactus" component = {() => <Contact resetFeedbackForm ={this.props.resetFeedbackForm}  postFeedback={this.props.postFeedback}/>} /> 
                    
                    <Route path = "/menu/:dishId" component = {DishWithId} />

                    <Route exact path ="/aboutus" component = { () => <About leaders = {this.props.leaders} 
                    postFeedback={this.props.postFeedback}
                    leadersLoading= {this.props.leaders.isLoading}
                    leadersErrMess = {this.props.leaders.errMess}/> } />
                    {/* Otherwise will redirect to home Componet or will redirect to /home */}
                    <Redirect to="/home" />
                </Switch>
                </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

/**
 * As the first argument passed in to connect, mapStateToProps is used for selecting the part of the data from the store 
 * that the connected component needs. 
 * It’s frequently referred to as just mapState for short.
 * It is called every time the store state changes.
 * It receives the entire store state, and should return an object of data this component needs.
 
 * ? mapDispatchToProps is used for dispatching actions to the store.
 */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));