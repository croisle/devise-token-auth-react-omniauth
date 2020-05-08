import React, { Suspense, lazy } from "react";

import "bootstrap";
import "./packs/stylesheets/application.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Interceptors from "./packs/src/dataflow/context/Interceptors";
import LoginContextProvider from "./packs/src/dataflow/context/LoginContext";

import Navbar from "./packs/src/Navbar";
import Login from "./packs/src/Login";
import Dashboard from "./packs/src/Dashboard";

const App = () => {
  return (
    <div>
      <LoginContextProvider>
        <Interceptors />
        <Router>
          <div className="App-header">
            <Navbar />
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Login} />

              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Suspense>
        </Router>
      </LoginContextProvider>
    </div>
  );
};

export default App;
