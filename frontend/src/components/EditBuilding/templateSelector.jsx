import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const GET_STRUCTURE_TEMPLATES = gql`
query(
    $id: String!,
    $type: QueryFilterType!,
    $value: String!,
    $pageSize: Int!,
    $page: Int!
  ) {
    structureTemplates(
      query: {
        filter: {
            id: $id,
            type: $type,
            value: $value
        }
        pagination: {
          pageSize: $pageSize,
          page: $page
        }
      }
    ) {
        id
        title
        type {
            title
            id
        }
        uValue
        price
        manufacturer
        serialNumber
        productionYear
    }
  }
`;

{/* Return drop down selector with matching construction templates to choose from */ }
export default function TemplateSelector(props) {
    const [templates, setTemplates] = React.useState("u");
    const [templateCounter, setTemplateCounter] = React.useState(0);
    const classes = useStyles();
    const id = "type_id"
    const type = "EQUAL";
    const [value] = React.useState(props.typeId);
    const pageSize = 5;
    const page = 1;

    //send selected template to parent component
    const handleChange = event => {
        setTemplates(event.target.value);
        props.callbackFromParent(event.target.value)
    };
    //fetch structure templates
    const { data, loading, error } = useQuery(GET_STRUCTURE_TEMPLATES, {
        variables: { id, type, value, pageSize, page }
    });

    if (loading) return <p>Loading...</p>
    if (error) return `Error! ${error}`;
    if (data) console.log("Templates received", data)

    {/* Return no selector if there are no matching templates*/ }
    if (!data.structureTemplates[0]) { return "" }



    return (
        <form className={classes.container}>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Template</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    onChange={handleChange}
                >
                    {data.structureTemplates.map((structureTemplate) => (
                        <MenuItem value={structureTemplate}>{structureTemplate.title}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </form>
    );
}