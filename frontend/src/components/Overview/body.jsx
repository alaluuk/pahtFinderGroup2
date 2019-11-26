import React, { Component } from "react";
import Card from "./cardBuilding";
import { FaFilter } from "react-icons/fa";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import Fab from "@material-ui/core/Fab";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import "../../styles/overview.scss";
import Map from "../Maps/mapOverview";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Chart from "./chart";
import Filter from "./functions/filter";
import Search from "./functions/search";
import Sort from "./functions/sort";

const building = {
  id: "",
  name: "",
  owner: "",
  addressCountry: "",
  addressCity: "",
  addressStreet: "",
  addressLat: "",
  addressLng: "",
  constructionYear: "",
  heatingSystem: "",
  costOfHeating: "",
  warmWaterPipe: "",
  structures: "",
  createdAt: "",
  updatedAt: ""
};


class Body extends Component {
  state = {
    buildings: []
  };


  constructor(props){
    super(props);

    this.state = { isOpen: false };

  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }



  render() {

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
              <div>
                <Map></Map>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
