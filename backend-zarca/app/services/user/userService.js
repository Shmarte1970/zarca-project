const { Op } = require("sequelize");
const { genSaltSync, hashSync } = require("bcrypt");
const validator = require("validator");
const dbUtils = require("../../utils/dbUtils");
const db = require("../../models");
const entityModel = db.users;

const userService = {};

userService.createEntity = async (data, loggedUser) => {
  if (loggedUser && !userService.checkRole(loggedUser, 1))
    throw Error("You are not allowed to perform this action");

  const salt = genSaltSync(10);
  let hashPassword = hashSync(data.password, salt);

  if (
    !validator.isStrongPassword(data.password, {
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    })
  )
    hashPassword = "";
  data.password = hashPassword;

  if (!data.specialityId) delete data.specialityId;
  if (!data.categoryId) delete data.categoryId;
  if (!data.countryId) delete data.countryId;
  if (!data.provinceId) delete data.provinceId;
  if (!data.cityId) delete data.cityId;
  if (!data.postcodeId) delete data.postcodeId;

  let entity = null;
  try {
    entity = entityModel.build(data);
    await entity.validate();
    await entity.save();
  } catch (err) {
    let myError = new Error(dbUtils.getErrors(err));
    myError.dbErrors = dbUtils.getErrors(err);
    throw myError;
  }

  return await userService.get(entity.id);
};

userService.getAll = async (data, loggedUser) => {
  //if(loggedUser && !userService.checkRole(loggedUser, 1)) throw new Error("You are not allowed to perform this action");

  const { limit, offset, page } = dbUtils.paginate(data);
  const where = {};
  if (data.text)
    where[Op.or] = [
      { name: { [Op.like]: "%" + data.text + "%" } },
      { surnames: { [Op.like]: "%" + data.text + "%" } },
      { email: { [Op.like]: "%" + data.text + "%" } },
      { phone: { [Op.like]: "%" + data.text + "%" } },
      { username: { [Op.like]: "%" + data.text + "%" } },
    ];
  if (data.name) where.name = { [Op.like]: "%" + data.name + "%" };
  if (data.surnames) where.surnames = { [Op.like]: "%" + data.surnames + "%" };
  if (data.email) where.email = { [Op.like]: "%" + data.email + "%" };
  if (data.phone) where.phone = { [Op.like]: "%" + data.phone + "%" };
  if (data.username) where.username = { [Op.like]: "%" + data.username + "%" };

  const order = [];

  if (data.orderBy) order.push([data.orderBy, data.orderDir || "ASC"]);

  const { count, rows } = await entityModel.findAndCountAll({
    where: where,
    order: order,
    limit: limit,
    offset: offset,
    include: [
      { model: db.specialities },
      { model: db.categories },
      { model: db.countries },
      { model: db.provinces },
      { model: db.cities },
      { model: db.postcodes },
      { model: db.roles, through: { attributes: [] } },
    ],
    attributes: [
      "id",
      "name",
      "surnames",
      "email",
      "enabled",
      "phone",      
      "username",
      "disabledAt",
      "createdAt",
      "updatedAt",
    ],
  });
  const queryInfo = dbUtils.getPagination(
    count,
    rows.length,
    page,
    limit,
    offset
  );

  return { info: queryInfo, entities: rows };
};

userService.get = async (id, loggedUser) => {
  if (loggedUser) {
    if (loggedUser.id != id && !userService.checkRole(loggedUser, 1))
      throw Error("You are not allowed to perform this action");
  }

  return await entityModel.findOne({
    where: { id: id },
    include: [
      { model: db.specialities },
      { model: db.categories },
      { model: db.countries },
      { model: db.provinces },
      { model: db.cities },
      { model: db.postcodes },
      { model: db.roles, through: { attributes: [] } },
    ],
    attributes: [
      "id",
      "name",
      "surnames",
      "email",
      "enabled",
      "phone",      
      "username",
      "disabledAt",
      "createdAt",
      "updatedAt",
    ],
  });
};

userService.getOneBy = async (data) => {
  const where = {};
  if (data.username) where.username = data.username;

  return await entityModel.findOne({
    where: where,
    include: [{ model: db.roles, through: { attributes: [] } }],
  });
};

