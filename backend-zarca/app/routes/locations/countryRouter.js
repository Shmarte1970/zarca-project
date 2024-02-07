const modelController = require('../../controllers/locations/countryController');
const router = require('express').Router();
const passport = require('passport');

/**
 * @openapi
 * components:
 *   schemas:
 *     NewCountry:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The country name.
 *           example: Spain
 *     Country:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The country ID.
 *               example: 523 
 *         - $ref: '#/components/schemas/NewCountry'
 */

/**
 * @openapi
 * /countries:
 *   post:
 *     summary: Create a new country
 *     description: Create a new country
 *     tags:
 *      - Locations/Countries
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCountry'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.post('/', passport.authenticate('jwt', { session: false}), modelController.createEntity);

/**
 * @openapi
 * /countries:
 *   get:
 *     summary: Retrieve a list of countries.
 *     description: Retrieve a list of all countries. Some filters can be applied.
 *     tags:
 *      - Locations/Countries
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: A list of countries.
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
 *                      $ref: '#/components/schemas/Country'
 */
router.get('/', passport.authenticate('jwt', { session: false}), modelController.getAll);

/**
 * @openapi
 * /countries/{id}:
 *   get:
 *     summary: Retrieve a single country.
 *     description: Retrieve a single country id.
 *     tags:
 *      - Locations/Countries
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the country to retrieve.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: A single country.
 *         content:
 *           application/json:
 *             schema:
 *               type: object             
 *               $ref: '#/components/schemas/Country'
*/
router.get('/:id', passport.authenticate('jwt', { session: false}), modelController.get);

/**
 * @openapi
 * /countries/{id}:
 *   put:
 *     summary: Update fields for a existing country.
 *     description: Update fields for a existing country. Only body fields will be updated.
 *     tags:
 *      - Locations/Countries
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the country to update.
 *         schema:
 *           type: integer 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCountry'
 *     responses:
 *       200:
 *         description: Country modified correctly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Country'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.put('/:id', passport.authenticate('jwt', { session: false}), modelController.updateEntity);

/**
 * @openapi
 * /countries/{id}:
 *   delete:
 *     summary: Delete a country.
 *     description: Delete a existing country. If country not exist, not error message will be throw (for security reasons).
 *     tags:
 *      - Locations/Countries
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the country to delete.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: Country deleted correctly
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
 *                   example: Country was deleted 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false}), modelController.deleteEntity);

module.exports = router;