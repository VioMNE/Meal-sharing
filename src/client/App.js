import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MealProvider } from "./components/MealContext";
import MealList from "./components/Meals/MealList";
import TestComponent from "./components/TestComponent/TestComponent";
import { MealContext } from "./components/MealContext";
import Home from "./components/Home/Home";
import Review from "./components/Reviews/Review";
import MealDetails from "./components/Reservations/MealDetails"
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";

function App() {
  console.log("randering app");
  return (
    <Router>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Navbar/>
      <MealProvider>
        <Route exact path="/" component={Home}/>
        <Route exact path="/meals" component={MealList}/>
        <Route path="/meals/:id" component={MealDetails} />
      </MealProvider>
      <Route exact path="/reviews" component={Review} />
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
      <Footer/>
    </Router>
  );
}

export default App;
