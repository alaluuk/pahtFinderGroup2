const { db } = require("../pg-adaptor");
const { House } = require("./house");
const { Structure } = require("./structure");

class HouseStructure {
  static getMany() {
    return new Promise(function(resolve, reject) {
      db
        .many(`SELECT * FROM house_structures`)
        .then(res => {
          let house_structures = [];
          res.forEach(house_structure_data => {
            let house_structure = new HouseStructure(house_structure_data);
            house_structures.push(house_structure);
          });
          resolve(house_structures);
        })
        .catch(err => reject(err));
    });
  }

  static getManyByHouse(house_id) {
    return new Promise(function(resolve, reject) {
      db
        .many(`SELECT * FROM house_structures WHERE house_id=$1`, [ house_id ])
        .then(res => {
          let house_structures = [];
          res.forEach(house_structure_data => {
            let house_structure = new HouseStructure(house_structure_data);
            house_structures.push(house_structure);
          });
          resolve(house_structures);
        })
        .catch(err => reject(err));
    });
  }

  static getOne(id) {
    return new Promise(function(resolve, reject) {
      db
        .one(`SELECT * FROM house_structures WHERE id=$1`, [ id ])
        .then(res => {
          let house_structure = new HouseStructure(res);
          resolve(house_structure);
        })
        .catch(err => reject(err));
    });
  }

  constructor(data) {
    this._id = data.id;
    this._house_id = data.house_id;
    this._structure_id = data.structure_id;
    this._area = data.area;
  }

  get id() {
    return this._id;
  }

  set area(area) {
    this._area = area;
  }
  get area() {
    return this._area;
  }

  get house() {
    return House.getOne(this._house_id);
  }

  get structure() {
    return Structure.getOne(this._structure_id);
  }
}

exports.HouseStructure = HouseStructure;