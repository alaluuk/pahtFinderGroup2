const { StructureType } = require(".");

class Structure {
  constructor(data) {
    if(new.target === Structure) throw new TypeError("Cannot construct Structure instances directly.");
    this._id = data.id;
    this._title = data.title;
    this._type_id = data.type_id;
    this._u_value = data.u_value;
    this._price = data.price;
    this._manufacturer = data.manufacturer;
    this._serial_number = data.serial_number;
    this._production_year = data.production_year;
    this._created_at = data.created_at;
    this._updated_at = data.updated_at;
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

  set price(price) {
    this._price = price;
  }
  get price() {
    return this._price;
  }

  set manufacturer(manufacturer) {
    this._manufacturer = manufacturer;
  }
  get manufacturer() {
    return this._manufacturer;
  }

  set serialNumber(serialNumber) {
    this._serial_number = serialNumber;
  }
  get serialNumber() {
    return this._serial_number;
  }

  set productionYear(productionYear) {
    if(productionYear < 0 || productionYear > (new Date()).getFullYear()) {
      throw new Error("Invalid production year: The value must be positive and in the future.");
    }
    this._production_year = productionYear;
  }
  get productionYear() {
    return this._production_year;
  }

  get createdAt() {
    return this._created_at.toISOString();
  }

  get updatedAt() {
    return this._updated_at.toISOString();
  }
}

exports.Structure = Structure;