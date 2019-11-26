import React, { Component } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

class Search extends Component {
    state = {  }
    render() { 
        return ( <div>


<TextField
          placeholder = "Search..."
          id="standard-start-adornment-search"
          className="overviewSearch"
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon/></InputAdornment>,
          }}
        />

        </div> );
    }
}
 
export default Search;



