import React, { Component } from "react";
import ConstructionCard from "../cardConstruction";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import AddConstruction from "./addConstruction";
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import Typography from '@material-ui/core/Typography';
import { withApollo } from "react-apollo";
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";
import { CURRENT_USER_ID } from '../../constants';


const CREATE_HOUSE = gql`
  mutation createHouse($name: String!, $ownerId: ID!, $addressStreet: String!, $addressCountry: String!, $addressCity:String!, $constructionYear:Int!,
    $heatingSystem:String!, $costOfHeating: Float!, $warmWaterPipe: Boolean!) {
    createHouse(name: $name, ownerId: $ownerId, addressStreet: $addressStreet, addressCountry: $addressCountry, addressCity: $addressCity,
        constructionYear: $constructionYear, heatingSystem: $heatingSystem, costOfHeating: $costOfHeating, warmWaterPipe: $warmWaterPipe) {
        id
    }
  }
`

/**
 * Exports form that allows user to fill in 
 * information about constructions (roof or wall etc.)
 */
class Construction extends Component {
  state = {
    ownerId: localStorage.getItem(CURRENT_USER_ID),
  }


  componentDidUpdate(prevProps) {
    //save structure in database
    if (this.props.triggerSave !== prevProps.triggerSave) {
      console.log("save House Clicked!")
      this.props.client.mutate({
        mutation: CREATE_HOUSE,
        variables: {
          name: this.state.name,
          ownerId: localStorage.getItem(CURRENT_USER_ID),
          addressStreet: this.state.addressStreet,
          addressCountry: this.state.addressCountry,
          addressCity: this.state.addressCity,
          constructionYear: this.state.constructionYear,
          heatingSystem: this.state.heatingSystem,
          costOfHeating: this.state.costOfHeating,
          warmWaterPipe: this.state.warmWaterPipe
        },
      }).then(results => {
        console.log(results);
        this.setState({ errorMessage: '' })
      })
        .catch(error => {
          console.log("Creat House Error: ", error);
          this.setState({ errorMessage: error.graphQLErrors[0].message })
        });
    }
  }

  render() {
    const {
      errorMessage
    } = this.state;

    return (
      <div className="addStructureComp">
        <div className="addStructureHead">
          <h2 className="addBuildText"> {this.props.name}</h2>
          <AddConstruction parentType={this.props.name} parentState={this.props.name}></AddConstruction>
        </div>

        <div className="mainSlider">
          <Slider
            defaultValue={50}
            aria-labelledby="discrete-slider-always"
            valueLabelDisplay="on"
            disabled={true}
          />
        </div>
        <div className="scrollBar">
          <div className="scrollItem">
            <ConstructionCard
              title="Roof Y6798 Vollholz"
              amount="1"
              type={this.state.roof}
              manufacture="Roof GmbH"
              serial_number="1"
              u_value="1.2"
              area="2"
              production_year="1984"
              price=""
              EE="100"
            ></ConstructionCard>{" "}
          </div>

          <div className="scrollItem">
            <ConstructionCard
              title="Roof Y6798 Vollholz"
              amount="1"
              type="Door"
              manufacture="Roof GmbH"
              serial_number="1"
              u_value="1.2"
              area="2"
              production_year="1984"
              price=""
              EE="90"
            ></ConstructionCard>
          </div>
          <div className="scrollItem">
            <ConstructionCard
              title="Roof Y6798 Vollholz"
              amount="1"
              type="Door"
              manufacture="Roof GmbH"
              serial_number="1"
              u_value="1.2"
              area="2"
              production_year="1984"
              price="300"
              EE="70"
            ></ConstructionCard>
          </div>
          <div className="scrollItem">
            {" "}
            <ConstructionCard
              title="Roof Y6798 Vollholz"
              amount="1"
              type="Door"
              manufacture="Roof GmbH"
              serial_number="1"
              u_value="1.2"
              area="2"
              production_year="1984"
              price=""
              EE="60"
            ></ConstructionCard>
          </div>
          <div className="scrollItem">
            {" "}
            <ConstructionCard
              title="Roof Y6798 Vollholz"
              amount="1"
              type="Door"
              manufacture="Roof GmbH"
              serial_number="1"
              u_value="1.2"
              area="2"
              production_year="1984"
              price=""
              EE="50"
            ></ConstructionCard>
          </div>
          <div className="scrollItem">
            {" "}
            <ConstructionCard
              title="Roof Y6798 Vollholz"
              amount="1"
              type="Door"
              manufacture="Roof GmbH"
              serial_number="1"
              u_value="1.2"
              area="2"
              production_year="1984"
              price=""
              EE="40"
            ></ConstructionCard>
          </div>
          <div className="scrollItem">
            {" "}
            <ConstructionCard
              title="Roof Y6798 Vollholz"
              amount="1"
              type="Door"
              manufacture="Roof GmbH"
              serial_number="1"
              u_value="1.2"
              area="2"
              production_year="1984"
              price=""
              EE="20"
            ></ConstructionCard>
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(Construction);