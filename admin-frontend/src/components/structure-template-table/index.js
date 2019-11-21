import React from "react";
import GraphQLClient from "../../providers/graphql";
import EfficiencyIndicatorComponent from "../efficiency-indicator";
import { H5, Classes, NonIdealState, Spinner, Text, Icon, Intent } from "@blueprintjs/core";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./styles.scss";

class StructureTemplateTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initialLoaded: false,
      isLoading: false,
      fetchError: null,
      structureType: this.props.structureType || null, // TODO: Handle structureType null
      structureTemplates: [],
      tblPages: null,
      tblSortedBy: []
    };

    this.fetchStructureTemplates = this.fetchStructureTemplates.bind(this);
  }

  fetchStructureTemplates(table) {
    // TODO: Add page/sorted/filtered to query
    console.log(table);
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, fetchError: null });
      GraphQLClient.request(`
        query($structureTypeID: ID!) {
          structureTemplates(
            structureTypeID: $structureTypeID
          ) {
            id
            title
            uValue
            area
            manufacturer
            serialNumber
            productionYear
            efficiencyReport {
              ranking {
                overallPercentage
                overallRank
                overallCount
                rankedSegment {
                  label
                }
              }
              segmentation {
                label
                from
                to
                count
              }
            }
            createdAt
            updatedAt
          }
        }
      `, {
        structureTypeID: this.state.structureType.id
      })
        .then(data => {
          this.setState({ structureTemplates: data.structureTemplates });
          if(this.props.onFetchedData) this.props.onFetchedData(data);
          resolve(data.structureTemplates);
        })
        .catch(err => {
          this.setState({ fetchError: err });
          reject(err);
        })
        .finally(() => this.setState({ isLoading: false }));
    });
  }

  render() {
    let view;
    // if(this.state.isLoading) {
    //   view = (
    //     <NonIdealState
    //       icon={<Spinner size="30"></Spinner>}
    //       title="Fetching structure templates..."
    //       description={
    //         <Text className="bp3-text-muted">Please wait while the structure templates are getting loaded.</Text>
    //       }
    //     />
    //   );
    // } else if(this.state.fetchError) {
    //   view = (
    //     <NonIdealState
    //       icon={<Icon icon="issue" iconSize="30" intent={Intent.DANGER} />}
    //       title="Error while fetching the structure templates!"
    //       description={
    //         <Text className="bp3-text-muted">{
    //           (this.state.fetchError.response) ? this.state.fetchError.response.errors.map((err) => err.message+" ") : this.state.fetchError.message
    //         }</Text>
    //       }
    //     />
    //   );
    // } else if(this.state.structureTemplates.length === 0) {
    //   view= "TODO: Empty view";
    // } else {
      view = <ReactTable
        className={
          (this.state.isLoading ? 'is-loading' : '') +
          (this.state.structureTemplates.length === 0 ? ' has-no-data' : '')
        }
        columns={[
          {
            Header: 'Rank',
            id: 'rank',
            accessor: 'efficiencyReport.ranking.overallRank',
            width: 50
          },
          {
            Header: 'Title',
            accessor: 'title',
            width: 250
          },
          {
            Header: 'Manufacturer',
            accessor: 'manufacturer'
          },
          {
            Header: 'Production Year',
            accessor: 'productionYear',
            width: 125
          },
          {
            Header: 'Serial Number',
            accessor: 'serialNumber'
          },
          {
            Header: 'Area (m²)',
            accessor: 'area',
            width: 75
          },
          {
            Header: 'Energy Efficiency',
            id: 'energyEfficiency',
            accessor: 'efficiencyReport.ranking.overallPercentage',
            Cell: cellInfo => (<EfficiencyIndicatorComponent percentage={cellInfo.row.energyEfficiency} />)
          }
        ]}
        data={this.state.structureTemplates}
        manual
        pages={this.state.tblPages}
        loading={this.state.isLoading} 
        LoadingComponent={(props) =>
          (props.loading === true) ?
          <NonIdealState icon={<Spinner size="30"></Spinner>} /> : ''
        }
        NoDataComponent={(props) =>
          <NonIdealState
            icon={<Icon icon="issue" iconSize="30" intent={Intent.DANGER} />}
            title="No structure templates found!"
            description={
              <Text className="bp3-text-muted">There are no structure templates of this type yet.</Text>
            }
          />
        }
        onFetchData={this.fetchStructureTemplates}
        sorted={this.state.tblSortedBy}
        onSortedChange={(newSort, column) => { this.setState({ tblSortedBy: newSort }); }}
        defaultSorted={[ { id: 'rank', desc: false }, { id: 'title', desc: false } ]}
        minRows={0}
      />
    // }

    return <div className="StructureTemplateTable">{view}</div>;
  }
}

export default StructureTemplateTable;