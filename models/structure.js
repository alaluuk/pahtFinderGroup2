const { db } = require("../pg-adaptor");
const { StructureType, StructureMaterial } = require(".");

class Structure {
  static getAny() {
    return new Promise(function(resolve, reject) {
      db
        .any(`SELECT * FROM structures`)
        .then(res => {
          let structures = [];
          res.forEach(structure_data => {
            let structure = new Structure(structure_data);
            structures.push(structure);
          });
          resolve(structures);
        })
        .catch(err => reject(err));
    });
  }

  static getOne(id) {
    return new Promise(function(resolve, reject) {
      db
        .one(`SELECT * FROM structures WHERE id=$1`, [ id ])
        .then(res => {
          let structure = new Structure(res);
          resolve(structure);
        })
        .catch(err => reject(err));
    });
  }

  static create(title, type_id, u_value = null, material_id = null) {
    return new Promise(function(resolve, reject) {
      db
        .one(`INSERT INTO structures(title, type_id, u_value, material_id) VALUES ($1) RETURNING *`, [
          title, type_id, u_value, material_id
        ])
        .then(res => {
          let structure = new Structure(res);
          resolve(structure);
        })
        .catch(err => reject(err));
    });
  }

  save() {
    let structure = this;
    return new Promise(function(resolve, reject) {
      db
        .result(`UPDATE structures SET id=$1, title=$2, type_id=$3, u_value=$4, material_id=$5 WHERE id=$5`, [
          structure._id,
          structure._title,
          structure._type_id,
          structure._u_value,
          structure._material_id,
          structure._id
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
        .result(`DELETE FROM structures WHERE id=$1`, [ id ], r => r.rowCount)
        .then(res => {
          resolve((res > 0));
        })
        .catch(err => reject(err));
    });
  }

  delete() {
    return Structure.delete(this._id);
  }

  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._type_id = data.type_id;
    this._u_value = data.u_value;
    this._material_id = data.material_id;
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

  get material() {
    return StructureMaterial.getOne(this._material_id);
  }

  get createdAt() {
    return this._created_at.toISOString();
  }

  get updatedAt() {
    return this._updated_at.toISOString();
  }
}

exports.Structure = Structure;