const userController = require('../../controllers/user/userController');
const router = require('express').Router();
const passport = require('passport');

/**
 * @openapi
 * components:   
 *   schemas:
 *     NewUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user's name.
 *           example: Leanne
 *         surnames:
 *           type: string
 *           description: The user's surnames.
 *           example: Graham Bell         
 *         email:
 *           type: string
 *           description: The user's email.
 *           example: leane.graham@thecompany.com         
 *         phone:
 *           type: string
 *           description: The user's phone.
 *           example: 654487751            
 *         username:
 *           type: string
 *           description: The login's username.
 *           example: MyUsername
 * 
 *     User:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The user ID.
 *               example: 0 
 *         - $ref: '#/components/schemas/NewUser'     
 *         - type: object
 *           properties: 
 *             enabled:
 *               type: boolean
 *               description: The user's current status.
 *               example: true
 *             disabledAt:
 *               type: datetime
 *               description: Disabled date.
 *               example: 2023-08-17T16:41:14.000Z
 *             createdAt:
 *               type: datetime
 *               description: Creation date.
 *               example: 2023-08-17T16:41:14.000Z
 *             updatedAt:
 *               type: datetime
 *               description: Update date.
 *               example: 2023-08-18T16:55:34.000Z 
 *             speciality:
 *               type: object
 *               $ref: '#/components/schemas/Speciality'
 *             category:
 *               type: object
 *               $ref: '#/components/schemas/Category'
 *             roles:
 *               type: array
 *               items:
 *                 type: object
 *                 $ref: '#/components/schemas/Role'
 */

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user
 *     tags:
 *      - Users
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:               
 *               - $ref: '#/components/schemas/NewUser'
 *               - type: object
 *                 properties:
 *                   password: 
 *                     type: string
 *                     description: A valid strong password
 *                     example: Adm1nistrat@r.com*               
 *                   specialityId: 
 *                     type: integer
 *                     description: Speciality id for this user
 *                     example: 523
 *                   categoryId: 
 *                     type: integer
 *                     description: Category id for this user
 *                     example: 523
 *                   countryId: 
 *                     type: integer
 *                     description: Country id for this user
 *                     example: 523
 *                   provinceId: 
 *                     type: integer
 *                     description: Province id for this user
 *                     example: 523
 *                   cityId: 
 *                     type: integer
 *                     description: City id for this user
 *                     example: 523
 *                   postcodeId: 
 *                     type: integer
 *                     description: Postcode id for this user
 *                     example: 523
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.post('/', passport.authenticate('jwt', { session: false}), userController.createEntity);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retrieve a list of users.
 *     description: Retrieve a list of all users. Some filters can be applied.
 *     tags:
 *      - Users
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: query
 *         name: text
 *         description: Text to search in fields name, lastname and email. Can have wildcards (%myText%)
 *         schema:
 *           type: text 
 *       - in: query
 *         name: roleDetails
 *         description: Include role ans permissions details for all users
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema: 
 *                type: object
 *                properties:
 *                  info:
 *                    $ref: '#/components/schemas/pagerInfo'
 *                  entities:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/User'
 */
router.get('/', passport.authenticate('jwt', { session: false}), userController.getAll);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Retrieve a single user.
 *     description: Retrieve a single user by id.
 *     tags:
 *      - Users
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: A single user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object             
 *               $ref: '#/components/schemas/User'
*/
router.get('/:id', passport.authenticate('jwt', { session: false}), userController.get);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update fields for an existing user.
 *     description: Update fields for an existing user. Only body fields will be updated.
 *     tags:
 *      - Users
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:               
 *               - $ref: '#/components/schemas/NewUser'
 *               - type: object
 *                 properties:
 *                   password: 
 *                     type: string
 *                     description: A valid strong password
 *                     example: Adm1nistrat@r.com*               
 *                   specialityId: 
 *                     type: integer
 *                     description: Speciality id for this user
 *                     example: 523
 *                   categoryId: 
 *                     type: integer
 *                     description: Category id for this user
 *                     example: 523
 *                   countryId: 
 *                     type: integer
 *                     description: Country id for this user
 *                     example: 523
 *                   provinceId: 
 *                     type: integer
 *                     description: Province id for this user
 *                     example: 523
 *                   cityId: 
 *                     type: integer
 *                     description: City id for this user
 *                     example: 523
 *                   postcodeId: 
 *                     type: integer
 *                     description: Postcode id for this user
 *                     example: 523 
 *     responses:
 *       200:
 *         description: User modified correctly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.put('/:id', passport.authenticate('jwt', { session: false}), userController.updateEntity);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete user.
 *     description: Delete an existing user. If user not exist, not error message will be throw (for security reasons).
 *     tags:
 *      - Users
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to delete.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: User deleted correctly
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Operation complete.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: Success message
 *                   example: User was deleted 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false}), userController.deleteEntity);

/**
 * @openapi
 * /users/{id}/setRoles:
 *   patch:
 *     summary: Set specific roles to user.
 *     description: Set specific roles to user.
 *     tags:
 *      - Users
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user.
 *         schema:
 *           type: integer 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:             
 *             type: array
 *             items:
 *               type: object
 *               $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Roles setted correctly. Return user updated data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.patch('/:id/setRoles', passport.authenticate('jwt', { session: false}), userController.setRoles);

/**
 * @openapi
 * /users/{id}/addRole/{roleId}:
 *   patch:
 *     summary: Add role to user.
 *     description: Add role to user.
 *     tags:
 *      - Users
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user.
 *         schema:
 *           type: integer 
 *       - in: path
 *         name: roleId
 *         required: true
 *         description: Numeric ID of the role to add.
 *         schema:
 *           type: integer  
 *     responses:
 *       200:
 *         description: Role added correctly. Return user updated data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.patch('/:id/addRole/:roleId', passport.authenticate('jwt', { session: false}), userController.addRole);

/**
 * @openapi
 * /users/{id}/removeRole/{roleId}:
 *   patch:
 *     summary: Remove role to user.
 *     description: Remove role to user.
 *     tags:
 *      - Users
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user.
 *         schema:
 *           type: integer 
 *       - in: path
 *         name: roleId
 *         required: true
 *         description: Numeric ID of the role to add.
 *         schema:
 *           type: integer  
 *     responses:
 *       200:
 *         description: Role removed correctly. Return user updated data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.patch('/:id/removeRole/:roleId', passport.authenticate('jwt', { session: false}), userController.removeRole);

/**
 * @openapi
 * /users/{id}/enable:
 *   patch:
 *     summary: Enable user.
 *     description: Enable user.
 *     tags:
 *      - Users
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user.
 *         schema:
 *           type: integer  
 *     responses:
 *       200:
 *         description: User enabled correctly. Return user updated data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.patch('/:id/enable', passport.authenticate('jwt', { session: false}), userController.enable);

/**
 * @openapi
 * /users/{id}/disable:
 *   patch:
 *     summary: Disable user.
 *     description: Disable user.
 *     tags:
 *      - Users
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user.
 *         schema:
 *           type: integer  
 *     responses:
 *       200:
 *         description: User disabled correctly. Return user updated data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.patch('/:id/disable', passport.authenticate('jwt', { session: false}), userController.disable);

module.exports = router;