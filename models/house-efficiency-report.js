const { db } = require("../pg-adaptor");
const { House, HouseStructure, StructureTemplate } = require(".");

class HouseEfficiencyReport {
  constructor(house) {
    this.house = house;
  }

  calculateCostOfHeating(uValue, price) {
    // TODO: Improve heating cost calculation
    if(uValue === null || price === null) return null;
    return uValue * price;
  }

  calculatePercentage(uValue, best, worst) {
    let range = worst - best;
    let difference = uValue - best;
    let percentage = (range > 0) ? (1 - (difference / range)) * 100 : 100;
    return Math.min(Math.max(percentage, 0), 100);
  }

  async generate() {
    let houseStructures = await HouseStructure.getAnyByHouse(this.house.id);

    let results = {
      total: {
        structuresCount: 0,
        percentage: null,
        uValue: null,
        possibleUValue: null,
        costOfHeating: null,
        possibleCostOfHeating: null
      },
      typeSpecific: []
    };

    let calculationCache = {};
    for (let i = 0; i < houseStructures.length; i++) {
      const houseStructure = houseStructures[i];
      results.total.structuresCount++;
      if(!calculationCache.hasOwnProperty(houseStructure._type_id)) {
        const houseStructureType = await houseStructure.type;
        calculationCache[houseStructure._type_id] = {
          type: houseStructureType,
          mostEfficientTemplate: await this.getMostEfficientOfType(houseStructure._type_id),
          leastEfficientTemplate: await this.getLeastEfficientOfType(houseStructure._type_id),
          structuresCount: 0,
          percentageSum: 0,
          actualUValue: 0,
          possibleUValue: null,
          costOfHeating: null
        };
      }

      calculationCache[houseStructure._type_id].structuresCount++;

      calculationCache[houseStructure._type_id].actualUValue += houseStructure.uValue;

      var houseStructurePossibleUValue = null;
      if(calculationCache[houseStructure._type_id].mostEfficientTemplate !== null) {
        houseStructurePossibleUValue = calculationCache[houseStructure._type_id].mostEfficientTemplate.uValue;
        calculationCache[houseStructure._type_id].possibleUValue += houseStructurePossibleUValue;
      }
      
      let houseStructurePercentage = this.calculatePercentage(
        houseStructure.uValue,
        (calculationCache[houseStructure._type_id].mostEfficientTemplate) ? calculationCache[houseStructure._type_id].mostEfficientTemplate.uValue : 0,
        (calculationCache[houseStructure._type_id].leastEfficientTemplate) ? calculationCache[houseStructure._type_id].leastEfficientTemplate.uValue : 0
      );
      calculationCache[houseStructure._type_id].percentageSum += houseStructurePercentage;
    }

    var totalPercentageSum = 0;
    Object.keys(calculationCache).forEach(typeId => {
      const typeCache = calculationCache[typeId];
      const typePercentage = Math.min(Math.max(typeCache.percentageSum / typeCache.structuresCount, 0), 100);
      const typeCostOfHeating = this.calculateCostOfHeating(typeCache.actualUValue, this.house.costOfHeating);
      const typePossibleCostOfHeating = (typePercentage < 100) ? this.calculateCostOfHeating(typeCache.possibleUValue, this.house.costOfHeating) : typeCostOfHeating;
      totalPercentageSum += typePercentage;
      results.typeSpecific.push({
        type: typeCache.type,
        structuresCount: typeCache.structuresCount,
        percentage: typePercentage,
        uValue: typeCache.actualUValue,
        possibleUValue: typeCache.possibleUValue,
        costOfHeating: typeCostOfHeating,
        possibleCostOfHeating: typePossibleCostOfHeating,
      });
      if(typeCache.uValue !== null) {
        results.total.uValue += typeCache.actualUValue;
        results.total.possibleUValue += typeCache.possibleUValue;
      }
      if(typeCostOfHeating !== null) {
        results.total.costOfHeating += typeCostOfHeating;
        results.total.possibleCostOfHeating += typePossibleCostOfHeating;
      }
    });
    if(results.total.structuresCount > 0) results.total.percentage = (totalPercentageSum / Object.keys(calculationCache).length);

    return results;
  }

  async getMostEfficientOfType(typeId) {
    return db
    .oneOrNone(`SELECT * FROM structure_templates WHERE type_id = $1 ORDER BY u_value ASC LIMIT 1`, [ typeId ])
    .then(res => (res !== null) ? new StructureTemplate(res) : null)
    .catch(err => null);
  }

  async getLeastEfficientOfType(typeId) {
    return db
      .oneOrNone(`SELECT * FROM structure_templates WHERE type_id = $1 ORDER BY u_value DESC LIMIT 1`, [ typeId ])
      .then(res => (res !== null) ? new StructureTemplate(res) : null)
      .catch(err => null);
  }
}

exports.HouseEfficiencyReport = HouseEfficiencyReport;

House.prototype.efficiencyReport = function() {
  return new Promise((resolve, reject) => {
    let report = new HouseEfficiencyReport(this);
    report.generate()
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
}