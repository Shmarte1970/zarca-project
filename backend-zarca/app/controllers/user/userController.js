const entityService = require('../../services/user/userService');

// Create
const createEntity = async(req, res) => {        
    try {        
        const entity = await entityService.createEntity(req.body, req.user);
        res.status(200).send(entity);    
    } catch (err) {         
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }
};

// Retrive all
const getAll = async (req, res) => {
    try { 
        res.status(200).json(await entityService.getAll(req.query, req.user));  
    } catch (err) {         
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }  
};

// Retrive single
const get = async (req, res) => {
    let id = req.params.id;        

    let entity = await entityService.get(id, req.user, req.user);
    if(entity){        
        res.status(200).send(entity);        
    }else{
        res.status(404).send({ error: 1, message: "User not found"});
    }
};

// Update
const updateEntity = async (req, res) => {
    try {        
        const entity = await entityService.updateEntity(req.params.id, req.body, req.user);        
        res.status(200).send(entity);
    } catch (err) {                
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }            
};

// Delete single
const deleteEntity = async (req, res) => {    
    try {
        await entityService.deleteEntity(req.params.id, req.user, req.user);
        res.status(200).json({ success: true, message: 'User was deleted' });
    } catch (err) {        
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }     
};

// Set specific roles to user
const setRoles = async (req, res) => {        
    try {
        const user = await entityService.setRoles(req.params.id, req.body, req.user);
        res.status(200).send(user);
    } catch (err) {        
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }     
};

// Add role to user
const addRole = async (req, res) => {        
    try {
        const user = await entityService.addRole(req.params.id, req.params.roleId, req.user);
        res.status(200).send(user);
    } catch (err) {        
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }     
};

// Remove role to user
const removeRole = async (req, res) => {        
    try {
        const user = await entityService.removeRole(req.params.id, req.params.roleId, req.user);
        res.status(200).send(user);
    } catch (err) {        
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }     
};

// Enable user
const enable = async (req, res) => {        
    try {
        const user = await entityService.enable(req.params.id, req.user);
        res.status(200).send(user);
    } catch (err) {        
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }     
};

// Disable user
const disable = async (req, res) => {        
    try {
        const user = await entityService.disable(req.params.id, req.user);
        res.status(200).send(user);
    } catch (err) {        
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }     
};


module.exports = {
    createEntity,
    getAll,
    get,    
    updateEntity,
    deleteEntity,
    setRoles,
    addRole,
    removeRole,
    enable,
    disable
}