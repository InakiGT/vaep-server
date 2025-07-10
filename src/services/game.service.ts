import { Game } from '../database/schemas/game.schema'

class GameService {
	async findAll() {
		try {
			const data = await Game.find()

			return data
		} catch(err) {
			console.error('Error trying to get games from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async findOneById(id: string) {
		try {
			const data = await Game.findById(id).exec()

			return data
		} catch(err) {
			console.error('Error trying to get a game from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async create(gameData: any) {
		try {
			const game = new Game(gameData)
			const response = await game.save()

			return response
		} catch(err) {
			console.error('Error trying to get games from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async update(id: string, data: any) {
		try {
			const response = await Game.findByIdAndUpdate({ _id: id }, { ...data })

			return response
		} catch(err) {
			console.error('Error trying to get games from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async delete(id: string) {
		try {
			await Game.findOneAndDelete({ _id: id })

			return `El juego con id: ${ id } fue eliminado`
		} catch(err) {
			console.error('Error trying to get games from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}
}

export default GameService
