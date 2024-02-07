const modelController = require('../../controllers/locations/postcodeController');
const router = require('express').Router();
const passport = require('passport');

/**
 * @openapi
 * components:
 *   schemas:
 *     NewPostcode:
 *       type: object
 *       properties:
 *         postcode:
 *           type: string
 *           description: The postcode name.
 *           example: Spain
 *     Postcode:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The postcode ID.
 *               example: 523 
 *         - $ref: '#/components/schemas/NewPostcode'
 */

/**
 * @openapi
 * /postcodes:
 *   post:
 *     summary: Create a new postcode
 *     description: Create a new postcode
 *     tags:
 *      - Locations/Postcodes
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPostcode'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postcode'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.post('/', passport.authenticate('jwt', { session: false}), modelController.createEntity);

/**
 * @openapi
 * /postcodes:
 *   get:
 *     summary: Retrieve a list of postcodes.
 *     description: Retrieve a list of all postcodes. Some filters can be applied.
 *     tags:
 *      - Locations/Postcodes
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: A list of postcodes.
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
 *                      $ref: '#/components/schemas/Postcode'
 */
router.get('/', passport.authenticate('jwt', { session: false}), modelController.getAll);

/**
 * @openapi
 * /postcodes/{id}:
 *   get:
 *     summary: Retrieve a single postcode.
 *     description: Retrieve a single postcode id.
 *     tags:
 *      - Locations/Postcodes
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the postcode to retrieve.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: A single postcode.
 *         content:
 *           application/json:
 *             schema:
 *               type: object             
 *               $ref: '#/components/schemas/Postcode'
*/
router.get('/:id', passport.authenticate('jwt', { session: false}), modelController.get);

/**
 * @openapi
 * /postcodes/{id}:
 *   put:
 *     summary: Update fields for a existing postcode.
 *     description: Update fields for a existing postcode. Only body fields will be updated.
 *     tags:
 *      - Locations/Postcodes
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the postcodes to update.
 *         schema:
 *           type: integer 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewPostcode'
 *     responses:
 *       200:
 *         description: Postcode modified correctly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Postcode'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.put('/:id', passport.authenticate('jwt', { session: false}), modelController.updateEntity);

/**
 * @openapi
 * /postcodes/{id}:
 *   delete:
 *     summary: Delete a postcode.
 *     description: Delete a existing postcode. If postcode not exist, not error message will be throw (for security reasons).
 *     tags:
 *      - Locations/Postcodes
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the postcode to delete.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: Postcode deleted correctly
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
 *                   example: Postcode was deleted 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false}), modelController.deleteEntity);

module.exports = router;