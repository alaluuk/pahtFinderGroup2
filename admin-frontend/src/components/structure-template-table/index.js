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
      tblSortedBy: [ { id: 'rank', desc: false }, { id: 'title', desc: false } ],
    };

    this.fetchStructureTemplates = this.fetchStructureTemplates.bind(this);
  }

  fetchStructureTemplates(table) {
    console.log(table);
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, fetchError: null });
      // TODO: Fetch best/worst uvalue for whole category instead of generating reports for each structure template
      GraphQLClient.request(`
        query(
          $structureTypeID: String!,
          $pageSize: Int!,
          $page: Int!
        ) {
          structureTemplates(
            query: {
              filter: [{
                id: "type_id",
                type: EQUAL,
                value: $structureTypeID
              }],
              pagination: {
                pageSize: $pageSize,
                page: $page
              }
            }
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
        structureTypeID: this.state.structureType.id,
        pageSize: table.pageSize,
        page: table.page
      })
        .then(data => {
          this.setState({ structureTemplates: data.structureTemplates, tblPages: 1 }); // TODO: Set table pages
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
    // TODO: Error view
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
          Header: 'Serial Number',
          accessor: 'serialNumber'
        },
        {
          Header: 'Production Year',
          accessor: 'productionYear',
          width: 125
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
          Cell: cellInfo => (<EfficiencyIndicatorComponent uValue={cellInfo.row._original.uValue} percentage={cellInfo.row.energyEfficiency} />),
          filterable: false
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
        (this.state.isLoading !== true) ? <NonIdealState
          icon={<Icon icon="issue" iconSize="30" />}
          title="No structure templates found!"
          description={
            <Text className="bp3-text-muted">There are no structure templates of this type yet.</Text>
          }
        /> : null
      }
      onFetchData={this.fetchStructureTemplates}
      sorted={this.state.tblSortedBy}
      onSortedChange={(newSort, column) => { this.setState({ tblSortedBy: newSort }); }}
      filterable={this.props.filterable || false}
      minRows={0}
    />

    return <div className="StructureTemplateTable">{view}</div>;
  }
}

export default StructureTemplateTable;