import React from 'react';
import LoginView from './views/login';
import { Toaster, Position, Intent } from "@blueprintjs/core";

export const AppToaster = Toaster.create({
  className: "app-toaster",
  position: Position.BOTTOM_RIGHT
});

class App extends React.Component {
  public constructor(props : any) {
    super(props);
    AppToaster.show({
      icon: "tick",
      intent: Intent.SUCCESS,
      message: "Initialized the application.",
    });
  }

  public render() {
    return (
      <div className="App">
        <LoginView></LoginView>
      </div>
    );
  }
}

export default App;