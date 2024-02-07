const authController = require('../../controllers/user/authController');
const router = require('express').Router();

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Login user.
 *     description: Check user credentials and return token and refresh token on success.
 *      - Users
 *     tags:
 *      - Auth     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:               
 *               - type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: Username
 *                     example: Username 
 *               - type: object
 *                 properties:
 *                   password: 
 *                     type: string
 *                     description: A valid strong password
 *                     example: Adm1nistrat@r.com
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:    
 *               allOf:
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       description: Login was succcessfully  
 *                       example: true
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Login messsage
 *                       example: Login successfully
 *                 - type: object
 *                   properties:
 *                      user: 
 *                        $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token 
 *                       example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJkZXZlbG9wbWVudElkIjoyLCJuYW1lIjoiRGF2aWQiLCJsYXN0bmFtZSI6IlbDqWxleiIsImVtYWlsIjoiZGF2ZWxvcEBnbWFpbC5jb20iLCJ0YXhJZCI6Ijc1NzYxMzcxRyIsInN0YXR1cyI6MCwiY3JlYXRlZEF0IjoiMjAyMy0wOS0wNFQxMzo1ODozOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0wNFQxMzo1ODozOS4wMDBaIn0sInJmc2giOmZhbHNlLCJpYXQiOjE2OTM4MzU5NTMsImV4cCI6MTY5MzkyMjM1M30.QwMyZAgjYflshId6DcbuAuDwJJjuYZLACE-gkxbJ0YmTr3kIrtTvHdue4RF-cXzzDML2V8szfP14-qQUP1vXg3
 *                 - type: object
 *                   properties:
 *                     tokenRefresh:
 *                       type: string
 *                       description: JWT token refresh for autologin
 *                       example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJkZXZlbG9wbWVudElkIjoyLCJuYW1lIjoiRGF2aWQiLCJsYXN0bmFtZSI6IlbDqWxleiIsImVtYWlsIjoiZGF2ZWxvcEBnbWFpbC5jb20iLCJ0YXhJZCI6Ijc1NzYxMzcxRyIsInN0YXR1cyI6MCwiY3JlYXRlZEF0IjoiMjAyMy0wOS0wNFQxMzo1ODozOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0wNFQxMzo1ODozOS4wMDBaIn0sInJmc2giOnRydWUsImlhdCI6MTY5MzgzNTk1MywiZXhwIjoxNjk0Njk5OTUzfQ.W4JtNbvHDHvX9NnYmbxLO6t-vUR8UU7YMx7QC0soXEk4SHiABMJysXrjPfp5uG2iNxc7dTx0Sp0Mmoo3ss8S15 
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
*/
router.post('/login', authController.login);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Refresh user's token.
 *     description: Check user refresh token and generate new tokens on success.  
 *     tags:
 *       - Auth     
 *     parameters:
 *       - in: header
 *         name: refresh
 *         schema:
 *           type: string
 *           description: JWT refresh token
 *           example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJkZXZlbG9wbWVudElkIjoyLCJuYW1lIjoiRGF2aWQiLCJsYXN0bmFtZSI6IlbDqWxleiIsImVtYWlsIjoiZGF2ZWxvcEBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR5TnZVTjduY3llRGJZbHFXSWRpSzllZzVsUkVNYVlhRmdNVlVRSlBiY2p4UGZOVlBPa3k5aSIsInRheElkIjoiNzU3NjEzNzFHIiwic3RhdHVzIjowLCJjcmVhdGVkQXQiOiIyMDIzLTA5LTA2VDE0OjI2OjI2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA5LTA2VDE0OjI2OjI2LjAwMFoifSwicmZzaCI6dHJ1ZSwiaWF0IjoxNjk0MDEwNDUxLCJleHAiOjE2OTQ4NzQ0NTF9.mg1OW4dkqBhwRtVZOTPb0Ygs8JRHlspWBxHg4V01hxRdA398_-5Art_dGNgdtmFJYmxY3rLmbe66qMBhPIyxbA
 *           required: true     
 *     responses:
 *       200:
 *         description: Refresh successfully
 *         content:
 *           application/json:
 *             schema:    
 *               allOf:
 *                 - type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       description: Token was succcessfully refreshed
 *                       example: true
 *                 - type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: Refresh messsage
 *                       example: Token refreshed
 *                 - type: object
 *                   properties:
 *                      user: 
 *                        $ref: '#/components/schemas/User'
 *                 - type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token 
 *                       example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJkZXZlbG9wbWVudElkIjoyLCJuYW1lIjoiRGF2aWQiLCJsYXN0bmFtZSI6IlbDqWxleiIsImVtYWlsIjoiZGF2ZWxvcEBnbWFpbC5jb20iLCJ0YXhJZCI6Ijc1NzYxMzcxRyIsInN0YXR1cyI6MCwiY3JlYXRlZEF0IjoiMjAyMy0wOS0wNFQxMzo1ODozOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0wNFQxMzo1ODozOS4wMDBaIn0sInJmc2giOmZhbHNlLCJpYXQiOjE2OTM4MzU5NTMsImV4cCI6MTY5MzkyMjM1M30.QwMyZAgjYflshId6DcbuAuDwJJjuYZLACE-gkxbJ0YmTr3kIrtTvHdue4RF-cXzzDML2V8szfP14-qQUP1vXg3
 *                 - type: object
 *                   properties:
 *                     tokenRefresh:
 *                       type: string
 *                       description: JWT token refresh for autologin
 *                       example: eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJkZXZlbG9wbWVudElkIjoyLCJuYW1lIjoiRGF2aWQiLCJsYXN0bmFtZSI6IlbDqWxleiIsImVtYWlsIjoiZGF2ZWxvcEBnbWFpbC5jb20iLCJ0YXhJZCI6Ijc1NzYxMzcxRyIsInN0YXR1cyI6MCwiY3JlYXRlZEF0IjoiMjAyMy0wOS0wNFQxMzo1ODozOS4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMy0wOS0wNFQxMzo1ODozOS4wMDBaIn0sInJmc2giOnRydWUsImlhdCI6MTY5MzgzNTk1MywiZXhwIjoxNjk0Njk5OTUzfQ.W4JtNbvHDHvX9NnYmbxLO6t-vUR8UU7YMx7QC0soXEk4SHiABMJysXrjPfp5uG2iNxc7dTx0Sp0Mmoo3ss8S15 
 *       401:
 *         $ref: '#/components/responses/401Unauthorized'
*/
router.post('/refresh', authController.tokenRefresh);

module.exports = router;