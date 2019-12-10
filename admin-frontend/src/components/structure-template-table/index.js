import React from "react";
import { withRouter } from "react-router-dom";
import GraphQLClient from "../../providers/graphql";
import EfficiencyIndicatorComponent from "../efficiency-indicator";
import { NonIdealState, Spinner, Text, Icon, Intent, Button, Menu, Popover, Position } from "@blueprintjs/core";
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
      structureTemplates: [],
      tblPages: null,
      tblSortedBy: [ { id: 'u_value', desc: false }, { id: 'title', desc: false } ],
      showPagination: false
    };

    this.table = React.createRef();

    this.fetchStructureTemplates = this.fetchStructureTemplates.bind(this);
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }

  fetchStructureTemplates(table = null) {
    if(!table) table = this.table.current.state;
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, fetchError: null });
      // IDEA: Fetch best/worst uvalue for whole category instead of generating reports for each structure template
      let filter = [
        {
          id: "type_id",
          type: "EQUAL",
          value: this.props.structureType.id
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
            type {
              id
            }
            uValue
            price
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
          this.setState({
            structureTemplates: data.structureTemplates,
            showPagination: this.table.current && data.structureTemplates.length > 4, // TODO: Get total count from pagination and not result count | this.table.current.state.pageSize
            tblPages: 1 // TODO: Set table pages
          });
          resolve(data.structureTemplates);
        })
        .catch(err => {
          this.setState({ fetchError: err });
          reject(err);
        })
        .finally(() => this.setState({ isLoading: false }));
    });
  }

  onEditClick(structureTemplate) {
    this.props.history.replace(this.props.match.url+'/edit-template/'+structureTemplate.id, { structureTemplate: structureTemplate });
  }

  onDeleteClick(structureTemplate) {
    this.props.history.replace(this.props.match.url+'/delete-template/'+structureTemplate.id, { structureTemplate: structureTemplate });
  }

  render() {
    let view;
    // TODO: Error view
    view = <ReactTable
      ref={this.table}
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
          id: 'price',
          Header: 'Price (€)',
          accessor: 'price',
          width: 75,
          filterable: false,
          Cell: cellInfo => (cellInfo.row.price) ? cellInfo.row.price.toFixed(2)+' €' : '',
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
        },
        {
          id: 'actions',
          Header: 'Actions',
          accessor: 'id',
          Cell: cellInfo => (
            <Popover content={
              <Menu>
                <Menu.Item
                  icon="edit" 
                  text="Edit template"
                  onClick={() => this.onEditClick(cellInfo.row._original)}
                />
                <Menu.Divider />
                <Menu.Item
                  icon="trash" 
                  text="Delete template"
                  intent={Intent.DANGER}
                  onClick={() => this.onDeleteClick(cellInfo.row._original)}
                />
              </Menu>
            } position={Position.BOTTOM_RIGHT}>
              <Button icon="more" minimal="true" />
            </Popover>
          ),
          width: 40,
          filterable: false,
          sortable: false
        }
      ]}
      data={this.state.structureTemplates}
      manual
      pages={this.state.tblPages}
      defaultPageSize={5}
      showPagination={this.state.showPagination}
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
              onClick={this.props.onCreateClick || undefined}
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

export default withRouter(StructureTemplateTable);