module.exports = (sequelize, DataTypes) => {

    const Postcode = sequelize.define("postcode", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        postcode:{
            type: DataTypes.STRING(5),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Postcode cannot be empty"
                },
            }
        }
    }, {
        timestamps: false
    });

    return Postcode;
};