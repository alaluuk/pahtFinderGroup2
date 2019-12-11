import React from "react";
import Chart from "react-apexcharts";
import { Button, Dialog, Classes, H5, H6, Icon, Tab, Tabs, NonIdealState, Text } from "@blueprintjs/core";
import "./styles.scss";

const segmentColors = {
  'A': '95, 194, 80',
  'B': '159, 200, 87',
  'C': '231, 207, 94',
  'D': '223, 207, 94',
  'E': '245, 146, 71',
  'F': '238, 102, 53'
};

class EfficiencyReportModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: props.isOpen || false,
      shownTab: 'recommendations',
      rankingChartOptions: {
        chart: {
          toolbar: { show: false },
          width: 75,
          height: 75
        },
        plotOptions: {
          radialBar: {
            size: 50,
            hollow: {
              margin: 0,
              size: '48px',
              background: 'rgba(255,0,0,0.2)',
              dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 1,
                opacity: 0.5
              }
            },
            dataLabels: { show: false, value: { show: false } }
          },
        },
        fill: { type: 'solid', colors: ['#1A73E8'] },
        stroke: { lineCap: 'round' },
        labels: ['Percentage']
      },
      rankingChartSeries: [this.props.structureTemplate.efficiencyReport.ranking.percentage.toFixed(2)],
      segmentationChartOptions: {
        chart: { toolbar: { show: false } },
        plotOptions: {
          bar: { horizontal: false, distributed: true, columnWidth: '30%', endingShape: 'flat' },
        },
        dataLabels: {
          enabled: false,
          formatter: function (val, opts) {
            return (val > 0) ? val : '';
          },
          style: {
            fontSize: '12px',
            colors: ["rgba(255,255,255,0.75)"]
          }
        },
        yaxis: { show: false },
        xaxis: {
          categories: this.props.structureTemplate.efficiencyReport.segmentation.map(segment => segment.label),
        },
        colors: [
          (this.props.structureTemplate.efficiencyReport.ranking.rankedSegment.label === 'A') ? 'rgb('+segmentColors['A']+')' : 'rgba('+segmentColors['A']+', .33)',
          (this.props.structureTemplate.efficiencyReport.ranking.rankedSegment.label === 'B') ? 'rgb('+segmentColors['B']+')' : 'rgba('+segmentColors['B']+', .33)',
          (this.props.structureTemplate.efficiencyReport.ranking.rankedSegment.label === 'C') ? 'rgb('+segmentColors['C']+')' : 'rgba('+segmentColors['C']+', .33)',
          (this.props.structureTemplate.efficiencyReport.ranking.rankedSegment.label === 'D') ? 'rgb('+segmentColors['D']+')' : 'rgba('+segmentColors['D']+', .33)',
          (this.props.structureTemplate.efficiencyReport.ranking.rankedSegment.label === 'E') ? 'rgb('+segmentColors['E']+')' : 'rgba('+segmentColors['E']+', .33)',
          (this.props.structureTemplate.efficiencyReport.ranking.rankedSegment.label === 'F') ? 'rgb('+segmentColors['F']+')' : 'rgba('+segmentColors['F']+', .33)',
        ],
        tooltip: {
          x: {
            formatter: function (val) {
              return 'Segment '+val;
            }
          },
          y: {
            formatter: function (val) {
              // return val.label + "(Count: " + val.count + ", From " + val.from + ", To " + val.to + ")";
              return val;
            }
          }
        }
      },
      segmentationChartSeries: [{
        name: 'Template count',
        data: this.props.structureTemplate.efficiencyReport.segmentation.map(segment => segment.count)
      }],
    };

    this.handleTabChange = this.handleTabChange.bind(this);
  }

  handleTabChange(tabId) {
    this.setState({ shownTab: tabId });
  }

  render() {
    return (
      <Dialog
        className="EfficiencyReportModal Modal"
        icon="timeline-area-chart"
        onOpening={this.reset}
        onClose={this.props.onClose || undefined}
        title="Energy Efficiency Report"
        {...this.state}
      >
        <div className={Classes.DIALOG_BODY}>
          <section className="header">
            <div className="ranking">
              <div
                className="rank"
                style={{
                  color: 'rgb('+segmentColors[this.props.structureTemplate.efficiencyReport.ranking.rankedSegment.label]+')',
                  borderColor: 'rgb('+segmentColors[this.props.structureTemplate.efficiencyReport.ranking.rankedSegment.label]+')',
                  backgroundColor: 'rgba('+segmentColors[this.props.structureTemplate.efficiencyReport.ranking.rankedSegment.label]+', .25)'
                }}
              >
                <span className="ranked-segment">{this.props.structureTemplate.efficiencyReport.ranking.rankedSegment.label}</span>
              </div>
              {/* <Chart
                options={this.state.rankingChartOptions}
                series={this.state.rankingChartSeries}
                type="radialBar"
                width="75"
                // height="75"
              /> */}
            </div>
            <div className="info">
              <H5>{this.props.structureTemplate.title}</H5>
              <H6>U-Value: {this.props.structureTemplate.uValue}, Price: {(this.props.structureTemplate.price) ? this.props.structureTemplate.price.toFixed(2)+' €' : 'N/A'}</H6>
              {
                (this.props.structureTemplate.efficiencyReport.ranking.percentage.toFixed(0) < 50) ?
                  <div
                    className="rankPercentage is-worse"
                    style={{
                      color: (this.props.structureTemplate.efficiencyReport.ranking.percentage.toFixed(0) >= 33.33) ? (this.props.structureTemplate.efficiencyReport.ranking.percentage.toFixed(0) >= 66.66) ? '#43bf4d' : '#f59247' : '#eb532d'
                    }}
                  ><Icon icon="trending-down" /> Energy Efficiency: {this.props.structureTemplate.efficiencyReport.ranking.percentage.toFixed(0)}% (#{this.props.structureTemplate.efficiencyReport.ranking.rank} / {this.props.structureTemplate.efficiencyReport.ranking.count})</div>
                  :
                  <div
                    className="rankPercentage is-better"
                    style={{
                      color: (this.props.structureTemplate.efficiencyReport.ranking.percentage.toFixed(0) >= 33.33) ? (this.props.structureTemplate.efficiencyReport.ranking.percentage.toFixed(0) >= 66.66) ? '#43bf4d' : '#f59247' : '#eb532d'
                    }}
                  ><Icon icon="pulse" /> Energy Efficiency: {this.props.structureTemplate.efficiencyReport.ranking.percentage.toFixed(0)}% (#{this.props.structureTemplate.efficiencyReport.ranking.rank} / {this.props.structureTemplate.efficiencyReport.ranking.count})</div>
              }
            </div>
          </section>
          <Tabs id="EfficiencyReportTabs" onChange={this.handleTabChange} selectedTabId={this.state.shownTab}>
            <Tab id="recommendations" title="Upgrade Recommendations" panel={<section className="EfficiencyReportRecommendations">
              <NonIdealState
                icon={<Icon icon="issue" iconSize="25" />}
                title="No upgrade recommendations found!"
                description={<Text className="bp3-text-muted">This template is either the best or the only template of its type.</Text>}
              />
            </section>} />
            <Tab id="segmentation" title="Efficiency Segmentation" panel={<section className="EfficiencyReportSegmentation">
              <H6>Efficiency Segmentation of type "{this.props.structureTemplate.type.title}":</H6>
              <Chart
                className="EfficiencyReportSegmentationChart bp3-card bp3-elevation-1"
                options={this.state.segmentationChartOptions}
                series={this.state.segmentationChartSeries}
                type="bar"
                height="150"
              />
            </section>} />
            <Tab id="raw" title="RAW JSON" panel={<pre>{ JSON.stringify(this.props.structureTemplate.efficiencyReport, null, 2) }</pre>} />
          </Tabs>
        </div>
        <div className={Classes.DIALOG_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            <Button
              onClick={this.props.onClose || undefined}
              disabled={this.state.isLoading}
            >Close</Button>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default EfficiencyReportModal;