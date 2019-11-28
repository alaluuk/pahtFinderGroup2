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
              image = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                title="Good House"
                year="2010"
                country="Spain"
                EE="70"
              ></Card>
              <Card
              image = "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1053&q=80"
                title="My House"
                year="1970"
                country="Finnland"
                EE="70"
              ></Card>
              <Card
              image = "https://images.unsplash.com/photo-1507035159636-7a86eb324885?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1013&q=80"
                title="Garage"
                year="2004"
                country="Finnland"
                EE="85"
              ></Card>
              <Card
              image = "https://images.unsplash.com/photo-1505901889250-5cd7cd813691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                title="Old House"
                year="1950"
                country="Finnland"
                EE="30"
              ></Card>
              <Card
              image = "https://images.unsplash.com/photo-1458934876533-9becb2380c47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80"
                title="Finn Cabin"
                year="1966"
                country="Finnland"
                EE="20"
              ></Card>
              
              <Card
              image = "https://images.unsplash.com/photo-1517825449265-7576eda90756?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                title="Simple Hut"
                year="197"
                country="Finnland"
                EE="70"
              ></Card>
              <Card
              image = "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                title="House in Snow"
                year="1950"
                country="Finnland"
                EE="50"
              ></Card>
              <Card
              image = "https://images.unsplash.com/photo-1430285561322-7808604715df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                title="BabaHouse"
                year="2002"
                country="Sweden"
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
