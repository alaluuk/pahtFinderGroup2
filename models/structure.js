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

  constructor(data) {
    this._id = data.id;
    this._title = data.title;
    this._type_id = data.type_id;
    this._u_value = data.u_value;
    this._material_id = data.material_id;
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
}

exports.Structure = Structure;