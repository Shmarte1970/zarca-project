module.exports = (app) => { 
    const API_URL = '/api/v' + process.env.API_VERSION;

    const authRouter = require('./user/authRouter');
    app.use(API_URL + '/auth', authRouter);
    
    const userRouter = require('./user/userRouter');
    app.use(API_URL + '/users', userRouter);    

    const roleRouter = require('./user/roleRouter');
    app.use(API_URL + '/roles', roleRouter);

    const specialityRouter = require('./user/specialityRouter');
    app.use(API_URL + '/specialities', specialityRouter);

    const categoryRouter = require('./user/categoryRouter');
    app.use(API_URL + '/categories', categoryRouter);


    const countryRouter = require('./locations/countryRouter');
    app.use(API_URL + '/countries', countryRouter);

    const provinceRouter = require('./locations/provinceRouter');
    app.use(API_URL + '/provinces', provinceRouter);

    const cityRouter = require('./locations/cityRouter');
    app.use(API_URL + '/cities', cityRouter);

    const postcodeRouter = require('./locations/postcodeRouter');
    app.use(API_URL + '/postcodes', postcodeRouter);


    app.get(API_URL, (req, res) => {    
        res.json({ message: "Welcome to ZARCA API" });
    });


    // 404 error
    app.use(function (req, res, next) {    
        res.status(404).json( { "error": { "errors": [ { "domain": "global", "reason": "notFound", "message": "Not Found" } ], "code": 404, "message": "Not Found" }} );
    });
};