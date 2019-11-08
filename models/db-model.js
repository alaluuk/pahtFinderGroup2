const { db } = require("../pg-adaptor");

// TODO: Abstract database model class

class AbstractDBModel {
  static __db_table = null;

  static getAny(where) {
    let model = this;
    return new Promise(function(resolve, reject) {
      db
        .any(`SELECT * FROM `+this.__db_table)
        .then(res => {
          let instances = [];
          res.forEach(instance_data => {
            let instance = new model.constructor(instance_data);
            instances.push(instance);
          });
          resolve(instances);
        })
        .catch(err => reject(err));
    });
  }


}