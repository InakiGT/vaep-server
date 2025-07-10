import { Router } from 'express'
import ThemeService from '../services/theme.service'

const router = Router()
const service = new ThemeService()

/**
 * @swagger
 * /theme:
 *   get:
 *     summary: Obtener todos los temas
 *     tags: [Temas]
 *     responses:
 *       200:
 *         description: Lista de temas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   course:
 *                     type: string
 *                   __v:
 *                     type: number
 *       500:
 *         description: Error interno del servidor
 */
router.get('/', async (_, res) => {
	try {
		const data = await service.findAll()

		res
			.status(200)
			.json({
				data,
			})
	} catch (err) {
		res
			.status(500)
			.json({
				error: err,
			})
	}
})

/**
 * @swagger
 * /theme/{id}:
 *   get:
 *     summary: Obtener un tema por ID
 *     tags: [Temas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema
 *     responses:
 *       200:
 *         description: Tema encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 course:
 *                   type: string
 *                 __v:
 *                   type: number
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const data = await service.findOne(id)

		res
			.status(200)
			.json({
				data,
			})
	} catch (err) {
		res
			.status(500)
			.json({
				error: err,
			})
	}
})

/**
 * @swagger
 * /theme:
 *   post:
 *     summary: Crear un nuevo tema
 *     tags: [Temas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - course
 *             properties:
 *               name:
 *                 type: string
 *                 example: Interfaces de Usuario
 *               course:
 *                 type: string
 *                 example: 64c86f2d9a8f9a1e3d6a1b21
 *     responses:
 *       201:
 *         description: Tema creado exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', async (req, res) => {
	try {
		const { body } = req
		const data = await service.create(body)

		res
			.status(201)
			.json({
				data,
			})
	} catch (err) {
		res
			.status(500)
			.json({
				error: err,
			})
	}
})

/**
 * @swagger
 * /theme/{id}:
 *   patch:
 *     summary: Actualizar un tema por ID
 *     tags: [Temas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: UI Avanzada
 *               course:
 *                 type: string
 *                 example: 64c86f2d9a8f9a1e3d6a1b21
 *     responses:
 *       204:
 *         description: Tema actualizado correctamente (sin contenido)
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id', async (req, res) => {
	try {
		const { id } = req.params
		const { body } = req

		await service.update(id, body)

		res
			.status(204)
			.json()
	} catch (err) {
		res
			.status(500)
			.json({
				error: err,
			})
	}
})

/**
 * @swagger
 * /theme/{id}:
 *   delete:
 *     summary: Eliminar un tema por ID
 *     tags: [Temas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema a eliminar
 *     responses:
 *       204:
 *         description: Tema eliminado correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', async (req, res) => {
	try {
		const { id } = req.params

		const data = await service.delete(id)
		console.log(data)

		res
			.status(204)
			.json()
	} catch (err) {
		res
			.status(500)
			.json({
				error: err,
			})
	}
})

export default router
