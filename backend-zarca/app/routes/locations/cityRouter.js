const modelController = require('../../controllers/locations/cityController');
const router = require('express').Router();
const passport = require('passport');

/**
 * @openapi
 * components:
 *   schemas:
 *     NewCity:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The city name.
 *           example: Badalona
 *         countryId:
 *           type: integer
 *           description: The province id for this city.
 *           example: 1
 *     City:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The city ID.
 *               example: 523 
 *         - $ref: '#/components/schemas/NewCity'
 */

/**
 * @openapi
 * /cities:
 *   post:
 *     summary: Create a new city
 *     description: Create a new city
 *     tags:
 *      - Locations/Cities
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCity'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.post('/', passport.authenticate('jwt', { session: false}), modelController.createEntity);

/**
 * @openapi
 * /cities:
 *   get:
 *     summary: Retrieve a list of cities.
 *     description: Retrieve a list of all cities. Some filters can be applied.
 *     tags:
 *      - Locations/Cities
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: A list of cities.
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
 *                      $ref: '#/components/schemas/City'
 */
router.get('/', passport.authenticate('jwt', { session: false}), modelController.getAll);

/**
 * @openapi
 * /cities/{id}:
 *   get:
 *     summary: Retrieve a single city.
 *     description: Retrieve a single city id.
 *     tags:
 *      - Locations/Cities
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the city to retrieve.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: A single city.
 *         content:
 *           application/json:
 *             schema:
 *               type: object             
 *               $ref: '#/components/schemas/City'
*/
router.get('/:id', passport.authenticate('jwt', { session: false}), modelController.get);

/**
 * @openapi
 * /cities/{id}:
 *   put:
 *     summary: Update fields for a existing city.
 *     description: Update fields for a existing city. Only body fields will be updated.
 *     tags:
 *      - Locations/Cities
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the city to retrieve.
 *         schema:
 *           type: integer 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCity'
 *     responses:
 *       200:
 *         description: City modified correctly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.put('/:id', passport.authenticate('jwt', { session: false}), modelController.updateEntity);

/**
 * @openapi
 * /cities/{id}:
 *   delete:
 *     summary: Delete a city.
 *     description: Delete a existing city. If city not exist, not error message will be throw (for security reasons).
 *     tags:
 *      - Locations/Cities
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the city to delete.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: City deleted correctly
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
 *                   example: City was deleted 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false}), modelController.deleteEntity);

module.exports = router;