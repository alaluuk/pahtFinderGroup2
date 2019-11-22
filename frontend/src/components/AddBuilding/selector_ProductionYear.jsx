import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function SimpleSelect() {
  const [year, setYears] = React.useState('');

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = event => {
    setYears(event.target.value);
  };

  
  
  return (
    <div>
      <FormControl variant="outlined" className="simpleSelector">
        <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
          Production Year
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={year}
          onChange={handleChange}
          labelWidth={labelWidth}
        >
          
          <MenuItem value={"2001"}>2001</MenuItem>
          

        

          
        </Select>
      </FormControl>
    </div> 
  );
}

