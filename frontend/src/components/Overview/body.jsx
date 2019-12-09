import React, { useState, useEffect } from "react";
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
function randomizeImage(number){
  if(number == 1){
    return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

  }
  else if(number == 2){
    return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";
  }
  else if(number == 3){
    return "https://images.unsplash.com/photo-1518780664697-55e3ad937233?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80";

  }
  else if(number == 4){
    return "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

  }
  else if(number == 5){
    return "https://images.unsplash.com/photo-1449844908441-8829872d2607?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

  }
  else if(number == 6){
    return "https://images.unsplash.com/photo-1430285561322-7808604715df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

  }
  else if(number == 7){
    return "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

  }
  else if(number == 8){
    return "https://images.unsplash.com/photo-1568092775154-7fa176a29c0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80";

  }
  else if(number == 9){
    return "https://images.unsplash.com/photo-1567493756992-e2b6227cddc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";

  }
  else if(number == 10){
    return "https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80";

  }
    }


export default function Body() {

   // Similar to componentDidMount and componentDidUpdate:
   useEffect(() => {
    if(refresh){
      window.location.reload();
    }
      setRefresh(false)
  });
 

  const owner = localStorage.getItem(CURRENT_USER_ID);
  const [ownerID] = React.useState(owner);
  const [refresh, setRefresh] = React.useState(false);
  const { data, loading, error } = useQuery(GET_BUILDINGS, {
    variables: { ownerID }
  });

  if (loading) return <p>LOADING</p>;
  if (error) return `Error! ${error}`;

  
  return (
    <div className="bodyOverview" >
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
                image = {randomizeImage(Math.ceil(Math.random() * 10))}
                title={house.name}
                year={house.constructionYear}
                country={house.addressCountry}
                EE={Math.ceil(Math.random() * 100)}
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
