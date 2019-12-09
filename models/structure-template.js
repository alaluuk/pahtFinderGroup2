const { db } = require("../pg-adaptor");
const { APIQuery, Structure } = require(".");

class StructureTemplate extends Structure {
  static getAny(query = null) {
    return new Promise(function(resolve, reject) {
      let suffix = (query !== null) ? query.constructSuffix() : { query: '', fields: '' };
      db
        .any(`SELECT *`+suffix.fields+` FROM structure_templates`+suffix.query)
        .then(res => {
          query.checkResults(res);
          let structure_templates = [];
          res.forEach(structure_data => {
            let structure = new StructureTemplate(structure_data);
            structure_templates.push(structure);
          });
          resolve(structure_templates);
        })
        .catch(err => reject(err));
    });
  }

  static getAnyByType(structure_type_id) {
    return new Promise(function(resolve, reject) {
      db
        .any(`SELECT * FROM structure_templates WHERE type_id=$1`, [ structure_type_id ])
        .then(res => {
          let structure_templates = [];
          res.forEach(structure_data => {
            let structure = new StructureTemplate(structure_data);
            structure_templates.push(structure);
          });
          resolve(structure_templates);
        })
        .catch(err => reject(err));
    });
  }

  static getOne(id) {
    return new Promise(function(resolve, reject) {
      db
        .one(`SELECT * FROM structure_templates WHERE id=$1`, [ id ])
        .then(res => {
          let structure = new StructureTemplate(res);
          resolve(structure);
        })
        .catch(err => reject(err));
    });
  }

  static create(title, type_id, u_value, price = null, manufacturer = null, serial_number = null, production_year = null) {
    return new Promise(function(resolve, reject) {
      db
        .one(`INSERT INTO structure_templates(
            title,
            type_id,
            u_value,
            price,
            manufacturer,
            serial_number,
            production_year
          ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [
            title,
            type_id,
            u_value,
            price,
            manufacturer,
            serial_number,
            production_year
        ])
        .then(res => {
          let structure = new StructureTemplate(res);
          resolve(structure);
        })
        .catch(err => reject(err));
    });
  }

  save() {
    let structure = this;
    return new Promise(function(resolve, reject) {
      db
        .result(`UPDATE structure_templates SET
          id=$1,
          title=$2,
          type_id=$3,
          u_value=$4,
          price=$5,
          manufacturer=$6,
          serial_number=$7,
          production_year=$8
        WHERE id=$9 RETURNING *`, [
          structure._id,
          structure._title,
          structure._type_id,
          structure._u_value,
          structure._price,
          structure._manufacturer,
          structure._serial_number,
          structure._production_year,
          structure._id
        ])
        .then(res => {
          structure._updated_at = res.rows[0].updated_at;
          resolve((res.rowCount > 0));
        })
        .catch(err => reject(err));
    });
  }

  static delete(id) {
    return new Promise(function(resolve, reject) {
      db
        .result(`DELETE FROM structure_templates WHERE id=$1`, [ id ], r => r.rowCount)
        .then(res => {
          resolve((res > 0));
        })
        .catch(err => reject(err));
    });
  }

  delete() {
    return StructureTemplate.delete(this._id);
  }

  constructor(data) {
    super(data);
  }
}

exports.StructureTemplate = StructureTemplate;