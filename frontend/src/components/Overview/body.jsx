import React, { Component } from "react";
import Card from "./cardBuilding";
import Chart from "../Overview/chart";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import "../../styles/overview.scss";
import Map from "../Maps/mapOverview";

class Body extends Component {
  state = {};

  render() {
    return (
      <div className="bodyOverview">
        <div className="overlay">
          <div className="content">
            <div className="headLine">
              <h1 className="overviewHeader">My buildings</h1>
              <Link to="/addBuilding" className="addNewPlusLink">
                <Button variant="outlined" className="addNewPlusButton">
                  <AddIcon></AddIcon> &nbsp; Add New
                </Button>
              </Link>
            </div>
            <div className="scrollBars">
              <Card
                title="Good House"
                year="1952"
                country="Finnland"
                EE="35"
              ></Card>
              <Card
                title="My House"
                year="1970"
                country="Finnland"
                EE="70"
              ></Card>
              <Card
                title="University Baba"
                year="1950"
                country="Finnland"
                EE="50"
              ></Card>
              <Card
                title="BaboHouse"
                year="2002"
                country="Finnland"
                EE="100"
              ></Card>
              <Card
                title="Good House"
                year="1952"
                country="Finnland"
                EE="35"
              ></Card>
              <Card
                title="My House"
                year="1970"
                country="Finnland"
                EE="70"
              ></Card>
              <Card
                title="University Baba"
                year="1950"
                country="Finnland"
                EE="50"
              ></Card>
              <Card
                title="BaboHouse"
                year="2002"
                country="Finnland"
                EE="100"
              ></Card>
            </div>

            <div className="bottomContent">
              <Map></Map>
              {/*
                            <Chart EE = '70'></Chart>*/}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
