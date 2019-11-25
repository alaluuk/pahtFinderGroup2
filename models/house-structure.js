const { db } = require("../pg-adaptor");
const { Structure, House } = require(".");

class HouseStructure extends Structure {
  static getAny() {
    // TODO: Implement sort[]/filter[]/pagination{}
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

  static create(house_id, title, type_id, u_value, area, manufacturer = null, serial_number = null, production_year = null) {
    return new Promise(function(resolve, reject) {
      db
        .one(`INSERT INTO house_structures(
          house_id,
          title,
          type_id,
          u_value,
          area,
          manufacturer,
          serial_number,
          production_year
        ) VALUES ($1) RETURNING *`, [
          house_id,
          title,
          type_id,
          u_value,
          area,
          manufacturer,
          serial_number,
          production_year
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
        .result(`UPDATE house_structures SET
          id=$1,
          house_id=$2,
          title=$3,
          type_id=$4,
          u_value=$5,
          area=$6,
          manufacturer=$7,
          serial_number=$8,
          production_year=$9
        WHERE id=$10`, [
          house_structure._id,
          house_structure._house_id,
          house_structure._title,
          house_structure._type_id,
          house_structure._u_value,
          house_structure._area,
          house_structure._manufacturer,
          house_structure._serial_number,
          house_structure._production_year,
          house_structure._id
        ])
        .then(res => {
          house_structure._updated_at = res.rows[0].updated_at;
          resolve((res.rowCount > 0));
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
    super(data);
    this._house_id = data.house_id;
  }

  get house() {
    return House.getOne(this._house_id);
  }
}

exports.HouseStructure = HouseStructure;