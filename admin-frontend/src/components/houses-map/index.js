import React from "react";
import ReactMapGL, { NavigationControl, Marker } from 'react-map-gl';
import { Card, Elevation, Button, Popover, Menu, Position, H5, Text } from "@blueprintjs/core";
import "mapbox-gl/dist/mapbox-gl.css";
import "./styles.scss";

class HousesMapComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mapLoading: true,
      mapViewport: {
        width: "100%",
        height: 400,
        latitude: 65.01324519150508,
        longitude: 25.468373154034897,
        zoom: 11.5
      },
      markers: [
        { lat: 65.009621, lng: 25.503339 },
        { lat: 65.006989, lng: 25.448223 },
        { lat: 65.033234, lng: 25.480511 }
      ]
    };

    this.mapElem = React.createRef();

    this.mapboxToken = "pk.eyJ1IjoidHBhY2htYW5uIiwiYSI6ImNrMzMzem8wcjBtaXgzYnA5dTlnZGVzcjYifQ.iB3i_GluDmXDsgbeYaCIGw";
  }

  render() {
    return (
      <Card className="HousesMapCard" elevation={Elevation.ONE}>
        <ReactMapGL
          ref={this.mapElem}
          {...this.state.mapViewport}
          mapOptions={{
            style: (true) ? "mapbox://styles/mapbox/streets-v11" : "mapbox://styles/mapbox/dark-v10" // TODO: Toggle map style by dark mode
          }}
          mapboxApiAccessToken={this.mapboxToken}
          onLoad={() => this.setState({ mapLoading: false })}
          onViewportChange={(viewport) => this.setState({ mapViewport: viewport })}
        >
          <div style={{position: 'absolute', top: '1rem', right: '1rem'}}>
            <NavigationControl />
          </div>
          {this.state.markers.map((marker) => (
            <Marker latitude={marker.lat} longitude={marker.lng} key={marker.lat+marker.lng}>
              <Popover content={
                <Menu>
                  <li>
                    <div className="MapHouseMarkerInfo">
                      <H5>Demo-House 1</H5>
                      <Text className="bp3-text-muted" ellipsize={true}>Owner: Demo User</Text>
                    </div>
                  </li>
                  <Menu.Divider />
                  <Menu.Item
                    icon="document-open"
                    text="Show House"
                  />
                </Menu>
              } position={Position.TOP_CENTER}>
                <Button icon="home" className="MapHouseMarker" />
              </Popover>
            </Marker>
          ))}
        </ReactMapGL>
      </Card>
    );
  }
}

export default HousesMapComponent;