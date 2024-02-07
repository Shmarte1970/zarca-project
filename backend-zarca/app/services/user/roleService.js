const dbUtils = require('../../utils/dbUtils');
const db = require('../../models');
const entityModel = db.roles;
const userService = require('./userService');

const roleService = {};

roleService.createEntity = async (data, loggedUser) => {    
    if(loggedUser && !userService.checkRole(loggedUser, 1)) throw Error("You are not allowed to perform this action");

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

roleService.getAll = async (data) => {
    const { limit, offset, page } = dbUtils.paginate(data);
    const { count, rows } = await entityModel.findAndCountAll({ limit: limit, offset: offset });
    const queryInfo = dbUtils.getPagination(count, rows.length, page, limit, offset);    

    return { info: queryInfo, entities: rows };    
};

roleService.get = async (id) => {    
    return await entityModel.findOne({ where: { id: id }});
};

roleService.updateEntity = async (id, data, loggedUser) => {
    if(loggedUser && !userService.checkRole(loggedUser, 1)) throw Error("You are not allowed to perform this action");

    delete data.id;    

    let entity = null;
    try {
        entity = await entityModel.findOne({ where: { id: id }});
        if(entity){
            await await entityModel.update(data, { where: { id: id } });
            entity = await entityModel.findOne({ where: { id: id }});
        }else{
            throw Error("Role not found");
        }
    } catch (err) {
        throw Error(dbUtils.getErrors(err));
    }

    return entity;
};

roleService.deleteEntity = async (id, loggedUser) => {    
    if(loggedUser && !userService.checkRole(loggedUser, 1)) throw Error("You are not allowed to perform this action");
    if(id == 1) throw Error("Can not delete admin role");

    try {
        await entityModel.destroy({ where: { id: id }});
    } catch (err) {        
        throw Error(dbUtils.getErrors(err));
    }     

    return true;
};

module.exports = roleService;