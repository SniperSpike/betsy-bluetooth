import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Join from "./pages/Join";
import Search from "./pages/Search";
import Home from "./pages/Home";
import Add from "./pages/Add";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/add" component={Add}></Route>
          <Route path="/join" exact component={Join}></Route>
          <Route path="/:token" component={Search}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
