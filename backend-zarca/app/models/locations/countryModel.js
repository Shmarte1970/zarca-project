module.exports = (sequelize, DataTypes) => {

    const Country = sequelize.define("country", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(60),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name cannot be empty"
                },                
            }
        }           
    }, {
        timestamps: false
    });    

    return Country;
};