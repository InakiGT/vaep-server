import jwt from 'jsonwebtoken'
import config from '../config/index'
import UserService from './user.service'
import bcrypt from 'bcrypt'

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
}

export default AuthService
