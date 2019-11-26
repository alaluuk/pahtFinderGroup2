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
    let suffix = {
      query: "",
      fields: ""
    };
    if(this.checkValidity(verbose)) {
      for(let i = 0; i < this.filter.length; i++) {
        if(this.filter[i].type === "EQUAL") {
          suffix.query += ((i === 0) ? " WHERE " : " AND ")+this.filter[i].id+" = '"+this.filter[i].value+"'";
        } else if(this.filter[i].type === "NOT_EQUAL") {
          suffix.query += ((i === 0) ? " WHERE " : " AND ")+this.filter[i].id+" != '"+this.filter[i].value+"'";
        } else if(this.filter[i].type === "LIKE") {
          suffix.query += ((i === 0) ? " WHERE " : " AND ")+this.filter[i].id+" LIKE '%"+this.filter[i].value+"%'";
        } else if(this.filter[i].type === "BEGINS_WITH") {
          suffix.query += ((i === 0) ? " WHERE " : " AND ")+this.filter[i].id+" LIKE '"+this.filter[i].value+"%'";
        } else if(this.filter[i].type === "ENDS_WITH") {
          suffix.query += ((i === 0) ? " WHERE " : " AND ")+this.filter[i].id+" LIKE '%"+this.filter[i].value+"'";
        }
      }
      for(let j = 0; j < this.sort.length; j++) {
        suffix.query += ((j === 0) ? " ORDER BY " : ", ")+this.sort[j].id+((this.sort[j].desc === true) ? " DESC" : " ASC");
      }
      if(this.pagination.pageSize > 0) {
        suffix.fields += " COUNT(*) OVER() AS pg_fullcount";
        suffix.query += " LIMIT "+this.pagination.pageSize;
        suffix.query += " OFFSET "+(((this.pagination.page <= 0) ? 0 : this.pagination.page - 1) * this.pagination.pageSize);
      }
    }
    return suffix;
  }

  checkResults(results) {
    // TODO
  }
}

exports.APIQuery = APIQuery;