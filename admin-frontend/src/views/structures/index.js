import React from "react";
import GraphQLClient from "../../providers/graphql";
import HeaderComponent from "../../components/header";
import FilterableSubheaderComponent from "../../components/filterable-subheader";
import StructureTypeCard from "../../components/structure-type-card";
import "./styles.scss";

class StructuresView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      fetchError: null,
      structureTypes: []
    };

    this.fetchStructureTypes = this.fetchStructureTypes.bind(this);
  }

  componentDidMount() {
    this.fetchStructureTypes();
  }

  fetchStructureTypes() {
    return new Promise((resolve, reject) => {
      this.setState({ isLoading: true, fetchError: null });
      GraphQLClient.request(`
        query {
          structureTypes {
            id
            title
            createdAt
            updatedAt
          }
        }
      `)
        .then(data => {
          this.setState({ structureTypes: data.structureTypes });
          resolve(data.structureTypes);
        })
        .catch(err => {
          this.setState({ fetchError: err });
          reject(err);
        })
        .finally(() => this.setState({ isLoading: false }));
    });
  }

  render() {
    return (
      <div className="StructuresView">
        <HeaderComponent user={this.props.user} />
        <FilterableSubheaderComponent
          heading="Structure Templates"
          primaryIcon="new-layers"
          primaryText="New Structure Template"
          primaryOnClick={() => { this.setState({ isUserCreateModalOpen: true }) }}
        />
        <div className="content-wrapper">
          {this.state.structureTypes.map(structureType =>
            <StructureTypeCard structureType={structureType} key={structureType.id} />
          )}
        </div>
      </div>
    );
  }
}

export default StructuresView;