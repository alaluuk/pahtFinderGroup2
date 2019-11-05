const { db } = require("../pg-adaptor");
const { User } = require("../models/user");
const { HouseStructure } = require("../models/house-structure");

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