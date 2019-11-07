const { db } = require("../pg-adaptor");
const { House, Structure } = require(".");

class HouseStructure {
  static getAny() {
    return new Promise(function(resolve, reject) {
      db
        .any(`SELECT * FROM house_structures`)
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

  static getAnyByHouse(house_id) {
    return new Promise(function(resolve, reject) {
      db
        .any(`SELECT * FROM house_structures WHERE house_id=$1`, [ house_id ])
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

  static create(house_id, structure_id, area = null) {
    return new Promise(function(resolve, reject) {
      db
        .one(`INSERT INTO house_structures(house_id, structure_id, area) VALUES ($1) RETURNING *`, [
          house_id, structure_id, area
        ])
        .then(res => {
          let house_structure = new HouseStructure(res);
          resolve(house_structure);
        })
        .catch(err => reject(err));
    });
  }

  save() {
    let house_structure = this;
    return new Promise(function(resolve, reject) {
      db
        .result(`UPDATE house_structures SET id=$1, house_id=$2, structure_id=$3, area=$4 WHERE id=$5`, [
          house_structure._id,
          house_structure._house_id,
          house_structure._structure_id,
          house_structure._area,
          house_structure._id
        ], r => r.rowCount)
        .then(res => {
          // TODO: Reload updated_at timestamp
          resolve((res > 0));
        })
        .catch(err => reject(err));
    });
  }

  static delete(id) {
    return new Promise(function(resolve, reject) {
      db
        .result(`DELETE FROM house_structures WHERE id=$1`, [ id ], r => r.rowCount)
        .then(res => {
          resolve((res > 0));
        })
        .catch(err => reject(err));
    });
  }

  delete() {
    return HouseStructure.delete(this._id);
  }

  constructor(data) {
    this._id = data.id;
    this._house_id = data.house_id;
    this._structure_id = data.structure_id;
    this._area = data.area;
    this._created_at = data.created_at;
    this._updated_at = data.updated_at;
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

  get createdAt() {
    return this._created_at.toISOString();
  }

  get updatedAt() {
    return this._updated_at.toISOString();
  }
}

exports.HouseStructure = HouseStructure;