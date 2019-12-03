import React from "react";
import Card from "./cardBuilding";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import "../../styles/overview.scss";
import Map from "../Maps/mapOverview";
import Filter from "./functions/filter";
import Search from "./functions/search";
import Sort from "./functions/sort";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { CURRENT_USER_ID } from "../../constants";

const GET_BUILDINGS = gql`
  query GET_BUILDINGS($ownerID: ID!) {
    houses(ownerID: $ownerID) {
      id
      name
      addressCountry
      constructionYear
    }
  }
`;

/* Randomised Pictures */
const images = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",

]

export default function Body() {
  const owner = localStorage.getItem(CURRENT_USER_ID);
  const [ownerID] = React.useState(owner);
  const { data, loading, error } = useQuery(GET_BUILDINGS, {
    variables: { ownerID }
  });

  if (loading) return <p>LOADING</p>;
  if (error) return `Error! ${error}`;


  return (
    <div className="bodyOverview">
      <div className="overlay">
        <div className="content">
          <div className="headLine">
            <div className="overviewHeadLeft">
              <h1 className="overviewHeader">My buildings</h1>
              <Link to="/addBuilding" className="addNewPlusLink">
                <Button variant="outlined" className="addNewPlusButton">
                  <AddIcon></AddIcon> &nbsp; Add New
                </Button>
              </Link>
            </div>

            <div className="overviewFilterButtons">
              <Search></Search>
              <Filter></Filter>
              <Sort></Sort>
            </div>
          </div>

          <div className="scrollBars">
          {data.houses.map((house, index) => (
              <Card
               id = {house.id}
                key={house.name + "-" + index}
                image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                title={house.name}
                year={house.constructionYear}
                country={house.addressCountry}
                EE="70"
              ></Card>
            ))}
          </div>

          <div className="bottomContent">
            <div>
              <Map></Map>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
