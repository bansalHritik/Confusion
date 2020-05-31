import React, { Component } from "react";
import Menu from "./MenuComponent";
import DishDetail from "./DishdetailComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import {
  postComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
  fetchleaders,
  postFeedback,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup, CSSTransition } from "react-transition-group";

/**
 * this function is called by connect method with "State" as parameter i.e. state of store
 * since this function return a object , this object is mapped to the calling Component by the store
 * state.<x> means <x> property of store
 */
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

/**
 * ? dispatch means to give commands with some data in it
 * this function is called by connect method with "dispatch" as parameter i.e. dispatch  method of the store
 * it will match the props with the fuction that trigger or dispatch methods to the store
 */
const mapDispatchToProps = (dispatch) => ({
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),

  //part of redux form
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },

  fetchDishes: () => {
    dispatch(fetchDishes());
  },

  fetchComments: () => {
    dispatch(fetchComments());
  },

  fetchPromos: () => {
    dispatch(fetchPromos());
  },

  fetchleaders: () => {
    dispatch(fetchleaders());
  },

  postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ),
});

class Main extends Component {
  //just after rendering empty components i.e. render method
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchleaders();
  }

  // ! NOTE Initailly we render only structure without data only empty HTML tags
  render() {
    const HomePage = () => {
      return (
        // Here this.props.dishes will have 3 properties => isLoading,Dishes Array and error message
        <Home
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMess={this.props.leaders.errMess}
        />
      );
    };
    // since we are interested in only the match part of the passed object
    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          selectedDish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      );
    };
    //A functional component that will render Home page
    return (
      <div>
        {/* This will be rendered without waiting for data because data is static in this component*/}
        <Header />
        {console.log("RENDER")}
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            {/* A <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
            <Switch>
              {/* since calling Home component here directly is too long so we used IFEE
                When rendered fisrt time then  only structre is rendered
              */}
              <Route path="/home" component={HomePage} />
              {/* if something is to be passed with props then this syntex will help */}
              <Route
                exact
                path="/menu"
                component={() => <Menu dishes={this.props.dishes} />}
              />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              {/**
                With react-router-dom, a dynamic portion of the URL to be 
                matched by putting a colon (:) before it.
                The library passes in a prop called match into every route that is rendered. 
                Inside this match object is another object called params. 
                This holds all matching params where the key is the name we specified when creating the route and 
                the value is the actual value in the URL. 
              */}
              <Route path="/menu/:dishId" component={DishWithId} />
              <Route
                exact
                path="/aboutus"
                component={() => (
                  <About
                    leaders={this.props.leaders}
                    postFeedback={this.props.postFeedback}
                    leadersLoading={this.props.leaders.isLoading}
                    leadersErrMess={this.props.leaders.errMess}
                  />
                )}
              />
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
 * ? Whenever Main component is called then first it will be connected to the store
 * ? then state and Dispatches are mapped
 * As the first argument passed in to connect, mapStateToProps is used for selecting the part of the data from the store
 * that the connected component needs.
 * It’s frequently referred to as just mapState for short.
 * It is called every time the store state changes.
 * It receives the entire store state, and should return an object of data this component needs.
 */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
// note connect will return an function then Main will be passed as parameter to that function
