require('dotenv').config();
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

  static create(name, address_country, address_city, address_street, construction_year, owner_id, heating_system, cost_of_heating, warm_water_pipe) {
    return new Promise(function(resolve, reject) {
      // TODO: let coords = await House.addressToLatLng(address_street +', '+address_city +', '+address_country);
      User.getOne(owner_id)
        .then(user => {
          db
          .one(`INSERT INTO houses(
              name,
              address_country,
              address_city,
              address_street,
              address_lat,
              address_lng,
              construction_year,
              owner_id,
              heating_system,
              cost_of_heating,
              warm_water_pipe
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`, [
              name,
              address_country,
              address_city,
              address_street,
              null, // coords[0],
              null, // coords[1],
              construction_year,
              owner_id,
              heating_system,
              cost_of_heating,
              warm_water_pipe
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
      // house.updateAddressLatLng()
      // .then(coords => {
        db
        .result(`UPDATE houses SET id=$1,
          name=$2,
          address_country=$3,
          address_city=$4,
          address_street=$5,
          address_lat=$6,
          address_lng=$7,
          construction_year=$8,
          owner_id=$9,
          heating_system=$10,
          cost_of_heating=$11,
          warm_water_pipe=$12
          WHERE id=$13 RETURNING *
        `, [
          house._id,
          house._name,
          house._address_country,
          house._address_city,
          house._address_street,
          house._address_lat,
          house._address_lng,
          house._construction_year,
          house._owner_id,
          house._heating_system,
          house._cost_of_heating,
          house._warm_water_pipe,
          house._id
        ])
        .then(res => {
          house._updated_at = res.rows[0].updated_at;
          resolve((res.rowCount > 0));
        })
        .catch(err => reject(err));
      // })
      // .catch(err => reject(err));
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
    this._owner_id = data.owner_id;
    this._address_country = data.address_country;
    this._address_city = data.address_city;
    this._address_street = data.address_street;
    this._address_lat = data.address_lat;
    this._address_lng = data.address_lng;
    this._construction_year = data.construction_year;
    this._heating_system = data.heating_system;
    this._cost_of_heating = data.cost_of_heating;
    this._warm_water_pipe = data.warm_water_pipe;
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

  set addressCountry(addressCountry) {
    if(addressCountry.length !== 2) {
      throw new Error("Invalid country code (must be 2 characters long).");
    }
    this._address_country = addressCountry;
    // this.updateAddressCoordinates();
  }
  get addressCountry() {
    return this._address_country;
  }

  set addressCity(addressCity) {
    this._address_city = addressCity;
    // this.updateAddressCoordinates();
  }
  get addressCity() {
    return this._address_city;
  }

  set addressStreet(addressStreet) {
    this._address_street = addressStreet;
    // this.updateAddressCoordinates();
  }
  get addressStreet() {
    return this._address_street;
  }

  get addressLat() {
    return this._address_lat;
  }

  get addressLng() {
    return this._address_lng;
  }

  get addressFull() {
    return this._address_street +', '+this._address_city +', '+this._address_country;
  }

  static addressToLatLng() {
    // TODO: Implement reverse geocoding
    return new Promise((resolve, reject) => {
      // request('https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?types=place&limit=1&access_token='+process.env.MAPBOX_API_TOKEN, { json: true }, (err, res, body) => {
      //   if(err) { return console.log(err); }
      //   console.log(body);
      // });
      reject(new Error("Missing reverse geocoding functionality."));
    });
    // this.mapboxClient = new MapboxClient({ accessToken: this.mapboxToken });
    // this.mapboxClient.forwardGeocode({
    //   query: 'Ylioppilaantie 4, 90100 Oulu, Finland',
    //   autocomplete: false,
    //   limit: 1
    // })
    // .send()
    // .then(response => {
    //   if(response && response.body && response.body.features && response.body.features.length) {
    //     var feature = response.body.features[0];
    //     console.log(feature);
    //     this.setState(prevState => ({
    //       markers: [...prevState.markers, {
    //         lat: feature.center[1],
    //         long: feature.center[0]
    //       }]
    //     }));
    //   }
    // });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(65.009621, 25.503339);
      }, 500);
    });
  }

  updateAddressLatLng() {
    return new Promise((resolve, reject) => {
      House.addressToLatLng(this.addressFull())
      .then(coords => {
        this._address_lat = coords[0];
        this._address_lng = coords[1];
        resolve(coords);
      })
      .catch(err => reject(err))
    });
  }

  set constructionYear(constructionYear) {
    if(constructionYear < 0 || constructionYear > (new Date()).getFullYear()) {
      throw new Error("Invalid construction year: The value must be positive and in the future.");
    }
    this._construction_year = constructionYear;
  }
  get constructionYear() {
    return this._construction_year;
  }

  set heatingSystem(heating_system) {
    this._heating_system = heating_system;
  }
  get heatingSystem() {
    return this._heating_system;
  }

  set costOfHeating(cost_of_heating) {
    this._cost_of_heating = cost_of_heating;
  }
  get costOfHeating() {
    return this._cost_of_heating;
  }

  set warmWaterPipe(warm_water_pipe) {
    this._warm_water_pipe = warm_water_pipe;
  }
  get warmWaterPipe() {
    return this._warm_water_pipe;
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