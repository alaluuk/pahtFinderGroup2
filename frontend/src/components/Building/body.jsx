import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slider from "@material-ui/core/Slider";
import DoubleArrowIcon from "@material-ui/icons/DoubleArrow";
import RecommendationCard from "./cardRecommendation";
import ConstructionCard from "../cardConstruction";
import DiyCard from "./cardDIY";
import Map from "../Maps/mapBuilding";
import { withStyles } from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteButton from "../Deletion/body";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AUTH_TOKEN, CURRENT_USER_ID } from '../../constants';
import "../../styles/building.scss";


const GET_SINGLE_BUILDING = gql`
  query GET_SINGLE_BUILDING($id: ID!){
    houses(id: $id) {
        id
        name
        addressCountry
        addressCity
        addressStreet
        addressLat
        addressLng
        constructionYear
        heatingSystem
        costOfHeating
        warmWaterPipe
        createdAt
        updatedAt
        structures {
            id
            title
            type {
                id
                title
            }
            uValue
        }
        owner {
            id
            name
        }
    }
  }`;

 


export default function Body(props) {

  const [id, setId, getId] = React.useState(props.id);
  const [type, setType, getType] = React.useState('');
  const [title, setTitle, getTtitle] = React.useState('');
  const [street, setStreet, getStreet] = React.useState('');
  const [city, setCity, getCity] = React.useState('');
  const [country, setCountry, getCountry] = React.useState('');
  const [constructionYear, setConstructionYear, getConstructionYear] = React.useState('');
  const [EE, setEE, getEE] = React.useState('');



  console.log("Building ID from Card: " + id);
  console.log("Auth:" + localStorage.getItem(AUTH_TOKEN));
  console.log("User_Id" + localStorage.getItem(CURRENT_USER_ID));
  
    const { data, loading, error } = useQuery(GET_SINGLE_BUILDING, {
      variables: { id }
    });
    if (loading) return <p>LOADING</p>;
  if (error) return `Error! ${error}`;
  console.log(data)

  
  


    const PrettoSlider = withStyles({
      root: {
        color: "dimgray",
        height: 8
      },
      thumb: {
        height: 24,
        width: 24,
        backgroundColor: "dimgray",
        border: "2px solid white",
        marginTop: -8,
        marginLeft: -12,
        "&:focus,&:hover,&$active": {
          boxShadow: "inherit"
        }
      },
      active: {},
      valueLabel: {
        left: "calc(-50% + 4px)"
      },
      track: {
        borderRadius: 4
      },
      rail: {
        borderRadius: 4
      }
    })(Slider);

    return (
      <div className="bodyBuilding">
        <div className="overlay">
          <div className="building">
            <div className="buildingHeader">
              <h1 className="buildingHeaderText">eRSETZTEN</h1>
              <Button className="buildingEdit" variant="outlined">
                <EditIcon /> &nbsp; Edit
              </Button>
              <DeleteButton
                className="buildingDelete"
                id=""
                parentType =  ""/*{this.state.type}*/
                parentTitle = ""/*{this.state.title}*/
              ></DeleteButton>
              <div className="buildingSlider">
                <PrettoSlider
                  className="material-Slider"
                  valueLabelDisplay="on"
                  aria-label="pretto slider"
                  defaultValue=""/*{this.state.EE}*/
                  disabled={true}
                />
              </div>
            </div>
            <div className="buildingsContent">
              <div className="buildingInfo">
                <div className="buildInfoLeft">
                  <img
                    className="buildingPicture"
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                    alt="buildingPicture"
                  ></img>
                </div>
                <div className="buildInfoCenter">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <TextField
                            disabled
                            id="standard-disabled"
                            label="Name Of Building"
                            defaultValue=""/*{this.state.title}*/
                            className="buildingSingleInfo"
                            margin="normal"
                          />
                        </td>
                        <td>
                          <TextField
                            disabled
                            id="standard-disabled"
                            label="Street"
                            defaultValue=""/*{this.state.street}*/
                            className="buildingSingleInfo"
                            margin="normal"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextField
                            disabled
                            id="standard-disabled"
                            label="Construction Year"
                            defaultValue=""/*{this.state.constructionYear}*/
                            className="buildingSingleInfo"
                            margin="normal"
                          />
                        </td>
                        <td>
                          <TextField
                            disabled
                            id="standard-disabled"
                            label="City"
                            defaultValue=""/*{this.state.city}*/
                            className="buildingSingleInfo"
                            margin="normal"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <TextField
                            disabled
                            id="standard-disabled"
                            label="Type of Building"
                            defaultValue=""/*{this.state.type}*/
                            className="buildingSingleInfo"
                            margin="normal"
                          />
                        </td>
                        <td>
                          <TextField
                            disabled
                            id="standard-disabled"
                            label="Country"
                            defaultValue=""/*{this.state.country}*/
                            className="buildingSingleInfo"
                            margin="normal"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="buildInfoRight">
                  <div className="buildingMap">
                    <Map></Map>
                  </div>
                </div>
              </div>

              <div className="buildingRecommendations">
                <div className="buildingRecoHeader">
                  <h2 className="recoSingleHead"> Currently Installed</h2>
                  <h2 className="recoSingleHeadReco">Recommendations</h2>
                  <h2 className="recoSingleHead"> DIY Tips</h2>
                </div>
                <div className="recoContentAll">
                  <div className="recoSingleRow">
                    <div className="currentlyCard">
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
                        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=facearea&w=800&h=2000"
                      ></ConstructionCard>
                    </div>
                    <div className="recoSpace">
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <p className="recoImproveText">+ 21 %</p>
                      <DoubleArrowIcon className="recoImproveIcon"></DoubleArrowIcon>
                    </div>
                    <div className="recoCard">
                      <RecommendationCard
                        title="Roof Y6798 Vollholz"
                        amount="1"
                        type="Door"
                        manufacture="Roof GmbH"
                        serial_number="1"
                        u_value="1.2"
                        area="2"
                        production_year="1984"
                        price=""
                        EE="71"
                        isReco="false"
                      ></RecommendationCard>
                    </div>
                    <div className="diy">
                      <DiyCard></DiyCard>{" "}
                    </div>
                  </div>

                  <div className="recoSingleRow">
                    <div className="currentlyCard">
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
                        EE="34"
                        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=facearea&w=800&h=2000"
                      ></ConstructionCard>
                    </div>
                    <div className="recoSpace">
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <p className="recoImproveText">+ 37%</p>
                      <DoubleArrowIcon className="recoImproveIcon"></DoubleArrowIcon>
                    </div>
                    <div className="recoCard">
                      <RecommendationCard
                        title="Roof Y6798 Vollholz"
                        amount="1"
                        type="Door"
                        manufacture="Roof GmbH"
                        serial_number="1"
                        u_value="1.2"
                        area="2"
                        production_year="1984"
                        price=""
                        EE="71"
                        isReco="false"
                      ></RecommendationCard>
                    </div>
                    <div className="diy">
                      <DiyCard></DiyCard>{" "}
                    </div>
                  </div>

                  <div className="recoSingleRow">
                    <div className="currentlyCard">
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
                        EE="71"
                        image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=facearea&w=800&h=2000"
                      ></ConstructionCard>
                    </div>
                    <div className="recoSpace">
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <br></br>
                      <p className="recoImproveText">+ 19 %</p>
                      <DoubleArrowIcon className="recoImproveIcon"></DoubleArrowIcon>
                    </div>
                    <div className="recoCard">
                      <RecommendationCard
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
                        isReco="false"
                      ></RecommendationCard>
                    </div>
                    <div className="diy">
                      <DiyCard></DiyCard>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
