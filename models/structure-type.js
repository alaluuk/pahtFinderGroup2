const { db } = require("../pg-adaptor");

class StructureType {
  static getMany() {
    return new Promise(function(resolve, reject) {
      db
        .many(`SELECT * FROM structure_types`)
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