const { db } = require("../pg-adaptor");

class StructureType {
  static getAny(query = null) {
    return new Promise(function(resolve, reject) {
      let suffix = (query !== null) ? query.constructSuffix() : { query: '', fields: '' };
      db
        .any(`SELECT *`+suffix.fields+` FROM structure_types`+suffix.query)
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
        .result(`UPDATE structure_types SET id=$1, title=$2 WHERE id=$3`, [
          structure_type._id,
          structure_type._title,
          structure_type._id
        ])
        .then(res => {
          structure_type._updated_at = res.rows[0].updated_at;
          resolve((res.rowCount > 0));
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

  get createdAt() {
    return this._created_at.toISOString();
  }

  get updatedAt() {
    return this._updated_at.toISOString();
  }
}

exports.StructureType = StructureType;