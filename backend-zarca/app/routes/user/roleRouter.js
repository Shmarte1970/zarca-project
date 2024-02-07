const roleController = require('../../controllers/user/roleController');
const router = require('express').Router();
const passport = require('passport');

/**
 * @openapi
 * components:
 *   schemas:
 *     NewRole:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The role name.
 *           example: Administrator         
 *     Role:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The role ID.
 *               example: 523 
 *         - $ref: '#/components/schemas/NewRole' 
 */

/**
 * @openapi
 * /roles:
 *   post:
 *     summary: Create a new role
 *     description: Create a new role
 *     tags:
 *      - Roles
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRole'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.post('/', passport.authenticate('jwt', { session: false}), roleController.createEntity);

/**
 * @openapi
 * /roles:
 *   get:
 *     summary: Retrieve a list of roles.
 *     description: Retrieve a list of all roles. Some filters can be applied.
 *     tags:
 *      - Roles
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: A list of roles.
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
 *                      $ref: '#/components/schemas/Role'
 */
router.get('/', passport.authenticate('jwt', { session: false}), roleController.getAll);

/**
 * @openapi
 * /roles/{id}:
 *   get:
 *     summary: Retrieve a single role.
 *     description: Retrieve a single role by id.
 *     tags:
 *      - Roles
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the role to retrieve.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: A single role.
 *         content:
 *           application/json:
 *             schema:
 *               type: object             
 *               $ref: '#/components/schemas/Role'
*/
router.get('/:id', passport.authenticate('jwt', { session: false}), roleController.get);

/**
 * @openapi
 * /roles/{id}:
 *   put:
 *     summary: Update fields for a existing role.
 *     description: Update fields for a existing role. Only body fields will be updated.
 *     tags:
 *      - Roles
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the role to retrieve.
 *         schema:
 *           type: integer 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewRole'
 *     responses:
 *       200:
 *         description: Role modified correctly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.put('/:id', passport.authenticate('jwt', { session: false}), roleController.updateEntity);

/**
 * @openapi
 * /roles/{id}:
 *   delete:
 *     summary: Delete a role.
 *     description: Delete a existing role. If role not exist, not error message will be throw (for security reasons).
 *     tags:
 *      - Roles
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the role to delete.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: Role deleted correctly
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
 *                   example: Role was deleted 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false}), roleController.deleteEntity);

module.exports = router;