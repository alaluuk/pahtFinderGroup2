class APIQuery {
  constructor(query) {
    this.sort = (query.sort) ? query.sort : [ { id: "created_at", desc: true } ]; // { id: "DEMO", desc: false }
    this.filter = (query.filter) ? query.filter : []; // { id: "DEMO", type: "LIKE", value: "TEST" }
    this.pagination = (query.pagination) ? query.pagination : { pageSize: -1, page: 1 };
  }

  checkValidity(verbose = true) {
    return true;
  }

  constructSuffix(verbose = true) {
    let suffix = "";
    if(this.checkValidity(verbose)) {
      for(let i = 0; i < this.filter.length; i++) {
        if(this.filter[i].type === "EQUAL") {
          suffix += ((i === 0) ? " WHERE " : " AND ")+this.filter[i].id+" = '"+this.filter[i].value+"'";
        } else if(this.filter[i].type === "NOT_EQUAL") {
          suffix += ((i === 0) ? " WHERE " : " AND ")+this.filter[i].id+" != '"+this.filter[i].value+"'";
        } else if(this.filter[i].type === "LIKE") {
          suffix += ((i === 0) ? " WHERE " : " AND ")+this.filter[i].id+" LIKE '%"+this.filter[i].value+"%'";
        } else if(this.filter[i].type === "BEGINS_WITH") {
          suffix += ((i === 0) ? " WHERE " : " AND ")+this.filter[i].id+" LIKE '"+this.filter[i].value+"%'";
        } else if(this.filter[i].type === "ENDS_WITH") {
          suffix += ((i === 0) ? " WHERE " : " AND ")+this.filter[i].id+" LIKE '%"+this.filter[i].value+"'";
        }
      }
      for(let i = 0; i < this.sort.length; i++) {
        suffix += ((i === 0) ? " ORDER BY " : " AND ")+this.sort[i].id+((this.sort[i].desc === true) ? " DESC" : " ASC");
      }
      if(this.pagination.pageSize > 0) {
        suffix += " LIMIT "+this.pagination.pageSize;
        suffix += " OFFSET "+(((this.pagination.page <= 0) ? 0 : this.pagination.page - 1) * this.pagination.pageSize);
      }
    }
    console.log(suffix);
    return suffix;
  }
}

exports.APIQuery = APIQuery;