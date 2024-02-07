const modelController = require('../../controllers/locations/provinceController');
const router = require('express').Router();
const passport = require('passport');

/**
 * @openapi
 * components:
 *   schemas:
 *     NewProvince:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The province name.
 *           example: Barcelona
 *         countryId:
 *           type: integer
 *           description: The country id for this province.
 *           example: 1
 *     Province:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The province ID.
 *               example: 523 
 *         - $ref: '#/components/schemas/NewProvince'
 */

/**
 * @openapi
 * /provinces:
 *   post:
 *     summary: Create a new province
 *     description: Create a new province
 *     tags:
 *      - Locations/Provinces
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProvince'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Province'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.post('/', passport.authenticate('jwt', { session: false}), modelController.createEntity);

/**
 * @openapi
 * /provinces:
 *   get:
 *     summary: Retrieve a list of provinces.
 *     description: Retrieve a list of all provinces. Some filters can be applied.
 *     tags:
 *      - Locations/Provinces
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: A list of provinces.
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
 *                      $ref: '#/components/schemas/Province'
 */
router.get('/', passport.authenticate('jwt', { session: false}), modelController.getAll);

/**
 * @openapi
 * /provinces/{id}:
 *   get:
 *     summary: Retrieve a single province.
 *     description: Retrieve a single province id.
 *     tags:
 *      - Locations/Provinces
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the province to retrieve.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: A single province.
 *         content:
 *           application/json:
 *             schema:
 *               type: object             
 *               $ref: '#/components/schemas/Province'
*/
router.get('/:id', passport.authenticate('jwt', { session: false}), modelController.get);

/**
 * @openapi
 * /provinces/{id}:
 *   put:
 *     summary: Update fields for a existing province.
 *     description: Update fields for a existing province. Only body fields will be updated.
 *     tags:
 *      - Locations/Provinces
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the province to retrieve.
 *         schema:
 *           type: integer 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewProvince'
 *     responses:
 *       200:
 *         description: Province modified correctly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Province'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.put('/:id', passport.authenticate('jwt', { session: false}), modelController.updateEntity);

/**
 * @openapi
 * /provinces/{id}:
 *   delete:
 *     summary: Delete a province.
 *     description: Delete a existing province. If province not exist, not error message will be throw (for security reasons).
 *     tags:
 *      - Locations/Provinces
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the province to delete.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: Province deleted correctly
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
 *                   example: Province was deleted 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false}), modelController.deleteEntity);

module.exports = router;