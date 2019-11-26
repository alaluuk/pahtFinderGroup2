import React, { Component } from 'react';
import { FaFilter } from "react-icons/fa";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Fab from "@material-ui/core/Fab";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import "../../../styles/overview.scss"


export default function Filter ({ }){
    const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const resetFilter = () =>{
      

  };

  const [name, setName] = React.useState('');
  const [year, setYear] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [EE, setEE] = React.useState('');


  const inputLabel = React.useRef(null);
  const [labelWidth] = React.useState(0);

  const handleNameChange = event => {
    setName(event.target.value);
  };

  const handleYearChange = event => {
    setYear(event.target.value);
  };

  const handleCountryChange = event => {
    setCountry(event.target.value);
  };

  const handleEEChange = event => {
    setEE(event.target.value);
  };


    
  
    return (
      <div>
   

              <Fab
size="small"
color="secondary"
aria-label="add"
className="overviewFilter"
onClick={handleClick}

>
<FaFilter />
</Fab>


<Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
       <div className = "filterBody">

           <h3> Filter </h3>

           <div className = "filterContent">
           <FormControl variant="outlined" className="filterOption">
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Name
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={name}
          onChange={handleNameChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className="filterOption">
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Year
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={year}
          onChange={handleYearChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className="filterOption">
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Country
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={country}
          onChange={handleCountryChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className="filterOption">
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Energy Efficience
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={EE}
          onChange={handleEEChange}
          labelWidth={labelWidth}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          <MenuItem value={10}>Smaller than 25</MenuItem>
          <MenuItem value={20}>Smaller than 50</MenuItem>
          <MenuItem value={30}>Smaller than 75 </MenuItem>
        </Select>
      </FormControl>


<Button variant="contained" color="secondary" className = "filterOptionRemove" onClose={resetFilter}>
  Reset All
</Button>


           </div>

          
       </div>
      </Menu>
      </div>
    );
  }


