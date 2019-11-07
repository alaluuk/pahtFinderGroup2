const { db } = require("../pg-adaptor");

class StructureType {
  static getAny() {
    return new Promise(function(resolve, reject) {
      db
        .any(`SELECT * FROM structure_types`)
        .then(res => {
          let structure_types = [];
          res.forEach(structure_type_data => {
            let structure_type = new StructureType(structure_type_data);
            structure_types.push(structure_type);
          });
          resolve(structure_types);
        })
        .catch(err => reject(err));
    });
  }

  static getOne(id) {
    return new Promise(function(resolve, reject) {
      db
        .one(`SELECT * FROM structure_types WHERE id=$1`, [ id ])
        .then(res => {
          let structure_type = new StructureType(res);
          resolve(structure_type);
        })
        .catch(err => reject(err));
    });
  }

  static create(title) {
    return new Promise(function(resolve, reject) {
      db
        .one(`INSERT INTO structure_types(title) VALUES ($1) RETURNING *`, [
          title
        ])
        .then(res => {
          let structure_type = new StructureType(res);
          resolve(structure_type);
        })
        .catch(err => reject(err));
    });
  }

  save() {
    let structure_type = this;
    return new Promise(function(resolve, reject) {
      db
        .result(`UPDATE structure_types SET id=$1, title=$2 WHERE id=$6`, [
          structure_type._id,
          structure_type._title,
          structure_type._id
        ], r => r.rowCount)
        .then(res => {
          resolve((res > 0));
        })
        .catch(err => reject(err));
    });
  }

  static delete(id) {
    return new Promise(function(resolve, reject) {
      db
        .result(`DELETE FROM structure_types WHERE id=$1`, [ id ], r => r.rowCount)
        .then(res => {
          resolve((res > 0));
        })
        .catch(err => reject(err));
    });
  }

  delete() {
    return StructureType.delete(this._id);
  }

  constructor(data) {
    this._id = data.id;
    this._title = data.title;
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
}

exports.StructureType = StructureType;