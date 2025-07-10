import { Router } from 'express'
import UserService from '../services/user.service'
import passport from 'passport'

const router = Router()

const service = new UserService()

interface Token {
	sub: string
}

router.get('/', async (_, res) => {
	try {
		const data = await service.findAll()

		res
			.status(200)
			.json({
				data
			})
	} catch(err) {
		res
			.status(500)
			.json({
				error: err
			})
	}
})

router.get('/:id', async (req, res) => {
	try {
		const { id }= req.params
		const data = await service.findOneById(id)

		res
			.status(200)
			.json({
				data
			})
	} catch(err) {
		res
			.status(500)
			.json({
				error: err
			})
	}
})

router.post('/', async (req, res) => {
	try {
		const { body } = req
		const data = await service.create(body)

		res
			.status(201)
			.json({
				data
			})
	} catch(err) {
		res
			.status(500)
			.json({
				error: err
			})
	}
})

router.patch('/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
	try {
		const { sub } = req.user as Token

		const { body } = req
		await service.update(sub, body)

		res
			.status(204)
			.json()
	} catch(err) {
		res
			.status(500)
			.json({
				error: err
			})
	}
})

router.delete('/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
	try {
		const { sub } = req.user as Token

		if ( sub === req.params.id ) {
			const data = await service.delete(sub)

			console.log(data)
			res
				.status(204)
				.json()
		} else {
			res
				.status(401)
				.json({
					error: 'No tienes permiso para eliminar a este usuario'
				})
		}
	} catch(err) {
		res
			.status(500)
			.json({
				error: err
			})
	}
})

export default router
