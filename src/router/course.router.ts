import { Router } from 'express'
import CourseService from '../services/course.service'
import passport from 'passport'

const router = Router()
const service = new CourseService()

/**
 * @swagger
 * /course:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Materias]
 *     responses:
 *       200:
 *         description: Lista de cursos
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
 *                   __v:
 *                     type: number
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
 * /course/{id}:
 *   get:
 *     summary: Obtener un curso por ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
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
 * /course:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Curso de Programación
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
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
 * /course/{id}:
 *   patch:
 *     summary: Actualizar un curso por ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Curso actualizado
 *     responses:
 *       204:
 *         description: Curso actualizado correctamente (sin contenido)
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
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
 * /course/{id}:
 *   delete:
 *     summary: Eliminar un curso por ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso a eliminar
 *     responses:
 *       204:
 *         description: Curso eliminado correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
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
