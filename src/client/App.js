import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MealList from "./components/components/MealList";
import TestComponent from "./components/TestComponent/TestComponent";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <p>test</p>
      </Route>
      <Route exact path="/lol">
        <p>lol</p>
      </Route>
      <Route exact path="/meals">
        <p>Meal List</p>
        <MealList/>
      </Route>
      <Route exact path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}

export default App;
