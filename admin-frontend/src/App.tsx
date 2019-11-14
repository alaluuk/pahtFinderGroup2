import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { refreshBearer } from "./providers/auth";
import LoginView from "./views/login";
import DashboardView from "./views/dashboard";
import UsersView from "./views/users";
import SettingsView from "./views/settings";
import ProtectedRoute from './components/protected-route';
import { Toaster, Position } from "@blueprintjs/core";

export const AppToaster = Toaster.create({
  className: "app-toaster",
  position: Position.BOTTOM_RIGHT
});

type AppProps = {};
type AppState = { nightmode: boolean };
class App extends React.Component<AppProps, AppState> {
  public constructor(props : any) {
    super(props);

    this.state = {
      nightmode: false
    };

    refreshBearer();
  }

  public render() {
    return (
      <div className={"App " + (this.state.nightmode ? "bp3-dark":"")}>
        <Router>
          <Switch>
            <Route path="/login" component={LoginView}></Route>
            <ProtectedRoute exact path="/" component={DashboardView}></ProtectedRoute>
            <ProtectedRoute exact path="/users" component={UsersView}></ProtectedRoute>
            <ProtectedRoute exact path="/settings" component={SettingsView}></ProtectedRoute>
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;