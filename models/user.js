const { db } = require("../pg-adaptor");

class User {
  static getMany() {
    return new Promise(function(resolve, reject) {
      db
        .many(`SELECT * FROM users`)
        .then(res => {
          let users = [];
          res.forEach(user_data => {
            let user = new User(user_data);
            users.push(user);
          });
          resolve(users);
        })
        .catch(err => reject(err));
    });
  }

  static getOne(id) {
    return new Promise(function(resolve, reject) {
      db
        .one(`SELECT * FROM users WHERE id=$1`, [ id ])
        .then(res => {
          let user = new User(res);
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._email = data.email;
    this._role = data.role;
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

  get email() {
    return this._email;
  }

  get role() {
    return this._role;
  }

  get houses() {
    return [];
  }
}

exports.User = User;