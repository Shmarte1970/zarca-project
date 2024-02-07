const entityService = require('../../services/locations/cityService');

// Create
const createEntity = async(req, res) => {        
    try {                
        const entity = await entityService.createEntity(req.body);
        res.status(200).send(entity);    
    } catch (err) {         
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }
};

// Retrive all
const getAll = async (req, res) => {    
    res.status(200).json(await entityService.getAll(req.query));    
};

// Retrive single
const get = async (req, res) => {        
    let entity = await entityService.get(req.params.id);
    if(entity){        
        res.status(200).send(entity);        
    }else{
        res.status(404).send({ error: 1, message: "City not found"});
    }
};

// Update
const updateEntity = async (req, res) => {
    try {                
        const entity = await entityService.updateEntity(req.params.id, req.body);
        res.status(200).send(entity);
    } catch (err) {                
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }            
};

// Delete single
const deleteEntity = async (req, res) => {        
    try {
        await entityService.deleteEntity(req.params.id);
        res.status(200).json({ success: true, message: 'City was deleted' });
    } catch (err) {        
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }     
};

module.exports = {
    createEntity,
    getAll,
    get,
    updateEntity,
    deleteEntity
}