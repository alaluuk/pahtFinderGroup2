import React from 'react';
import { FaFilter } from "react-icons/fa";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from "@material-ui/core/Fab";
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import "../../../styles/overview.scss"



function showYears(){
  var allYears;
  for(var i = 1880; i < 2019; i++){
    var SingleYear = "<MenuItem value={"+i+"}>"+i+"</MenuItem>";
    allYears = allYears + SingleYear;
  }
  console.log(allYears)
  return allYears;
}
 
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
          <MenuItem value={1881}>1881</MenuItem><MenuItem value={1882}>1882</MenuItem><MenuItem value={1883}>1883</MenuItem><MenuItem value={1884}>1884</MenuItem><MenuItem value={1885}>1885</MenuItem><MenuItem value={1886}>1886</MenuItem><MenuItem value={1887}>1887</MenuItem><MenuItem value={1888}>1888</MenuItem><MenuItem value={1889}>1889</MenuItem><MenuItem value={1890}>1890</MenuItem><MenuItem value={1891}>1891</MenuItem><MenuItem value={1892}>1892</MenuItem><MenuItem value={1893}>1893</MenuItem><MenuItem value={1894}>1894</MenuItem><MenuItem value={1895}>1895</MenuItem><MenuItem value={1896}>1896</MenuItem><MenuItem value={1897}>1897</MenuItem><MenuItem value={1898}>1898</MenuItem><MenuItem value={1899}>1899</MenuItem><MenuItem value={1900}>1900</MenuItem><MenuItem value={1901}>1901</MenuItem><MenuItem value={1902}>1902</MenuItem><MenuItem value={1903}>1903</MenuItem><MenuItem value={1904}>1904</MenuItem><MenuItem value={1905}>1905</MenuItem><MenuItem value={1906}>1906</MenuItem><MenuItem value={1907}>1907</MenuItem><MenuItem value={1908}>1908</MenuItem><MenuItem value={1909}>1909</MenuItem><MenuItem value={1910}>1910</MenuItem><MenuItem value={1911}>1911</MenuItem><MenuItem value={1912}>1912</MenuItem><MenuItem value={1913}>1913</MenuItem><MenuItem value={1914}>1914</MenuItem><MenuItem value={1915}>1915</MenuItem><MenuItem value={1916}>1916</MenuItem><MenuItem value={1917}>1917</MenuItem><MenuItem value={1918}>1918</MenuItem><MenuItem value={1919}>1919</MenuItem><MenuItem value={1920}>1920</MenuItem><MenuItem value={1921}>1921</MenuItem><MenuItem value={1922}>1922</MenuItem><MenuItem value={1923}>1923</MenuItem><MenuItem value={1924}>1924</MenuItem><MenuItem value={1925}>1925</MenuItem><MenuItem value={1926}>1926</MenuItem><MenuItem value={1927}>1927</MenuItem><MenuItem value={1928}>1928</MenuItem><MenuItem value={1929}>1929</MenuItem><MenuItem value={1930}>1930</MenuItem><MenuItem value={1931}>1931</MenuItem><MenuItem value={1932}>1932</MenuItem><MenuItem value={1933}>1933</MenuItem><MenuItem value={1934}>1934</MenuItem><MenuItem value={1935}>1935</MenuItem><MenuItem value={1936}>1936</MenuItem><MenuItem value={1937}>1937</MenuItem><MenuItem value={1938}>1938</MenuItem><MenuItem value={1939}>1939</MenuItem><MenuItem value={1940}>1940</MenuItem><MenuItem value={1941}>1941</MenuItem><MenuItem value={1942}>1942</MenuItem><MenuItem value={1943}>1943</MenuItem><MenuItem value={1944}>1944</MenuItem><MenuItem value={1945}>1945</MenuItem><MenuItem value={1946}>1946</MenuItem><MenuItem value={1947}>1947</MenuItem><MenuItem value={1948}>1948</MenuItem><MenuItem value={1949}>1949</MenuItem><MenuItem value={1950}>1950</MenuItem><MenuItem value={1951}>1951</MenuItem><MenuItem value={1952}>1952</MenuItem><MenuItem value={1953}>1953</MenuItem><MenuItem value={1954}>1954</MenuItem><MenuItem value={1955}>1955</MenuItem><MenuItem value={1956}>1956</MenuItem><MenuItem value={1957}>1957</MenuItem><MenuItem value={1958}>1958</MenuItem><MenuItem value={1959}>1959</MenuItem><MenuItem value={1960}>1960</MenuItem><MenuItem value={1961}>1961</MenuItem><MenuItem value={1962}>1962</MenuItem><MenuItem value={1963}>1963</MenuItem><MenuItem value={1964}>1964</MenuItem><MenuItem value={1965}>1965</MenuItem><MenuItem value={1966}>1966</MenuItem><MenuItem value={1967}>1967</MenuItem><MenuItem value={1968}>1968</MenuItem><MenuItem value={1969}>1969</MenuItem><MenuItem value={1970}>1970</MenuItem><MenuItem value={1971}>1971</MenuItem><MenuItem value={1972}>1972</MenuItem><MenuItem value={1973}>1973</MenuItem><MenuItem value={1974}>1974</MenuItem><MenuItem value={1975}>1975</MenuItem><MenuItem value={1976}>1976</MenuItem><MenuItem value={1977}>1977</MenuItem><MenuItem value={1978}>1978</MenuItem><MenuItem value={1979}>1979</MenuItem><MenuItem value={1980}>1980</MenuItem><MenuItem value={1981}>1981</MenuItem><MenuItem value={1982}>1982</MenuItem><MenuItem value={1983}>1983</MenuItem><MenuItem value={1984}>1984</MenuItem><MenuItem value={1985}>1985</MenuItem><MenuItem value={1986}>1986</MenuItem><MenuItem value={1987}>1987</MenuItem><MenuItem value={1988}>1988</MenuItem><MenuItem value={1989}>1989</MenuItem><MenuItem value={1990}>1990</MenuItem><MenuItem value={1991}>1991</MenuItem><MenuItem value={1992}>1992</MenuItem><MenuItem value={1993}>1993</MenuItem><MenuItem value={1994}>1994</MenuItem><MenuItem value={1995}>1995</MenuItem><MenuItem value={1996}>1996</MenuItem><MenuItem value={1997}>1997</MenuItem><MenuItem value={1998}>1998</MenuItem><MenuItem value={1999}>1999</MenuItem><MenuItem value={2000}>2000</MenuItem><MenuItem value={2001}>2001</MenuItem><MenuItem value={2002}>2002</MenuItem><MenuItem value={2003}>2003</MenuItem><MenuItem value={2004}>2004</MenuItem><MenuItem value={2005}>2005</MenuItem><MenuItem value={2006}>2006</MenuItem><MenuItem value={2007}>2007</MenuItem><MenuItem value={2008}>2008</MenuItem><MenuItem value={2009}>2009</MenuItem><MenuItem value={2010}>2010</MenuItem><MenuItem value={2011}>2011</MenuItem><MenuItem value={2012}>2012</MenuItem><MenuItem value={2013}>2013</MenuItem><MenuItem value={2014}>2014</MenuItem><MenuItem value={2015}>2015</MenuItem><MenuItem value={2016}>2016</MenuItem><MenuItem value={2017}>2017</MenuItem><MenuItem value={2018}>2018</MenuItem><MenuItem value={2019}>2019</MenuItem>
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


