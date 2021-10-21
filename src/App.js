import React from "react";

import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Login from "./pages/Login";
import Join from "./pages/Join";
import Search from "./pages/Search";
import { setUser } from "./actions";
import Home from "./pages/Home";
import Add from "./pages/Add";

function App(params) {
  const dispatch = useDispatch();
  const getUser = useSelector((state) => state.user);
  const [user] = useAuthState(auth);
  if (getUser !== user) {
    if (user !== null) {
      dispatch(setUser(user));
      console.log(user);
    }
  }

  return (
    <Router>
      <div className="App">
        <Switch>
          {!user ? (
            <Route exact path="/">
              <Login />
            </Route>
          ) : (
            <Route exact path="/">
              <Join />
            </Route>
          )}
          {!user ? (
            <Route exact path="/login">
              <Login />
            </Route>
          ) : (
            <Route exact path="/">
              <Join />
            </Route>
          )}
          <Route exact path="/home" component={Home}></Route>
          <Route exact path="/home/add" component={Add}></Route>
          <Route path="/join" exact component={Join}></Route>
          <Route path="/:token" component={Search}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
