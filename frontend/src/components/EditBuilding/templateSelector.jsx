import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


const GET_STRUCTURE_TEMPLATES = gql`
  query structureTemplates($houseID: ID!, $structureTypeID: ID!) {
    structureTemplates(houseID: $houseID, structureTypeID: $structureTypeID) {
        id
        title
        manufacturer
        productionYear
        uValue
        serialNumber
        price
        efficiencyReport{
          ranking{
            percentage
          }
        }
    }
  }
`;


export default function TemplateSelector(props) {
    const classes = useStyles();
    const handleChange = event => {

    };
    const { data, loading, error } = useQuery(GET_STRUCTURE_TEMPLATES, {
        fetchPolicy: "no-cache",
      });
    
      if (loading) return <p>Loading...</p>
      if (error) return `Error! ${error}`;

    return (
        <div>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Template</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}