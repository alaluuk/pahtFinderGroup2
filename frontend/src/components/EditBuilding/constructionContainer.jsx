import React, { Component } from "react";
import ConstructionCard from "../cardConstruction";
import Slider from "@material-ui/core/Slider";
import AddConstruction from "./addConstruction";
import { withApollo } from "react-apollo";
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";
import { CURRENT_USER_ID } from '../../constants';


/**
 * Consists out of ConstructionCards.
 * Shows all constructions from one type.
 */
class ConstructionContainer extends Component {
  state = {
    ownerId: localStorage.getItem(CURRENT_USER_ID),
  }

  render() {

    return (
      <div className="addStructureComp">
        <div className="addStructureHead">
          <h2 className="addBuildText"> {this.props.constructionTypeTitle}</h2>
          <AddConstruction
              constructionTypeTitle = {this.props.constructionTypeTitle}
              constructionTypeId = {this.props.constructionTypeId}
              houseId = {this.props.houseId}>
          </AddConstruction>
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

export default withApollo(ConstructionContainer);