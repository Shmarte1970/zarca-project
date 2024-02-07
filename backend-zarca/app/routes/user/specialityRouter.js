const modelController = require('../../controllers/user/specialityController');
const router = require('express').Router();
const passport = require('passport');

/**
 * @openapi
 * components:
 *   schemas:
 *     NewSpeciality:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The speciality name.
 *           example: Programmer 
 *     Speciality:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The speciality ID.
 *               example: 523 
 *         - $ref: '#/components/schemas/NewSpeciality'
 */

/**
 * @openapi
 * /specialities:
 *   post:
 *     summary: Create a new speciality
 *     description: Create a new speciality
 *     tags:
 *      - Specialities
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSpeciality'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Speciality'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.post('/', passport.authenticate('jwt', { session: false}), modelController.createEntity);

/**
 * @openapi
 * /specialities:
 *   get:
 *     summary: Retrieve a list of speciality.
 *     description: Retrieve a list of all specialities. Some filters can be applied.
 *     tags:
 *      - Specialities
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: A list of specialities.
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
 *                      $ref: '#/components/schemas/Speciality'
 */
router.get('/', passport.authenticate('jwt', { session: false}), modelController.getAll);

/**
 * @openapi
 * /specialities/{id}:
 *   get:
 *     summary: Retrieve a single speciality.
 *     description: Retrieve a single speciality id.
 *     tags:
 *      - Specialities
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the speciality to retrieve.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: A single speciality.
 *         content:
 *           application/json:
 *             schema:
 *               type: object             
 *               $ref: '#/components/schemas/Speciality'
*/
router.get('/:id', passport.authenticate('jwt', { session: false}), modelController.get);

/**
 * @openapi
 * /specialities/{id}:
 *   put:
 *     summary: Update fields for a existing speciality.
 *     description: Update fields for a existing speciality. Only body fields will be updated.
 *     tags:
 *      - Specialities
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the speciality to retrieve.
 *         schema:
 *           type: integer 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSpeciality'
 *     responses:
 *       200:
 *         description: Speciality modified correctly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Speciality'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.put('/:id', passport.authenticate('jwt', { session: false}), modelController.updateEntity);

/**
 * @openapi
 * /specialities/{id}:
 *   delete:
 *     summary: Delete a speciality.
 *     description: Delete a existing speciality. If speciality not exist, not error message will be throw (for security reasons).
 *     tags:
 *      - Specialities
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the speciality to delete.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: Speciality deleted correctly
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
 *                   example: Speciality was deleted 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false}), modelController.deleteEntity);

module.exports = router;