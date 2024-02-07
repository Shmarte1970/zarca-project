require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require('helmet');
const passport = require('passport');
const openAPI = require('./app/config/openAPI');

const app = express();

require('./app/config/authConfig')(passport);
app.use(passport.initialize());

if(process.env.NODE_ENV == "development"){
    app.use('/docs', openAPI.swaggerUi.serve, openAPI.swaggerUi.setup(openAPI.swaggerSpec, openAPI.optionsSwaggerUI));
}

// Errors in json format
app.use((err, req, res, next) => { return res.status(500).send({ error: err}) });

// Disable not useful for REST API headers
app.use(helmet({ contentSecurityPolicy: false, xDnsPrefetchControl: false, xDownloadOptions: false, referrerPolicy: false, xXssProtection: false, xContentTypeOptions: false }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = (process.env.FRONTEND_URL)?{ origin: process.env.FRONTEND_URL }:{} // "http://localhost:8081"
app.use(cors(corsOptions));

// Routers
require('./app/routes/index')(app);

process.env.PORT =  process.env.PORT || 8080;
app.listen(process.env.PORT, () => { console.log(`\n\x1b[32mServer is running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode\x1b[0m`) });