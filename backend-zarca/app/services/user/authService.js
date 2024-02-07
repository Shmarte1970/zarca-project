const dbUtils = require('../../utils/dbUtils');
const { sign, verify } = require('jsonwebtoken');
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const userService = require('../user/userService');

const authService = {};

authService.login = async (data) => {
    let user = null;
    try{        
        user = await userService.getOneBy({ username: data.username });
    }catch(err){
        if(!err.response.error.text) console.log('\x1b[31m[ERROR] ' + err.message + ' \x1b[0m');
        throw new Error("Something goes wrong!!!");
    }
    
    if(!user || !user.enabled){
        throw new Error("Something goes wrong!!!!");        
    }    

    const validate = compareSync(data.password, user.password);
    if(!validate){
        throw new Error("Something goes wrong!!!!!");
    }

    user.password = undefined;
    const jsontoken = sign({ user: user, rfsh: false }, process.env.SECRET_KEY, { expiresIn: "1d", algorithm: 'HS512' });
    const jsontokenRefresh = sign({ user: user, rfsh: true }, process.env.SECRET_KEY, { expiresIn: "10d", algorithm: 'HS512' });

    return {
        success: true,
        message: "Login successfully",
        user: user,
        token: jsontoken,
        tokenRefresh: jsontokenRefresh
    };
};

authService.tokenRefresh = async (refreshToken) => {        
    if(!refreshToken){            
        throw new Error("Something goes wrong!");
    }

    return await verify(refreshToken, process.env.SECRET_KEY, async (err, decoded) => {
        if(err){
            throw new Error("Something goes wrong!!");
        }
                
        if(!decoded.user || !decoded.rfsh){
            throw new Error("Something goes wrong!!!");
        }

        let user = null;
        try{            
            user = await userService.getOneBy({ username: decoded.user.username });
        }catch(err){
            if(!err.response.error.text) console.log('\x1b[31m[ERROR] ' + err.message + ' \x1b[0m');
            throw new Error("Something goes wrong!!!!");
        }
        
        if(!user){         
            throw new Error("Something goes wrong!!!!!");
        }        

        user.password = undefined;
        const jsontoken = sign({ user: user, rfsh: false }, process.env.SECRET_KEY, { expiresIn: "1d", algorithm: 'HS512' });
        const jsontokenRefresh = sign({ user: user, rfsh: true }, process.env.SECRET_KEY, { expiresIn: "10d", algorithm: 'HS512' });

        return {
            success: true,
            message: "Token refreshed", 
            user: user,
            token: jsontoken,
            tokenRefresh: jsontokenRefresh               
        };
    });
};


module.exports = authService;