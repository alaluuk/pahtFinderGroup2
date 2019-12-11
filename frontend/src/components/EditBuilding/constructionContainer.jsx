import React, { Component } from "react";
import ConstructionCard from "../cardConstruction";
import Slider from "@material-ui/core/Slider";
import AddConstruction from "./addConstruction";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import Typography from '@material-ui/core/Typography';
import "../../styles/addConstruction.scss";
import "../../styles/addBuilding.scss";
import { CURRENT_USER_ID } from '../../constants';


const GET_CONSTRUCTIONS = gql`
  query GET_CONSTRUCTIONS($id: ID!) {
    houses(id: $id) {
      structures {
        id
        title
        manufacturer
        productionYear
        uValue
        serialNumber
        price
        efficiencyReport
      }
    }
  }
`;

/**
 * Consists out of ConstructionCards.
 * Shows all constructions from one type.
 */
class ConstructionContainer extends Component {
  state = {
    ownerId: localStorage.getItem(CURRENT_USER_ID), //owner of displayed house
    constructions: [], //all displayed constructions of this construcion type
    errorMessage: '' //will be displayed in case of graphql error
  }

  componentDidMount() {
    //retrieve constructions via withAollo
    console.log("retrieving " + this.props.constructionTypeTitle);
    this.props.client.query({
      query: GET_CONSTRUCTIONS,
      variables: { id: this.props.houseId },
    }).then(results => {
      console.log(this.props.constructionTypeTitle + " retrieved:", results);
      this.setState({ errorMessage: '' })
      this.setState({ constructions: results.data.houses[0].structures });
    })
      .catch(error => {
        console.log("error at retrieving constructions: ", error);
        var err = error.graphQLErrors[0];
        let msg = "Could not retrieve constructions. Please check your internet connection. ("
        if (err) {
          this.setState({ errorMessage: msg + err.message + ")" })
        } else {
          this.setState({ errorMessage: msg + error.toString() + ")" })
        }
      });
  }

  render() {
    {/* Displaying in progress or errors*/ }
    if (this.state.errorMessage !== '') {
      return (
        <Typography variant="subtitle1" component="p" style={{ color: 'red' }} >
          {this.state.errorMessage}
        </Typography>
      );
    }
    if (this.state.constructions === null) { return "loading ..." }
    {   /* Displaying main form*/ }
    return (
      <div className="addStructureComp">
        <div className="addStructureHead">
          <h2 className="addBuildText"> {this.props.constructionTypeTitle}</h2>
          <AddConstruction
            constructionTypeTitle={this.props.constructionTypeTitle}
            constructionTypeId={this.props.constructionTypeId}
            houseId={this.props.houseId}>
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

        {this.state.constructions ? (
            <div className="scrollBar">
              {this.state.constructions.map((data) => (
                <div className="scrollItem">
                <ConstructionCard
                  title={data.title}
                  amount="1"
                  type={this.props.constructionTypeTitle}
                  manufacture={data.manufacturer}
                  serial_number={data.serialNumber}
                  u_value={data.uValue}
                  production_year={data.productionYear}
                  price={data.price}
                  EE={data.efficiencyReport}
                ></ConstructionCard>
                </div>
              ))}
            </div>
          
        ) : (
            <div>
            </div>
          )}
      </div>
      


    );
  }
}

export default withApollo(ConstructionContainer);