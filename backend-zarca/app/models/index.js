const {Sequelize, DataTypes } = require('sequelize');
const {sequelize, dbSetup} = require('../config/dbConfig');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load Users models and associations
db.users = require('./user/userModel')(sequelize, DataTypes);

db.roles = require('./user/roleModel')(sequelize, DataTypes);
db.users.belongsToMany(db.roles, { through: 'users_roles', timestamps: false });
db.roles.belongsToMany(db.users, { through: 'users_roles', timestamps: false });

db.specialities = require('./user/specialityModel')(sequelize, DataTypes);
db.users.belongsTo(db.specialities); //, {foreignKey: { allowNull: false }});

db.categories = require('./user/categoryModel')(sequelize, DataTypes);
db.categories.belongsTo(db.specialities, {foreignKey: { allowNull: false }});
db.users.belongsTo(db.categories); //, {foreignKey: { allowNull: false }});

db.countries = require('./locations/countryModel')(sequelize, DataTypes);
db.users.belongsTo(db.countries); //, {foreignKey: { allowNull: false }});

db.provinces = require('./locations/provinceModel')(sequelize, DataTypes);
db.provinces.belongsTo(db.countries, {foreignKey: { allowNull: false }});
db.users.belongsTo(db.provinces); //, {foreignKey: { allowNull: false }});

db.cities = require('./locations/cityModel')(sequelize, DataTypes);
db.cities.belongsTo(db.provinces, {foreignKey: { allowNull: false }});
db.users.belongsTo(db.cities); //, {foreignKey: { allowNull: false }});

db.postcodes = require('./locations/postcodeModel')(sequelize, DataTypes);
db.postcodes.belongsToMany(db.cities, { through: 'cities_postcodes', timestamps: false });
db.cities.belongsToMany(db.postcodes, { through: 'cities_postcodes', timestamps: false });
db.users.belongsTo(db.postcodes); //, {foreignKey: { allowNull: false }});

// Initial connections
if(process.env.NODE_ENV !== 'test') dbSetup();

module.exports = db;