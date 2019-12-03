const { db } = require("../pg-adaptor");
const { Structure, StructureTemplate } = require(".");

// IDEA: Add a caching mechanism for the generated reports
// class EfficiencyReportCache {
//   constructor() {
//     console.log("cache init");
//     this.cache = {};
//     // this.cacheMeta = {};
//   }

//   addEntry(key, value) {
//     console.log("cache add: ", key);
//     this.cache[key] = value;
//     // this.cacheMeta[key] = { fetchDate: new Date() };
//   }

//   getEntry(key) {
//     return new Promise((resolve, reject) => {
//       if(this.cache.hasOwnProperty(key)) {
//         console.log("cache hit: ", key);
//         resolve(this.cache[key]);
//       } else {
//         console.log("cache miss: ", key);
//         reject();
//       }
//     });
//   }

//   removeEntry(key) {
//     delete this.cache[key];
//     // delete this.cacheMeta[key];
//   }
// }
// let reportCache = new EfficiencyReportCache();

class EfficiencyReport {
  constructor(structure) {
    // TODO: Add option to specify report type (short/in-depth) so house reports are more performant
    this.structure = structure;
    
  }

  async generate() {
    let report = {};

    report.bestOfType = await this.getBestOfType();
    report.worstOfType = await this.getWorstOfType();
    report.segmentation = await this.getSegmentation(report.bestOfType.uValue, report.worstOfType.uValue);
    report.ranking = await this.getRanking(report.bestOfType.uValue, report.worstOfType.uValue, report.segmentation);

    return report;
  }

  async getBestOfType() {
    // return new Promise((resolve, reject) => {
    //   const cacheKey = 'best-of-type-'+this.structure._type_id;
    //   reportCache.getEntry(cacheKey)
    //     .then(res => resolve(res))
    //     .catch(() => {
    //       db
    //       .one(`SELECT * FROM structure_templates WHERE type_id = $1 ORDER BY u_value ASC LIMIT 1`, [ this.structure._type_id ])
    //       .then(res => {
    //         let structureTemplate = new StructureTemplate(res);
    //         reportCache.addEntry(cacheKey, structureTemplate);
    //         resolve(structureTemplate);
    //       })
    //       .catch(err => reject(err));
    //     })
    // });
    return db
    .one(`SELECT * FROM structure_templates WHERE type_id = $1 ORDER BY u_value ASC LIMIT 1`, [ this.structure._type_id ])
    .then(res => new StructureTemplate(res));
  }

  async getWorstOfType() {
    return db
      .one(`SELECT * FROM structure_templates WHERE type_id = $1 ORDER BY u_value DESC LIMIT 1`, [ this.structure._type_id ])
      .then(res => new StructureTemplate(res));
  }

  async getSegmentation(bestUValue, worstUValue, segmentCount = 6, segmentLabels = ["A", "B", "C", "D", "E", "F"]) {
    let uValueDifference = worstUValue - bestUValue;
    let segmentStepSize = uValueDifference / segmentCount;
    let segments = [];
    for (let i = 0; i < segmentCount; i++) {
      let segment = {
        label: segmentLabels[i],
        from: bestUValue+(segmentStepSize*i),
        to: bestUValue+(segmentStepSize*(i+1))
      };
      segment.count = (segmentStepSize <= 0) ? ((i === 0) ? 1 : 0) : await db.one(`SELECT COUNT(DISTINCT id) AS count FROM structure_templates WHERE type_id = $1 AND u_value BETWEEN $2 AND $3`, [ this.structure._type_id, segment.from, segment.to ]).then(res => res.count);
      segments.push(segment);
    }
    return segments;
  }

  async getRanking(bestUValue, worstUValue, segmentation) {
    let uValueRange = worstUValue - bestUValue;
    let uValueDifference = this.structure.uValue - bestUValue;
    let segment = null;
    for (let i = 0; i < segmentation.length; i++) {
      if(
        this.structure.uValue >= segmentation[i].from &&
        this.structure.uValue <= segmentation[i].to
      ) {
        segment = segmentation[i];
        break;
      }
    }
    return {
      overallPercentage: (uValueRange > 0) ? (1 - (uValueDifference / uValueRange)) * 100 : 100,
      overallRank: await db.one(`SELECT COUNT(DISTINCT id) AS count FROM structure_templates WHERE type_id = $1 AND u_value < $2`, [ this.structure._type_id, this.structure.uValue ]).then(res => parseInt(res.count)+1),
      overallCount: await db.one(`SELECT COUNT(DISTINCT id) AS count FROM structure_templates WHERE type_id = $1`, [ this.structure._type_id ]).then(res => res.count),
      rankedSegment: segment
    };
  }
}

exports.EfficiencyReport = EfficiencyReport;

Structure.prototype.efficiencyReport = function() {
  return new Promise((resolve, reject) => {
    let report = new EfficiencyReport(this);
    report.generate()
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}