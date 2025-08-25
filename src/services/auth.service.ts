import jwt from 'jsonwebtoken'
import config from '../config/index'
import UserService from './user.service'
import bcrypt from 'bcrypt'
import { sendEmail } from '../utils/email/nodemailer'

class AuthService {
	userService: UserService

	constructor() {
		this.userService = new UserService()
	}

	async getUser(email: string, password: string) {
		try {
			const user = await this.userService.findUserByEmail(email)

			if (!user) {
				throw new Error('No existe el usuario')
			}

			const isMatch = await bcrypt.compare(password, user.password ?? '')

			if (!isMatch) {
				throw new Error('La contraseña es incorrecta')
			}

			delete user.password

			return user

		} catch (err: any) {
				console.error(err)
				throw new Error(err)
			}
	}

	async signToken(user: any) {
		const payload = {
			sub: user._id.toString(),
		}

		const token = jwt.sign(payload, config.jwtSecret)

		return token
	}

	async generateToken(email: string) {
		const payload = {
			sub: email,
			exp: Math.floor(Date.now() / 1000) + (60 * 60),
		}

		const token = jwt.sign(payload, config.jwtSecret)

		await sendEmail(email, token)

		return true
	}

	async resetPassword(email: string, newPassword: string) {
		try {
			await this.userService.updateByEmail(email, { password: newPassword })

			return true
		} catch (err) {
			throw err
		}
	}
}

export default AuthService
