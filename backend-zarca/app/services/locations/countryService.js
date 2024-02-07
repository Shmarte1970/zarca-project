const dbUtils = require('../../utils/dbUtils');
const db = require('../../models');
const entityModel = db.countries;

const countryService = {};

countryService.createEntity = async (data) => {    
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

countryService.getAll = async (data) => {
    const { limit, offset, page } = dbUtils.paginate(data);
    const { count, rows } = await entityModel.findAndCountAll({ limit: limit, offset: offset });
    const queryInfo = dbUtils.getPagination(count, rows.length, page, limit, offset);    

    return { info: queryInfo, entities: rows };    
};

countryService.get = async (id) => {    
    return await entityModel.findOne({ where: { id: id }});
};

countryService.updateEntity = async (id, data) => {
    delete data.id;    

    let entity = null;
    try {
        entity = await entityModel.findOne({ where: { id: id }});
        if(entity){
            await await entityModel.update(data, { where: { id: id } });
            entity = await entityModel.findOne({ where: { id: id }});
        }else{
            throw Error("Country not found");
        }
    } catch (err) {
        throw Error(dbUtils.getErrors(err));
    }

    return entity;
};

countryService.deleteEntity = async (id) => {    
    try {
        await entityModel.destroy({ where: { id: id }});
    } catch (err) {        
        throw Error(dbUtils.getErrors(err));
    }

    return true;
};

module.exports = countryService;