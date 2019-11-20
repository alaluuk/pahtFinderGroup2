import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';


class MapContainer extends Component {
    state = {  }

    render() {   
        const style = {
            width: '420px',
            height: '300px',
            

          }
        return ( <Map google={this.props.google} zoom={14}
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
      apiKey: ("API_KEY")
    })(MapContainer)

    /*"AIzaSyCtjE1Gp9fMruTlx_lBK367VySTtQDMeWU"*/