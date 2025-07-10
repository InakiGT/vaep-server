import { Course } from '../database/schemas/course'
import { MultipleChoiceQuestion } from '../database/schemas/mcquestion'
import { OpenQuestion } from '../database/schemas/openequestion.schema'
import { Theme } from '../database/schemas/theme'

class ThemeService {
	async findAll() {
		try {
			const data = await Theme.find()

			return data
		} catch (err) {
			console.error('Error trying to get courses from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async findOne(id: string) {
		try {
			const theme = await Theme.findById(id).exec()

			if ( !theme ) {
				throw new Error('Tema no encontrado')
			}

			const openQuestions = await OpenQuestion.find({ theme: theme._id })
			const mcQuestions = await MultipleChoiceQuestion.find({ theme: theme._id })

			const data = {
				...theme.toObject(),
				openQuestions,
				mcQuestions,
			}

			return data
		} catch (err) {
			console.error('Error trying to get a theme from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async create(themeData: any) {
		try {
			const theme = new Theme(themeData)
			const response = await theme.save()

			return response
		} catch (err) {
			console.error('Error trying to create a theme into DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async update(id: string, data: any) {
		try {
			const response = await Theme.findByIdAndUpdate({ _id: id }, { ...data })

			return response
		} catch (err) {
			console.error('Error trying to update a theme from DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async delete(id: string) {
		try {
			await Theme.findOneAndDelete({ _id: id })

			return `La materia con id: ${ id } fue eliminada`
		} catch (err) {
			console.error('Error trying to remove a theme from DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}
}

export default ThemeService
