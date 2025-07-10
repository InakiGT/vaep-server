import { Router } from 'express'
import passport from 'passport'
import GameService from '../services/game.service'

const router = Router()

const service = new GameService()

router.get('/',
	passport.authenticate('jwt', { session: false }),
	async (_, res) => {
		try {
			const data = await service.findAll()

			res
				.status(200)
				.json({
					data,
				})
		} catch(err) {
			res
				.status(500)
				.json({
					error: err,
				})
		}
	}
)

router.get('/:id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const { id } = req.params
			const data = await service.findOneById(id)

			res
				.status(200)
				.json({
					data,
				})
		} catch(err) {
			res
				.status(500)
				.json({
					error: err,
				})
		}
	}
)

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
		} catch(err) {
			res
				.status(500)
				.json({
					error: err,
				})
		}
	}
)

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
		} catch(err) {
			res
				.status(500)
				.json({
					error: err,
				})
		}
	}
)

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
		} catch(err) {
			res
				.status(500)
				.json({
					error: err,
				})
		}
	}
)

export default router
