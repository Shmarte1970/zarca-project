const fixtures = {};

fixtures.loadData = async (sequelize) => {
    await sequelize.query("INSERT IGNORE INTO roles (id, name) VALUES (1, 'Admin')");
    await sequelize.query("INSERT IGNORE INTO roles (id, name) VALUES (2, 'Clients')");
    await sequelize.query("INSERT IGNORE INTO roles (id, name) VALUES (3, 'Transports')");
    await sequelize.query("INSERT IGNORE INTO roles (id, name) VALUES (4, 'Invoices')");
    await sequelize.query("INSERT IGNORE INTO roles (id, name) VALUES (5, 'Users')");

    await sequelize.query("INSERT IGNORE INTO specialities (id, name) VALUES (1, 'Programador')");
    await sequelize.query("INSERT IGNORE INTO specialities (id, name) VALUES (2, 'Administrativo')");

    await sequelize.query("INSERT IGNORE INTO categories (id, name, specialityId) VALUES (1, 'Oficial de 1', 1)");
    await sequelize.query("INSERT IGNORE INTO categories (id, name, specialityId) VALUES (2, 'Oficial de 2', 1)");
    await sequelize.query("INSERT IGNORE INTO categories (id, name, specialityId) VALUES (3, 'Oficial de 3', 1)");
    await sequelize.query("INSERT IGNORE INTO categories (id, name, specialityId) VALUES (4, 'Aprendiz', 1)");
    await sequelize.query("INSERT IGNORE INTO categories (id, name, specialityId) VALUES (5, 'Becario', 2)");

    await sequelize.query("INSERT IGNORE INTO countries (id, name) VALUES (1, 'España')");
    await sequelize.query("INSERT IGNORE INTO provinces (id, name, countryId) VALUES (1, 'Barcelona', 1)");
    await sequelize.query("INSERT IGNORE INTO provinces (id, name, countryId) VALUES (2, 'Málaga', 1)");
    await sequelize.query("INSERT IGNORE INTO cities (id, name, provinceId) VALUES (1, 'Badalona', 1)");
    await sequelize.query("INSERT IGNORE INTO cities (id, name, provinceId) VALUES (2, 'Málaga', 2)");
    
    await sequelize.query("INSERT IGNORE INTO users (id, name, surnames, email, phone, username, password, createdAt, updatedAt) VALUES (1, 'Admin', 'Admin', 'admin@admin.es', '666666666', '" + process.env.ADMIN_USERNAME + "', '" + process.env.ADMIN_PASSWORD + "', NOW(), NOW())");
    await sequelize.query("INSERT IGNORE INTO users_roles (userId, roleId) VALUES (1, 1)");
    await sequelize.query("INSERT IGNORE INTO users_roles (userId, roleId) VALUES (1, 2)");
    await sequelize.query("INSERT IGNORE INTO users_roles (userId, roleId) VALUES (1, 3)");
    await sequelize.query("INSERT IGNORE INTO users_roles (userId, roleId) VALUES (1, 4)");

    console.log("\x1b[32mDB fixtures loaded!\x1b[0m");
};

module.exports = fixtures;