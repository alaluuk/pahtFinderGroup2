import React from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { refreshBearer } from "./providers/auth";
import LoginView from "./views/login";
import DashboardView from "./views/dashboard";
import UsersView from "./views/users";
import StructuresView from "./views/structures";
import SettingsView from "./views/settings";
import PublicRoute from './components/public-route';
import ProtectedRoute from './components/protected-route';
import { Toaster, Position } from "@blueprintjs/core";

const packageConfig = require('../package.json');
export const AppName = "Pathfinder Admin";
export const AppVersion = packageConfig.version;

export const AppToaster = Toaster.create({
  className: "app-toaster",
  position: Position.BOTTOM_RIGHT
});

export const setAppNightmode = function(enable : Number) {
  if(enable === 1) {
    document.body.classList.add("bp3-dark");
  } else if(enable === 0) {
    document.body.classList.remove("bp3-dark");
  } else {
    document.body.classList.toggle("bp3-dark");
  }
}

type AppProps = {};
type AppState = { nightmode: boolean };
class App extends React.Component<AppProps, AppState> {
  public constructor(props : any) {
    super(props);

    refreshBearer();
  }

  public render() {
    return (
      <div className="App">
        <Router basename={'/admin'}>
          <Switch>
            <PublicRoute path="/login" component={LoginView} title="Login"></PublicRoute>
            <ProtectedRoute exact path="/" component={DashboardView} title="Dashboard"></ProtectedRoute>
            <ProtectedRoute path="/users" component={UsersView} title="Users"></ProtectedRoute>
            <ProtectedRoute path="/structures" component={StructuresView} title="Structures"></ProtectedRoute>
            <ProtectedRoute path="/settings" component={SettingsView} title="Settings"></ProtectedRoute>
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;