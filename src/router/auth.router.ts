import { Router } from 'express'
import passport from 'passport'
import AuthService from '../services/auth.service'

interface Token {
	sub: string
}

const router = Router()

const service = new AuthService()

router.post('/login',
	passport.authenticate('local', { session: false }),
	async (req, res) => {
	try {
		const data = await service.signToken(req.user)

		res
			.status(200)
			.json({
				data
			})
	} catch (err) {
		res
			.status(401)
			.json({
				error: err
			})
	}
})

router.post('/request-token',
	async(req, res) => {
	try {
		const { email } = req.body

		await service.generateToken(email)

		res
			.status(201)
			.json({
				data: "Token creado exitosamente"
			})
	} catch (err) {
		res
			.status(401)
			.json({
				error: err
			})
	}
})

router.post('/reset-password',
	passport.authenticate('jwt', { session: false }),
	async(req, res) => {
		const { sub } = req.user as Token
		const { password } = req.body

		try {
			await service.resetPassword(sub, password)

			res
				.status(204)
				.json({
					data: "Contraseña restablecida exitosamente"
				})
		} catch (err) {
			res
				.status(401)
				.json({
					error: err
				})
		}
})

export default router
