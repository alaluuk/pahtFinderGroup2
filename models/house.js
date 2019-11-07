const { db } = require("../pg-adaptor");
const { User, HouseStructure } = require(".");

class House {
  static getAny() {
    return new Promise(function(resolve, reject) {
      db
        .any(`SELECT * FROM houses`)
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

  static getAnyByOwner(owner_id) {
    return new Promise(function(resolve, reject) {
      db
        .any(`SELECT * FROM houses WHERE owner_id=$1`, [ owner_id ])
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
      User.getOne(owner_id)
        .then(user => {
          db
          .one(`INSERT INTO houses(name, country_code, construction_year, owner_id) VALUES ($1, $2, $3, $4) RETURNING *`, [
            name, country_code, construction_year, user.id
          ])
          .then(res => {
            let house = new House(res);
            resolve(house);
          })
          .catch(err => reject(err));
        })
        .catch(err => reject(new Error("The specified house owner could not be found.")));
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
          // TODO: Reload updated_at timestamp
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
    return House.delete(this._id);
  }

  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._country_code = data.country_code;
    this._construction_year = data.construction_year;
    this._owner_id = data.owner_id;
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

  set countryCode(countryCode) {
    if(countryCode.length !== 2) {
      throw new Error("Invalid country code (must be 2 characters long).");
    }
    this._country_code = countryCode;
  }
  get countryCode() {
    return this._country_code;
  }

  set constructionYear(constructionYear) {
    if(constructionYear < 0 || constructionYear > (new Date()).getFullYear()) {
      throw new Error("Invalid construction year (the value must be positive and in the future).");
    }
    this._construction_year = constructionYear;
  }
  get constructionYear() {
    return this._construction_year;
  }

  set owner(user) {
    this._owner_id = user.id;
  }
  get owner() {
    return User.getOne(this._owner_id);
  }

  get structures() {
    return HouseStructure.getAnyByHouse(this._id);
  }

  get createdAt() {
    return this._created_at.toISOString();
  }

  get updatedAt() {
    return this._updated_at.toISOString();
  }
}

exports.House = House;