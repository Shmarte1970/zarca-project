const dbUtils = require('../../utils/dbUtils');
const db = require('../../models');
const entityModel = db.categories;

const categoryService = {};

categoryService.createEntity = async (data) => {    
    let entity = null;    
    try {
        entity = entityModel.build(data);    
        await entity.validate();
        entity = await entity.save();        
    } catch (err) {         
        let myError = new Error(dbUtils.getErrors(err));
        myError.dbErrors = dbUtils.getErrors(err);
        throw myError;
    }

    return entity;
};

categoryService.getAll = async (data) => {
    const { limit, offset, page } = dbUtils.paginate(data);

    const where = {}; 
    if(data.specialityId) where.specialityId = data.specialityId;

    const order = [];
    if(data.orderBy) order.push([data.orderBy, data.orderDir || 'ASC']);

    const { count, rows } = await entityModel.findAndCountAll({ where: where, order: order, limit: limit, offset: offset });
    const queryInfo = dbUtils.getPagination(count, rows.length, page, limit, offset);    

    return { info: queryInfo, entities: rows };    
};

categoryService.get = async (id) => {    
    return await entityModel.findOne({ where: { id: id }});
};

categoryService.updateEntity = async (id, data) => {
    delete data.id;    

    let entity = null;
    try {
        entity = await entityModel.findOne({ where: { id: id }});
        if(entity){
            await await entityModel.update(data, { where: { id: id } });
            entity = await entityModel.findOne({ where: { id: id }});
        }else{
            throw Error("Category not found");
        }
    } catch (err) {
        throw Error(dbUtils.getErrors(err));
    }

    return entity;
};

categoryService.deleteEntity = async (id) => {    
    try {
        await entityModel.destroy({ where: { id: id }});
    } catch (err) {        
        throw Error(dbUtils.getErrors(err));
    }

    return true;
};

module.exports = categoryService;