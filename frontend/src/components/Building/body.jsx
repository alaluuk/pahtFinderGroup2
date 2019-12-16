import React from "react";
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
import DeleteButton from "./deleteBuilding";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { useLazyQuery } from '@apollo/react-hooks';
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
          manufacturer
          productionYear
          uValue
          serialNumber
          price
          type {
            id
            title
          }
          efficiencyReport {
            ranking {
                percentage
            }
            recommendations {
                upgradePercentage
                structureTemplate {
                  id
                  title
                  manufacturer
                  productionYear
                  uValue
                  serialNumber
                  price
                  type {
                    id
                    title
                  }
                }
            }
          }
        }
        efficiencyReport {
          total {
              structuresCount
              percentage
              uValue
              possibleUValue
              costOfHeating
              possibleCostOfHeating
            }
        }
        owner {
            id
            name
        }
    }
  }`;



async function getCoordinates(address) {
  var fixedAddress = address.split(' ').join('+');
  var url = 'https://geocoder.api.here.com/6.2/geocode.json?app_id={API_ID}app_code={APP_CODE}&searchtext=' + fixedAddress + '&locationattributes[mapView]';
  const result = await axios(url);
  const latitude = result.data.Response.View[0].Result[0].Location.DisplayPosition.Latitude;
  const longitude = result.data.Response.View[0].Result[0].Location.DisplayPosition.Longitude;
  const coor = [latitude, longitude];

  return coor;

}

export default function Body(props) {

  const [id, setId] = React.useState(props.id);
  const [image, setImage] = React.useState(props.image)
  const [EE, setEE] = React.useState(props.EE);
  const [uValue, setUValue] = React.useState();
  const [possibleUValue, setPossibleUValue] = React.useState();
  const [costOfHeating, setCostOfHeating] = React.useState();
  const [possibleCostOfHeating, setPossibleCostOfHeating] = React.useState();
  const [coordi, setCoordi] = React.useState('');

  const { data, loading, error } = useQuery(GET_SINGLE_BUILDING, {
    variables: { id },
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Loading...</p>
  if (error) return `Error! ${error}`;


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
      {data.houses.map((house, index) => {
        return (
          <div className="overlay">
            <div className="building" key={house.name + "-" + index}>
              <div className="buildingHeader">
                <h1 className="buildingHeaderText">{house.name}</h1>
                <Link to={{
                  pathname: '/addBuilding',
                  state: {
                    houseId: props.id,
                  }
                }}>
                  <Button className="buildingEdit" variant="outlined">
                    <EditIcon /> &nbsp; Edit
              </Button>
                </Link>
                <DeleteButton
                  className="buildingDelete"
                  id={props.id}
                  parentType="Building"
                  parentTitle={house.name}
                ></DeleteButton>
                <div className="buildingSlider">
                  <PrettoSlider
                    className="material-Slider"
                    valueLabelDisplay="on"
                    aria-label="pretto slider"
                    defaultValue={(data.houses[0].efficiencyReport.total.percentage).toFixed(0)}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="buildingsContent">
                <div className="buildingInfo">
                  <div className="buildInfoLeft">
                    <img
                      className="buildingPicture"
                      src={image}
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
                              defaultValue={house.name}
                              className="buildingSingleInfo"
                              margin="normal"
                            />
                          </td>
                          <td>
                            <TextField
                              disabled
                              id="standard-disabled"
                              label="Street"
                              defaultValue={house.addressStreet}
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
                              defaultValue={house.constructionYear}
                              className="buildingSingleInfo"
                              margin="normal"
                            />
                          </td>
                          <td>
                            <TextField
                              disabled
                              id="standard-disabled"
                              label="City"
                              defaultValue={house.addressCity}
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
                              defaultValue={house.name}
                              className="buildingSingleInfo"
                              margin="normal"
                            />
                          </td>
                          <td>
                            <TextField
                              disabled
                              id="standard-disabled"
                              label="Country"
                              defaultValue={house.addressCountry}
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
                      <Map coordinates={coordi} ></Map>
                    </div>
                  </div>
                </div>

                <div className="potenials">


                  <div className="potConsum">
                    <h4 className="potTitle">Present U-Value</h4>
                    <h2 className="potText">{data.houses[0].efficiencyReport.total.uValue}</h2>
                  </div>

                  <div className="potConsum">
                    <h4 className="potTitle">Present Yearly Heating Costs</h4>
                    <h2 className="potText"> {(data.houses[0].efficiencyReport.total.costOfHeating).toFixed(0)} €</h2>
                  </div>

                  <div className="potLosts">
                    <h4 className="potTitle">Potential U-Value </h4>
                    <h2 className="potText"> {data.houses[0].efficiencyReport.total.possibleUValue} </h2>
                  </div>
                  <div className="potSavings">
                    <h4 className="potTitle">Potential Yearly Savings </h4>
                    <h2 className="potText"> {(data.houses[0].efficiencyReport.total.costOfHeating-data.houses[0].efficiencyReport.total.possibleCostOfHeating).toFixed(0)} €</h2>
                  </div>

                </div>

                <div className="buildingRecommendations">
                  <div className="buildingRecoHeader">
                    <h2 className="recoSingleHead"> Currently Installed</h2>
                    <h2 className="recoSingleHeadReco">Recommendations</h2>
                    <h2 className="recoSingleHead"> DIY Tips</h2>
                  </div>
                  <div className="recoContentAll">

                    {house.structures.map((structure) => {
                      return (
                        <div className="recoSingleRow">
                          <div className="currentlyCard">
                            <ConstructionCard
                              title={structure.title}
                              amount="1"
                              type={structure.type.title}
                              manufacture={structure.manufacturer}
                              serial_number={structure.serialNumber}
                              u_value={structure.uValue}
                              production_year={structure.productionYear}
                              price={structure.price}
                              EE={structure.efficiencyReport.ranking.percentage}
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
                              type={structure.type.title}
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
                      );
                    })}
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}  
