const { db } = require("../pg-adaptor");
const { StructureType } = require(".");

class StructureTemplate {
  static getAny(sort = null, limit = 0, skip = 0) {
    let sortableFields = [
      { fieldName: 'u_value', orderBy: ['ASC', 'DESC'] }
    ];

    return new Promise(function(resolve, reject) {
      let querySuffix = '';
      if(sort !== null) {
        let sortableField = sortableFields.find(f => f.fieldName === sort.fieldName);
        if(sortableField !== undefined) {
          if(sortableField.orderBy.includes(sort.orderBy)) {
            querySuffix += ' ORDER BY '+sort.fieldName+' '+sort.orderBy;
          } else {
            reject(new Error('Cannot sort the field "'+sort.fieldName+'" in "'+sort.orderBy+'" order.'));
          }
        } else {
          reject(new Error('"'+sort.fieldName+'" is no valid field to sort by.'));
        }
      }
      if(limit > 0) querySuffix += ' LIMIT '+limit;
      if(skip > 0) querySuffix += ' SKIP '+skip;
      db
        .any(`SELECT * FROM structure_templates`)
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

  static create(title, type_id, u_value = null, area = null, manufacturer = null, serial_number = null, production_year = null) {
    return new Promise(function(resolve, reject) {
      db
        .one(`INSERT INTO structure_templates(
            title,
            type_id,
            u_value,
            area,
            manufacturer,
            serial_number,
            production_year
          ) VALUES ($1) RETURNING *`, [
            title,
            type_id,
            u_value,
            area,
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
          area=$5,
          manufacturer=$6,
          serial_number=$7,
          production_year=$8
        WHERE id=$9`, [
          structure._id,
          structure._title,
          structure._type_id,
          structure._u_value,
          structure._area,
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
    this._id = data.id;
    this._title = data.title;
    this._type_id = data.type_id;
    this._u_value = data.u_value;
    this._area = data.area;
    this._manufacturer = data.manufacturer;
    this._serial_number = data.serial_number;
    this._production_year = data.production_year;
    this._created_at = data.created_at;
    this._updated_at = data.updated_at;
  }

  get id() {
    return this._id;
  }

  set title(title) {
    this._title = title;
  }
  get title() {
    return this._title;
  }

  get type() {
    return StructureType.getOne(this._type_id);
  }

  set uValue(u_value) {
    this._u_value = u_value;
  }
  get uValue() {
    return this._u_value;
  }

  set area(area) {
    this._area = area;
  }
  get area() {
    return this._area;
  }

  set manufacturer(manufacturer) {
    this._manufacturer = manufacturer;
  }
  get manufacturer() {
    return this._manufacturer;
  }

  set serialNumber(serialNumber) {
    this._serial_number = serialNumber;
  }
  get serialNumber() {
    return this._serial_number;
  }

  set productionYear(productionYear) {
    this._production_year = productionYear;
  }
  get productionYear() {
    return this._production_year;
  }

  get createdAt() {
    return this._created_at.toISOString();
  }

  get updatedAt() {
    return this._updated_at.toISOString();
  }
}

exports.StructureTemplate = StructureTemplate;