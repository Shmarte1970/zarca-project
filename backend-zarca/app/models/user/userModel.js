module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Name cannot be empty"
                },                
            }
        },
        surnames:{
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Surnames cannot be empty"
                },                
            }
        },
        email:{
            type: DataTypes.STRING,            
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Email cannot be empty"
                },
                isEmail: {
                    msg: "Email is not a valid format"
                }
            }
        },
        phone:{
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Phone cannot be empty"
                },                
            }
        },        
        username:{
            type: DataTypes.STRING,
            unique: {
                msg: 'Username is already in use',
            },
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Username cannot be empty"
                }                
            }
        },
        password:{
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Password is not a valid format"
                }
            }
        },        
        enabled:{
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },         
        disabledAt:{            
            type: DataTypes.DATE,
            allowNull: true,
        }        
    });

    return User;
};