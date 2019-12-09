import React from "react";
import { Menu, Classes } from "@blueprintjs/core";
import HeaderComponent from "../../components/header";
import HousesMapComponent from "../../components/houses-map";
import "./styles.scss";

class DashboardView extends React.Component {
  render() {
    return (
      <div className="DashboardView">
        <HeaderComponent user={this.props.user} />
        <div className="content-wrapper with-sidebar">
          <main>
            <HousesMapComponent />
            <pre className="bp3-code-block"><code>{JSON.stringify(this.props.user, null, 2)}</code></pre>
          </main>
          <aside>
            <Menu className={Classes.ELEVATION_1}>
              <Menu.Item
                icon="new-person"
                text="New User"
                onClick={() => { this.props.history.push('/users/create') }}
              />
              <Menu.Item
                icon="new-layer"
                text="New Structure Type"
                onClick={() => { this.props.history.push('/structures/create-type') }}
              />
              <Menu.Item
                icon="new-layers"
                text="New Structure Template"
                onClick={() => { this.props.history.push('/structures/create-template') }}
              />
              <Menu.Divider />
              <Menu.Item
                icon="document-open"
                text="Open User Frontend"
              />
            </Menu>
          </aside>
        </div>
      </div>
    );
  }
}

export default DashboardView;