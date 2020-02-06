import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Main from "./pages/Main/index";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route component={Main} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;