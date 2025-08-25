import express from "express"
import { getContacts, createContact, updateContact, deleteContact, getContact } from "../controllers/contactController.js"
import { validateToken } from "../middleware/validateTokenHandler.js"



const router = express.Router()
router.use(validateToken)

/**
 * @openapi
 * tags:
 *   - name: Contacts
 *     description: Manage contacts
 */

/**
 * @openapi
 * /contacts:
 *   get:
 *     summary: List contacts
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.route("/").get(getContacts)

/**
 * @openapi
 * /contacts:
 *   post:
 *     summary: Create a contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ContactCreate'
 *     responses:
 *       201:
 *         description: Contact created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Validation failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 */
router.route("/").post(createContact)
    /**
     * @openapi
     * /contacts/{id}:
     *   put:
     *     summary: Update a contact
     *     tags: [Contacts]
     *     security:
     *       - bearerAuth: []
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: string
     *           pattern: "^[0-9a-fA-F]{24}$"
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ContactCreate'
     *     responses:
     *       200:
     *         description: Updated contact
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Contact'
     *       404:
     *         description: Not found
     */
router.route("/:id").put(updateContact)

/**
 * @openapi
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *     responses:
 *       204:
 *         description: Deleted (no content)
 *       404:
 *         description: Not found
 */
router.route("/:id").delete(deleteContact)

/**
 * @openapi
 * /contacts/{id}:
 *   get:
 *     summary: Get a contact by id
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           pattern: "^[0-9a-fA-F]{24}$"
 *         description: MongoDB ObjectId
 *     responses:
 *       200:
 *         description: A contact
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Invalid id
 *       404:
 *         description: Not found
 */
router.route("/:id").get(getContact)

export default router;