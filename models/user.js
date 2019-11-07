const { db } = require("../pg-adaptor");
const pwHash = require("password-hash");
const { House } = require(".");
const { Roles, getPermissions } = require("../permissions");

class User {
  static getAny() {
    return new Promise(function(resolve, reject) {
      db
        .any(`SELECT * FROM users`)
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

  static getOneByEmail(email) {
    return new Promise(function(resolve, reject) {
      db
        .one(`SELECT * FROM users WHERE email=$1`, [ email ])
        .then(res => {
          let user = new User(res);
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  static create(name, email, password, role) {
    if(!Roles.hasOwnProperty(role)) {
      throw new Error("The specified role is invalid ('"+role+"').")
    }
    return new Promise(function(resolve, reject) {
      db
        .one(`INSERT INTO users(name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *`, [
          name, email, pwHash.generate(password), role
        ])
        .then(res => {
          let user = new User(res);
          resolve(user);
        })
        .catch(err => reject(err));
    });
  }

  save() {
    let user = this;
    return new Promise(function(resolve, reject) {
      db
        .result(`UPDATE users SET id=$1, name=$2, email=$3, password_hash=$4, role=$5 WHERE id=$6`, [
          user._id,
          user._name,
          user._email,
          user._password_hash,
          user._role,
          user._id
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
        .result(`DELETE FROM users WHERE id=$1`, [ id ], r => r.rowCount)
        .then(res => {
          resolve((res > 0));
        })
        .catch(err => reject(err));
    });
  }

  delete() {
    return User.delete(this._id);
  }

  constructor(data) {
    this._id = data.id;
    this._name = data.name;
    this._email = data.email;
    this._password_hash = data.password_hash;
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

  set email(email) {
    this._email = email;
  }
  get email() {
    return this._email;
  }

  set password(password) {
    this._password_hash = pwHash.generate(password);
  }
  get passwordHash() {
    return this._password_hash;
  }

  set role(role) {
    if(!Roles.hasOwnProperty(role)) {
      throw new Error("The specified role is invalid ('"+role+"').")
    }
    this._role = role;
  }
  get role() {
    return this._role;
  }

  get permissions() {
    return getPermissions(this._role);
  }

  get houses() {
    return House.getAnyByOwner(this._id);
  }

  checkPassword(password) {
    return pwHash.verify(password, this._password_hash);
  }
}

exports.User = User;