const { db } = require("../pg-adaptor");
const { User } = require("./user");
const { HouseStructure } = require("./house-structure");

class House {
  static getMany() {
    return new Promise(function(resolve, reject) {
      db
        .many(`SELECT * FROM houses`)
        .then(res => {
          let houses = [];
          res.forEach(house_data => {
            let house = new House(house_data);
            houses.push(house);
          });
          resolve(houses);
        })
        .catch(err => reject(err));
    });
  }

  static getManyByOwner(owner_id) {
    return new Promise(function(resolve, reject) {
      db
        .many(`SELECT * FROM house_structures WHERE owner_id=$1`, [ owner_id ])
        .then(res => {
          let houses = [];
          res.forEach(house_data => {
            let house = new House(house_data);
            houses.push(house);
          });
          resolve(houses);
        })
        .catch(err => reject(err));
    });
  }

  static getOne(id) {
    return new Promise(function(resolve, reject) {
      db
        .one(`SELECT * FROM houses WHERE id=$1`, [ id ])
        .then(res => {
          let house = new House(res);
          resolve(house);
        })
        .catch(err => reject(err));
    });
  }

  static create(name, country_code, construction_year, owner_id) {
    return new Promise(function(resolve, reject) {
      db
        .one(`INSERT INTO users(name, country_code, construction_year, owner_id) VALUES ($1, $2, $3, $4) RETURNING *`, [
          name, country_code, construction_year, owner_id
        ])
        .then(res => {
          let user = new User(res);
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  save() {
    let house = this;
    return new Promise(function(resolve, reject) {
      db
        .result(`UPDATE houses SET id=$1, name=$2, country_code=$3, construction_year=$4, owner_id=$5 WHERE id=$6`, [
          house._id,
          house._name,
          house._country_code,
          house._construction_year,
          house._owner_id,
          house._id
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
        .result(`DELETE FROM houses WHERE id=$1`, [ id ], r => r.rowCount)
        .then(res => {
          resolve((res > 0));
        })
        .catch(err => reject(err));
    });
  }

  delete() {
    House.delete(this._id);
  }

  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._country_code = data.country_code;
    this._construction_year = data.construction_year;
    this._owner_id = data.owner_id;
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

  get countryCode() {
    return this._country_code;
  }

  get constructionYear() {
    return this._construction_year;
  }

  get owner() {
    return User.getOne(this._owner_id);
  }

  get structures() {
    return HouseStructure.getManyByHouse(this._id);
  }
}

exports.House = House;