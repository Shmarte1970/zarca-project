const authService = require('../../services/user/authService');

// Login
const login = async(req, res) => {    
    try{
        const loginData = await authService.login(req.body);
        res.status(200).json(loginData);
    } catch (err) {         
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }    
};

const tokenRefresh = async(req, res) => {    
    try{
        const refreshData = await authService.tokenRefresh(req.get("refresh"));
        res.status(200).json(refreshData);    
    } catch (err) {         
        res.status(400).json({ success: false, errors: err.dbErrors || err.message });
    }     
}

module.exports = {    
    login,
    tokenRefresh 
}