const validator = require('validator');
const dbUtils = {};

dbUtils.getErrors = (err) => {
    let errors = [];
//    console.log(err);
    if(err.errors){
        err.errors.forEach(error => { errors.push(error.message); });
    }else{
        errors.push(err.message);
    }

    return errors;
};

dbUtils.paginate = (data) => {
    // Get page, pageSize
    let page = 1; let pageSize = 10;
    if(data.page && validator.isInt(data.page) && data.page > 0) page = parseInt(data.page);
    if(data.pageSize && validator.isInt(data.pageSize) && data.pageSize > 0) pageSize = parseInt(data.pageSize);

    const offset = (page-1) * pageSize;
    const limit = pageSize;

    return { offset, limit, page };
};

dbUtils.getPagination = (count, rows, page, limit, offset) => {
    return { 
        totalPages: count?Math.ceil(count/limit):0,
        page: page,
        pageSize: limit,
        totalRows: count,
        rows: rows,        
        from: rows?(offset+1):0,
        to: rows?(offset + rows):0
    };
};

module.exports = dbUtils;