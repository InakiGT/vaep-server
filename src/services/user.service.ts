import bcrypt from 'bcrypt'
import { User } from '../database/schemas/user.schema'

class UserService {
	async findAll() {
		try {
			const users = await User.find()
			const data = users.map(user => {
				const realuser = user.toObject()
				delete realuser.password

				return realuser
			})

			return data
		} catch(err) {
			console.error('Error trying to get users from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async findOneById(id: string) {
		try {
			const user = await User.findById(id).exec()
			const data = user?.toObject()
			delete data?.password

			return data
		} catch(err) {
			console.error('Error trying to get a user from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async findUserByEmail(email: string) {
		try {
			const data = await User.findOne({ email })

			return data
		} catch(err) {
			console.error('Error trying to get a user from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async create(userData: any) {
		try {
			if ( !userData.password ) {
				throw new Error('Invalid data')
			}

			const password = await bcrypt.hash(userData.password, 10)

			userData.password = password

			const theme = new User(userData)
			const response = await theme.save()

			return response
		} catch (err) {
			console.error('Error trying to create a user into DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async update(id: string, userData: any) {
		try {
			if ( userData.password ) {
				const password = await bcrypt.hash(userData.password, 10)
				userData.password = password
			}

			const response = User.findByIdAndUpdate({ _id: id }, { ...userData })

			return response
		} catch (err) {
			console.error('Error trying to update a user into DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async delete(id: string) {
		try {
			await User.findOneAndDelete({ _id: id })

			return `El usuario con id: ${ id } fue eliminado`
		} catch(err) {
			console.error('Error trying to remove a user from DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}
}

export default UserService
