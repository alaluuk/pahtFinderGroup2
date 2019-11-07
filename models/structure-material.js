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

  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._u_value = data.u_value;
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
}

exports.StructureMaterial = StructureMaterial;