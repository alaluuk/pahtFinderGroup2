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
  query GET_CONSTRUCTIONS($houseID: ID!, $structureTypeID: ID!) {
    houseStructures(houseID: $houseID, structureTypeID: $structureTypeID) {
        id
        title
        manufacturer
        productionYear
        uValue
        serialNumber
        price
        efficiencyReport{
          ranking{
            percentage
          }
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
    this.retrieveConstructions();
  }

  constructionCallback = () => {
    console.log("Construction created, callback reached, fetch new construction.")
    this.retrieveConstructions();
  }

  /**
   * retrieve constructions of this construction type via withAollo
   */
  retrieveConstructions() {
    console.log("retrieving " + this.props.constructionTypeTitle);
    this.props.client.query({
      query: GET_CONSTRUCTIONS,
      fetchPolicy: "no-cache",
      variables: {
        houseID: this.props.houseId,
        structureTypeID: this.props.constructionTypeId
      },
    }).then(results => {
      console.log(this.props.constructionTypeTitle + " retrieved:", results);
      this.setState({ errorMessage: '' })
      this.setState({ constructions: results.data.houseStructures });
    })
      .catch(error => {
        console.log("error at retrieving constructions: ", error);
        var err = error.graphQLErrors;
        let msg = "Could not retrieve " + this.props.constructionTypeTitle + ". Please check your internet connection. ("
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
    { /* Displaying main form*/}
    return (
      <div className="addStructureComp">
        <div className="addStructureHead">
          <h2 className="addBuildText"> {this.props.constructionTypeTitle}</h2>
          { /*callbackFromParent makes sure to fetch and display new structures here*/}
          <AddConstruction
            constructionTypeTitle={this.props.constructionTypeTitle}
            constructionTypeId={this.props.constructionTypeId}
            houseId={this.props.houseId}
            callbackFromParent={this.constructionCallback}>
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
        { /* Iterater over all constructions of this type
            and display them if array is not empty*/}
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
                  EE={data.efficiencyReport.ranking.percentage}
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