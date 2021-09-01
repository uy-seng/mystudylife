import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Guest } from "./pages/Guest";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Guest} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/sign-up" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
