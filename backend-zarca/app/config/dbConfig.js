require("dotenv").config();
const { setTimeout } = require("timers/promises");
const {Sequelize} = require('sequelize');

const finalDB_NAME = ((process.env.NODE_ENV === 'test')?process.env.DB_TEST_NAME:process.env.DB_NAME);
const sequelize = new Sequelize(
    ((process.env.NODE_ENV === 'test')?process.env.DB_TEST_NAME:process.env.DB_NAME), 
    process.env.DB_USER,
    process.env.DB_PASS, 
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',        

        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        logging: ((process.env.NODE_ENV==="production" || process.env.NODE_ENV === 'test' || process.env.SHOW_SQL === 'false')?false:console.log)
    }
);

const dbSetup = async () => {
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({ host: process.env.DB_HOST, port: process.env.DB_PORT, user: process.env.DB_USER, password: process.env.DB_PASS }).catch(err => { console.log('\x1b[31m[ERROR] Connect database failed: ' + err.message + ' \x1b[0m'); });
    if(connection){
        if(process.env.NODE_ENV !== 'test') await connection.query("CREATE DATABASE IF NOT EXISTS " + process.env.DB_NAME).catch(err => { console.log('\x1b[31m[ERROR] Create database failed: ' + err.message + ' \x1b[0m'); });
        if(process.env.NODE_ENV === 'test') await connection.query("CREATE DATABASE IF NOT EXISTS " + process.env.DB_TEST_NAME).catch(err => { console.log('\x1b[31m[ERROR] Create database failed: ' + err.message + ' \x1b[0m'); });
        await connection.end();

        await connectionRetry();
    }else{
        console.log('\x1b[31m[ERROR] Database connect error: ' + process.env.DB_HOST + ':' + process.env.DB_PORT + ' (user: ' + process.env.DB_USER +', using password: ' + ((process.env.DB_PASS)?'Yes':'No') + ') \x1b[0m');
    }
}

const connectionRetry = async () => {
    let connected = false;
    let synchronized = false;
    
    await sequelize.authenticate()
    .then(() => {
        connected = true;
        console.log("\x1b[32mConnected to database " + finalDB_NAME + "\x1b[0m")
    })
    .catch(err => {
        console.log('\x1b[31m[ERROR] Connect ' + finalDB_NAME + ': ' + err.message + ' \x1b[0m');
    });
    
    let syncMode = { alter: (process.env.NODE_ENV === 'production')?false:true }; // force: true || alter: true
    if(process.env.RECREATE_DB === 'true') syncMode = { force: true };
    if(process.env.NODE_ENV === 'test') syncMode = { force: true, match: /_test$/ };
    await sequelize.sync(syncMode)
    .then(async () => {
        synchronized = true;
        console.log("\x1b[32mDB sync done!\x1b[0m");

        if(process.env.NODE_ENV === 'development'){
            // Load default data
            const fixtures = require("../utils/fixtures");
            fixtures.loadData(sequelize);
        }

    }).catch(err => {
        console.log('\x1b[31m[ERROR] Sync: ' + err.message + ' \x1b[0m');
    });
    
    if(!connected || !synchronized){
        console.log('\x1b[90m[INFO] Trying reconnect to database on 10s \x1b[0m');
        await setTimeout(10000);
        await connectionRetry();
    }     
};

module.exports = { sequelize, dbSetup };