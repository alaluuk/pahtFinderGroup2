const { db } = require("../pg-adaptor");

class StructureMaterial {
  static getAny() {
    return new Promise(function(resolve, reject) {
      db
        .any(`SELECT * FROM structure_materials`)
        .then(res => {
          let structure_materials = [];
          res.forEach(structure_material_data => {
            let structure_material = new StructureMaterial(structure_material_data);
            structure_materials.push(structure_material);
          });
          resolve(structure_materials);
        })
        .catch(err => reject(err));
    });
  }

  static getOne(id) {
    return new Promise(function(resolve, reject) {
      db
        .one(`SELECT * FROM structure_materials WHERE id=$1`, [ id ])
        .then(res => {
          let structure_material = new StructureMaterial(res);
          resolve(structure_material);
        })
        .catch(err => reject(err));
    });
  }

  static create(name, u_value) {
    return new Promise(function(resolve, reject) {
      db
        .one(`INSERT INTO structure_materials(name, u_value) VALUES ($1, $2) RETURNING *`, [
          name, u_value
        ])
        .then(res => {
          let structure_material = new StructureType(res);
          resolve(structure_material);
        })
        .catch(err => reject(err));
    });
  }

  save() {
    let structure_material = this;
    return new Promise(function(resolve, reject) {
      db
        .result(`UPDATE structure_materials SET id=$1, name=$2, u_value=$3 WHERE id=$4`, [
          structure_material._id,
          structure_material._name,
          structure_material._u_value,
          structure_material._id
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
        .result(`DELETE FROM structure_materials WHERE id=$1`, [ id ], r => r.rowCount)
        .then(res => {
          resolve((res > 0));
        })
        .catch(err => reject(err));
    });
  }

  delete() {
    return StructureMaterial.delete(this._id);
  }

  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._u_value = data.u_value;
    this._created_at = data.created_at;
    this._updated_at = data.updated_at;
  }

  get id() {
    return this._id;
  }

  set name(name) {
    this._name = name;
  }
  get name() {
    return this._name;
  }

  set uValue(u_value) {
    this._u_value = u_value;
  }
  get uValue() {
    return this._u_value;
  }

  get createdAt() {
    return this._created_at.toISOString();
  }

  get updatedAt() {
    return this._updated_at.toISOString();
  }
}

exports.StructureMaterial = StructureMaterial;