userService.updateEntity = async (id, data, loggedUser) => {
  if (loggedUser) {
    if (loggedUser.id != id && !userService.checkRole(loggedUser, 1))
      throw Error("You are not allowed to perform this action");
  }

  delete data.id;
  if (!data.specialityId) delete data.specialityId;
  if (!data.categoryId) delete data.categoryId;
  if (!data.countryId) delete data.countryId;
  if (!data.provinceId) delete data.provinceId;
  if (!data.cityId) delete data.cityId;
  if (!data.postcodeId) delete data.postcodeId;

  if (data.password) {
    const salt = genSaltSync(10);
    let hashPassword = hashSync(data.password, salt);

    if (
      !validator.isStrongPassword(data.password, {
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      })
    )
      hashPassword = "";
    data.password = hashPassword;
  } else delete data.password;

  let entity = null;
  try {
    entity = await userService.get(id);
    if (entity) {
      await entityModel.update(data, { where: { id: id } });
      entity = await userService.get(id);
    } else {
      throw Error("User not found");
    }
  } catch (err) {
    throw Error(dbUtils.getErrors(err));
  }

  return entity;
};

userService.deleteEntity = async (id, loggedUser) => {
  if (loggedUser && !userService.checkRole(loggedUser, 1))
    throw Error("You are not allowed to perform this action");
  if (loggedUser && id == loggedUser.id) throw Error("Can not delete yourself");

  try {
    await entityModel.destroy({ where: { id: id } });
  } catch (err) {
    throw Error(dbUtils.getErrors(err));
  }

  return true;
};

userService.checkRole = (user, roleId) => {
  let hasRol = false;

  if (user.roles.length && roleId) {
    for (let i = 0; i < user.roles.length; i++) {
      if (user.roles[i].id == roleId) hasRol = true;
    }
  }

  //console.log(hasRol);
  return hasRol;
};

userService.setRoles = async (id, roles, loggedUser) => {
  if (loggedUser && !userService.checkRole(loggedUser, 1))
    throw Error("You are not allowed to perform this action");

  try {
    const user = await await userService.get(id);
    if (user) {
      if (Array.isArray(roles) && roles.length > 0 && roles[0]["id"]) {
        // Get real roles
        const arrRoles = [];
        for (let i = 0; i < roles.length; i++) {
          if (roles[i]["id"]) {
            const role = await db.roles.findOne({
              where: { id: roles[i]["id"] },
            });
            if (role) {
              arrRoles.push(role);
            }
          }
        }

        // Set roles
        if (arrRoles.length) {
          await user.setRoles(arrRoles);
          return await userService.get(id);
        } else throw Error("Roles not found");
      } else throw Error("Roles is required");
    } else throw Error("User not found");
  } catch (err) {
    throw Error(dbUtils.getErrors(err));
  }
};

userService.addRole = async (id, roleId, loggedUser) => {
  if (loggedUser && !userService.checkRole(loggedUser, 1))
    throw Error("You are not allowed to perform this action");

  try {
    const user = await await userService.get(id);
    if (user) {
      const role = await db.roles.findOne({ where: { id: roleId } });
      if (role) {
        await user.addRole(role);
        return await userService.get(id);
      } else throw Error("Role not found");
    } else throw Error("User not found");
  } catch (err) {
    throw Error(dbUtils.getErrors(err));
  }
};

userService.removeRole = async (id, roleId, loggedUser) => {
  if (loggedUser && !userService.checkRole(loggedUser, 1))
    throw Error("You are not allowed to perform this action");

  try {
    const user = await userService.get(id);
    if (user) {
      const role = await db.roles.findOne({ where: { id: roleId } });
      if (role) {
        await user.removeRole(role);
        return await userService.get(id);
      } else throw Error("Role not found");
    } else throw Error("User not found");
  } catch (err) {
    throw Error(dbUtils.getErrors(err));
  }
};

userService.enable = async (id, loggedUser) => {
  if (loggedUser && !userService.checkRole(loggedUser, 1))
    throw Error("You are not allowed to perform this action");

  try {
    const user = await userService.get(id);
    if (user) {
      await entityModel.update(
        { disabledAt: null, enabled: true },
        { where: { id: id } }
      );
      return await userService.get(id);
    } else throw Error("User not found");
  } catch (err) {
    throw Error(dbUtils.getErrors(err));
  }
};

userService.disable = async (id, loggedUser) => {
  if (loggedUser && !userService.checkRole(loggedUser, 1))
    throw Error("You are not allowed to perform this action");
  if (loggedUser && id == loggedUser.id)
    throw Error("Can not disable yourself");

  try {
    const user = await userService.get(id);
    if (user) {
      await entityModel.update(
        { disabledAt: new Date(), enabled: false },
        { where: { id: id } }
      );
      return await userService.get(id);
    } else throw Error("User not found");
  } catch (err) {
    throw Error(dbUtils.getErrors(err));
  }
};

module.exports = userService;
