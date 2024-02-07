const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Zarca',
      version: '1.0.0',
      description:
        'This is a REST API for ZARCA endpoints.',      
      contact: {
        name: 'David Vélez',
        email: 'davelop@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:' + process.env.PORT + '/api/v' + process.env.API_VERSION,
        description: 'Development server',
      },
    ],    
  };

const options = { swaggerDefinition, apis: ['./app/config/openAPI.js', './app/routes/*.js', './app/routes/user/*.js', './app/routes/locations/*.js'] };

const swaggerSpec = swaggerJSDoc(options);
const optionsSwaggerUI = { customCss: '.swagger-ui .topbar, .swagger-ui section.models { display: none }' }

const openApi = { swaggerSpec: swaggerSpec, swaggerUi: swaggerUi, optionsSwaggerUI: optionsSwaggerUI };

/**
 * @openapi
 * components:
 *   schemas:
 *     pagerInfo:
 *       type: object
 *       properties:
 *         totalPages:
 *           type: integer
 *           description: List total pages.
 *           example: 22
 *         page:
 *           type: integer
 *           description: List current page.
 *           example: 3
 *         pageSize:
 *           type: integer
 *           description: Rows per page.
 *           example: 10
 *         totalRows:
 *           type: integer
 *           description: Total list rows.
 *           example: 216
 *         rows:
 *           type: integer
 *           description: Current page rows.
 *           example: 10
 *         from:
 *           type: integer
 *           description: From row number.
 *           example: 21
 *         to:
 *           type: integer
 *           description: To row number.
 *           example: 30
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT 
 *   responses:
 *     400Persist:
 *       description: Bad request
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 description: Main response status.
 *                 example: false
 *               errors:
 *                 type: array
 *                 items: 
 *                   type: string
 *                   description: Error description.
 *
 *     401Unauthorized:
 *       description: Unauthorized
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 description: Main response status.
 *                 example: false
 *               data:
 *                 type: string  
 *                 description: Error description.
 */
module.exports = openApi;