import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';


class MapContainer extends Component {
  state = {

  }



  constructor(props) {
    super(props)

  }

  render() {
    const style = {
      width: '500px',
      height: '300px',
    }
    return (<Map google={this.props.google} zoom={14}
      style={style}>
      <Marker onClick={this.onMarkerClick}
        name={'Current location'} />

      <InfoWindow onClose={this.onInfoWindowClose}>

      </InfoWindow>
    </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: (process.env.GOOGLE_MAP_API_KEY)
})(MapContainer)

