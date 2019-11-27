import React from "react";
import GraphQLClient from "../../providers/graphql";
import EfficiencyIndicatorComponent from "../efficiency-indicator";
import { NonIdealState, Spinner, Text, Icon, Intent, Button } from "@blueprintjs/core";
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
      tblSortedBy: [ { id: 'u_value', desc: false }, { id: 'title', desc: false } ],
    };

    this.fetchStructureTemplates = this.fetchStructureTemplates.bind(this);
  }

  fetchStructureTemplates(table) {
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, fetchError: null });
      // IDEA: Fetch best/worst uvalue for whole category instead of generating reports for each structure template
      let filter = [
        {
          id: "type_id",
          type: "EQUAL",
          value: this.state.structureType.id
        }
      ];
      table.filtered.forEach(tblFilter => {
        filter.push({
          id: tblFilter.id,
          type: "LIKE",
          value: tblFilter.value
        });
      });
      GraphQLClient.request(`
        query(
          $filter: [QueryFilter],
          $sort: [QuerySort],
          $pageSize: Int!,
          $page: Int!
        ) {
          structureTemplates(
            query: {
              filter: $filter,
              sort: $sort,
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
        filter: filter,
        sort: table.sorted,
        pageSize: table.pageSize,
        page: table.page
      })
        .then(data => {
          if(this.props.onFetchedData) this.props.onFetchedData(data.structureTemplates.length); // TODO: Update to real total count (-> pagination)
          this.setState({ structureTemplates: data.structureTemplates, tblPages: 1 }); // TODO: Set table pages
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
          width: 50,
          filterable: false,
          sortable: false
        },
        {
          id: 'title',
          Header: 'Title',
          accessor: 'title',
          width: 250
        },
        {
          id: 'manufacturer',
          Header: 'Manufacturer',
          accessor: 'manufacturer'
        },
        {
          id: 'serial_number',
          Header: 'Serial Number',
          accessor: 'serialNumber'
        },
        {
          id: 'production_year',
          Header: 'Production Year',
          accessor: 'productionYear',
          width: 125,
          filterable: false
        },
        {
          id: 'area',
          Header: 'Area (m²)',
          accessor: 'area',
          width: 75,
          filterable: false
        },
        {
          id: 'u_value',
          Header: 'U-Value',
          accessor: 'uValue',
          width: 75,
          filterable: false
        },
        {
          id: 'energyEfficiency',
          Header: 'Energy Efficiency',
          accessor: 'efficiencyReport.ranking.overallPercentage',
          Cell: cellInfo => (<EfficiencyIndicatorComponent uValue={cellInfo.row._original.uValue} percentage={cellInfo.row.energyEfficiency} />),
          filterable: false,
          sortable: false
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
        // TODO: Differentiate between no data and no search results
        (this.state.isLoading !== true) ? <NonIdealState
          icon={<Icon icon="issue" iconSize="30" />}
          title="No structure templates found!"
          description={
            <Text className="bp3-text-muted">There are no structure templates of this type yet.</Text>
          }
          action={
            <Button
              icon="new-layers"
              intent={Intent.SUCCESS}
              onClick={this.props.handleNewTemplateModal || undefined}
            >Create a new template</Button>
          }
        /> : null
      }
      onFetchData={this.fetchStructureTemplates}
      sorted={this.state.tblSortedBy}
      onSortedChange={(newSort, column) => { this.setState({ tblSortedBy: newSort }); }}
      filterable={this.props.filterable || false}
      minRows={(this.state.structureTemplates.length === 0) ? 5 : 0}
    />

    return <div className="StructureTemplateTable">{view}</div>;
  }
}

export default StructureTemplateTable;