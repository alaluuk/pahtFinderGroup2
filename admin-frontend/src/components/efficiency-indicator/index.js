import React from "react";
import { Classes } from "@blueprintjs/core";
import "./styles.scss";

class EfficiencyIndicatorComponent extends React.Component {
  render() {
    return (
      <div className={ "EfficiencyIndicatorWrapper " + Classes.ELEVATION_1 } style={{width: "150px"}}>
        <div className="EfficiencyIndicator">
          <div className="EfficiencyIndicatorMarker" style={{right: this.props.percentage+'%' || 0 }}></div>
        </div>
      </div>
    );
  }
}

export default EfficiencyIndicatorComponent;