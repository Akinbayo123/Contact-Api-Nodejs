import express from "express"
import { currentUser, loginUser, registerUser } from "../controllers/userController.js"
import { validateToken } from "../middleware/validateTokenHandler.js"
const router = express.Router()
    /**
     * @openapi
     * tags:
     *   - name: Auth
     *     description: Authentication
     */

/**
 * @openapi
 * /user/login:
 *   post:
 *     summary: Login and get a JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: JWT access token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", loginUser)

/**
 * @openapi
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username: { type: string }
 *               email: { type: string, format: email }
 *               password: { type: string, minLength: 6 }
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation error
 */
router.post("/register", registerUser)

router.get("/current", validateToken, currentUser)
export default router