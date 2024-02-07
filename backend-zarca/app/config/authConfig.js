const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userService = require('../services/user/userService');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
    algorithms: ['HS512']
};

const strategy = new JwtStrategy(options, async (payload, done) => {
    
    if(payload.rfsh) return done(null, false, { message: 'Something goes wrong!'});
        
    let user = null;    
    user = await userService.getOneBy({ username: payload.user.username });            
    
    if(!user || !user.enabled) return done(null, false, { message: 'Something goes wrong!!'});
    return done(null, user);
});

module.exports = (passport) => { passport.use(strategy); };