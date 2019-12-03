import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";


class MapContainer extends Component {
  state = {
    
  };

 
  render() {
    const style = {
      width: '2010px',
      height: '600px'
    }
    return (
      <Map google={this.props.google}
      style={style}
      initialCenter={{
        lat: 55.676098,
        lng: 12.568337

      }}
      zoom={4}
      onClick={this.onMapClicked}
      
    >
      


        
<Marker
          title={"Helsinki, Finland "}
          name={"Helsinki"}
          position={{ lat: 60.192059, lng: 24.945831 }}
        />
        <Marker
          title={"Oulu, Finland"}
          name={"Oulu"}
          position={{ lat: 65.01236, lng: 25.46816 }}
        />
        <Marker
          title={"Tampere, Finland"}
          name={"Tampere"}
          position={{ lat: 61.49911, lng: 23.78712 }}
        />
        <Marker
          title={"Vaasa, Finland"}
          name={"Vaasa"}
          position={{ lat: 63.0960007, lng: 21.6157703 }}
        />
        <Marker
          title={"Kajaani, Finland"}
          name={"Kajaani"}
          position={{ lat: 64.22728, lng: 27.72846 }}
        />
        <Marker
          title={"Kuopio, Finland"}
          name={"Kuopio"}
          position={{ lat: 62.89238, lng: 27.67703 }}
        />
        <Marker
          title={"Umeå, Sweden"}
          name={"Umeå"}
          position={{ lat: 63.825848, lng: 20.263035 }}
        />
        <Marker
          title={"Ibiza, Spain"}
          name={"Ibiza"}
          position={{ lat: 38.9067339, lng: 1.4205982999999378 }}
        />
      
        

      
        
      </Map>
      
    );
    
  }
}

export default GoogleApiWrapper({
  apiKey:  process.env.GOOGLE_MAP_API_KEY 
})(MapContainer);


