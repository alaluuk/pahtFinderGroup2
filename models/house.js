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
    try {
      let user = User.getOne(owner_id);
    } catch(err) {
      throw new Error("The specified house owner could not be found.")
    }
    return new Promise(function(resolve, reject) {
      db
        .one(`INSERT INTO houses(name, country_code, construction_year, owner_id) VALUES ($1, $2, $3, $4) RETURNING *`, [
          name, country_code, construction_year, owner_id
        ])
        .then(res => {
          let house = new House(res);
          resolve(house);
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
    return HouseStructure.getManyByHouse(this._id);
  }
}

exports.House = House;