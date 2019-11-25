import React from "react";
import { Classes } from "@blueprintjs/core";
import "./styles.scss";

class EfficiencyIndicatorComponent extends React.Component {
  render() {
    return (
      <div className={ "EfficiencyIndicatorWrapper " + Classes.ELEVATION_1 } title={"U-value: "+this.props.uValue || undefined}>
        <div className="EfficiencyIndicatorContainer">
          <div className="EfficiencyIndicator">
            <div className="EfficiencyIndicatorMarker" style={{right: this.props.percentage+'%' || 0 }}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default EfficiencyIndicatorComponent;