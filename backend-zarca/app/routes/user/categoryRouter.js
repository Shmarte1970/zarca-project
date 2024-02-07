const modelController = require('../../controllers/user/categoryController');
const router = require('express').Router();
const passport = require('passport');

/**
 * @openapi
 * components:
 *   schemas:
 *     NewCategory:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The category name.
 *           example: Rookie 
 *         specialityId:
 *           type: integer
 *           description: The speciality id for this category.
 *           example: 2
 *     Category:
 *       allOf:
 *         - type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: The category ID.
 *               example: 523 
 *         - $ref: '#/components/schemas/NewCategory'
 */

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category
 *     tags:
 *      - Categories
 *     security:
 *       - BearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.post('/', passport.authenticate('jwt', { session: false}), modelController.createEntity);

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Retrieve a list of categories.
 *     description: Retrieve a list of all categories. Some filters can be applied.
 *     tags:
 *      - Categories
 *     security:
 *       - BearerAuth: [] 
 *     responses:
 *       200:
 *         description: A list of categories.
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
 *                      $ref: '#/components/schemas/Category'
 */
router.get('/', passport.authenticate('jwt', { session: false}), modelController.getAll);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Retrieve a single category.
 *     description: Retrieve a single category id.
 *     tags:
 *      - Categories
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to retrieve.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: A single category.
 *         content:
 *           application/json:
 *             schema:
 *               type: object             
 *               $ref: '#/components/schemas/Category'
*/
router.get('/:id', passport.authenticate('jwt', { session: false}), modelController.get);

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     summary: Update fields for a existing category.
 *     description: Update fields for a existing category. Only body fields will be updated.
 *     tags:
 *      - Categories
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to retrieve.
 *         schema:
 *           type: integer 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewCategory'
 *     responses:
 *       200:
 *         description: Category modified correctly
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         $ref: '#/components/responses/400Persist'
 */
router.put('/:id', passport.authenticate('jwt', { session: false}), modelController.updateEntity);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category.
 *     description: Delete a existing category. If speciality not exist, not error message will be throw (for security reasons).
 *     tags:
 *      - Categories
 *     security:
 *       - BearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the category to delete.
 *         schema:
 *           type: integer 
 *     responses:
 *       200:
 *         description: Category deleted correctly
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
 *                   example: Category was deleted 
 */
router.delete('/:id', passport.authenticate('jwt', { session: false}), modelController.deleteEntity);

module.exports = router;