import { Router } from 'express'
import passport from 'passport'
import AuthService from '../services/auth.service'

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

export default router
