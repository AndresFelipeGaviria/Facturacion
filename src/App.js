import React from 'react';
import './App.css';
import Login from './pages/login';
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import DashboardApp from './pages/dashboard';


function App() {
  return (
    <React.Fragment>
       <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={Login}
            />
            {/* <Route
              
              path="/dashboard"
              component={DashboardApp}
            /> */}
           
          </Switch>
      </BrowserRouter>
    </React.Fragment>
     
  );
}

export default App;
