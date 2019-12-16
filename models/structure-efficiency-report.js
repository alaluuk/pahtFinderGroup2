const { db } = require("../pg-adaptor");
const { Structure, StructureTemplate } = require(".");

// IDEA: Add a caching mechanism for the generated reports
// class StructureEfficiencyReportCache {
//   constructor() {
//     console.log("cache init");
//     this.cache = {};
//     // this.cacheMeta = {};
//   }
//
//   addEntry(key, value) {
//     console.log("cache add: ", key);
//     this.cache[key] = value;
//     // this.cacheMeta[key] = { fetchDate: new Date() };
//   }
//
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
//
//   removeEntry(key) {
//     delete this.cache[key];
//     // delete this.cacheMeta[key];
//   }
// }
// let reportCache = new StructureEfficiencyReportCache();
//
// async getMostEfficientOfType() {
//   return new Promise((resolve, reject) => {
//     const cacheKey = 'best-of-type-'+this.structure._type_id;
//     reportCache.getEntry(cacheKey)
//       .then(res => resolve(res))
//       .catch(() => {
//         db
//         .one(`SELECT * FROM structure_templates WHERE type_id = $1 ORDER BY u_value ASC LIMIT 1`, [ this.structure._type_id ])
//         .then(res => {
//           let structureTemplate = new StructureTemplate(res);
//           reportCache.addEntry(cacheKey, structureTemplate);
//           resolve(structureTemplate);
//         })
//         .catch(err => reject(err));
//       })
//   });
// }

class StructureEfficiencyReport {
  constructor(structure) {
    // IDEA: Add option to specify report type (short/in-depth) so house reports are more performant
    this.structure = structure;
  }

  async generate() {
    this.mostEfficientOfType = await this.getMostEfficientOfType();
    this.leastEfficientOfType = await this.getLeastEfficientOfType();

    this.segmentation = await this.getSegmentation();
    this.ranking = await this.getRanking();
    this.recommendations = await this.getUpgradeRecommendations();

    return {
      mostEfficientOfType: this.mostEfficientOfType,
      leastEfficientOfType: this.leastEfficientOfType,
      segmentation: this.segmentation,
      ranking: this.ranking,
      recommendations: this.recommendations
    };
  }

  async getMostEfficientOfType() {
    return db
    .oneOrNone(`SELECT * FROM structure_templates WHERE type_id = $1 ORDER BY u_value ASC LIMIT 1`, [ this.structure._type_id ])
    .then(res => (res !== null) ? new StructureTemplate(res) : null)
    .catch(err => null);
  }

  async getLeastEfficientOfType() {
    return db
      .oneOrNone(`SELECT * FROM structure_templates WHERE type_id = $1 ORDER BY u_value DESC LIMIT 1`, [ this.structure._type_id ])
      .then(res => (res !== null) ? new StructureTemplate(res) : null)
      .catch(err => null);
  }

  async getSegmentation(segmentCount = 6, segmentLabels = ["A", "B", "C", "D", "E", "F"]) {
    let bestUValue = (this.mostEfficientOfType) ? this.mostEfficientOfType.uValue : 0;
    let worstUValue = (this.leastEfficientOfType) ? this.leastEfficientOfType.uValue : 0;
    let uValueDifference = worstUValue - bestUValue;
    let segmentStepSize = uValueDifference / segmentCount;
    let segments = [];
    for (let i = 0; i < segmentCount; i++) {
      let segment = {
        label: segmentLabels[i],
        from: bestUValue+(segmentStepSize*i)+((i === 0) ? 0 : 0.0001),
        to: bestUValue+(segmentStepSize*(i+1))
      };
      segment.count = (segmentStepSize <= 0) ? ((i === 0) ? 1 : 0) : await db.one(`SELECT COUNT(DISTINCT id) AS count FROM structure_templates WHERE type_id = $1 AND u_value BETWEEN $2 AND $3`, [ this.structure._type_id, segment.from, segment.to ]).then(res => res.count);
      segments.push(segment);
    }
    return segments;
  }

  calculatePercentage(uValue) {
    let best = (this.mostEfficientOfType) ? this.mostEfficientOfType.uValue : 0;
    let worst = (this.leastEfficientOfType) ? this.leastEfficientOfType.uValue : 0;
    let range = worst - best;
    let difference = uValue - best;
    let percentage = (range > 0) ? (1 - (difference / range)) * 100 : 100;
    return Math.min(Math.max(percentage, 0), 100);
  }

  async getRanking() {
    let percentage = this.calculatePercentage(this.structure.uValue);
    let segmentation = (this.segmentation) ? this.segmentation : [];
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
      percentage: percentage,
      rank: await db.one(`SELECT COUNT(DISTINCT u_value) AS count FROM structure_templates WHERE type_id = $1 AND u_value < $2`, [ this.structure._type_id, this.structure.uValue ]).then(res => parseInt(res.count)+1),
      count: await db.one(`SELECT COUNT(DISTINCT u_value) AS count FROM structure_templates WHERE type_id = $1`, [ this.structure._type_id ]).then(res => res.count),
      rankedSegment: segment
    };
  }

  async getUpgradeRecommendations(limit = 3) {
    let recommendations = [];
    let results = await db.any(`SELECT *, (price / (u_value - $1)) AS price_performance_ratio FROM structure_templates WHERE type_id = $2 AND u_value < $3 ORDER BY price_performance_ratio DESC LIMIT $4`, [
      this.structure.uValue,
      this.structure._type_id,
      this.structure.uValue,
      limit
    ]);
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      let upgradeTemplate = new StructureTemplate(result);

      recommendations.push({
        upgradePrice: upgradeTemplate.price,
        upgradeUValue: upgradeTemplate.uValue - this.structure.uValue,
        upgradePercentage: this.calculatePercentage(upgradeTemplate.uValue) - this.calculatePercentage(this.structure.uValue),
        // updgradeCostOfHeating: TODO
        upgradePPR: (result.price_performance_ratio),
        structureTemplate: upgradeTemplate
      });
    }
    return recommendations;
  }
}

exports.StructureEfficiencyReport = StructureEfficiencyReport;

Structure.prototype.efficiencyReport = function() {
  return new Promise((resolve, reject) => {
    let report = new StructureEfficiencyReport(this);
    report.generate()
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}