import { OpenQuestion } from '../database/schemas/openequestion.schema'
import { MultipleChoiceQuestion } from '../database/schemas/mcquestion.schema'

class QuestionsService {
	async findAll() {
		try {
			const openQuestions = await OpenQuestion.find()
			const multipleChoiceQuestions = await MultipleChoiceQuestion.find()

			const data = {
				openQuestions,
				multipleChoiceQuestions
			}

			return data
		}	catch (err) {
			console.error('Error trying to get questions from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async findOneMultipleChoice(id: string) {
		try {
			const data = await MultipleChoiceQuestion.findById(id).exec()

			return data
		}	catch (err) {
			console.error('Error trying to get a question from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async findOneOpen(id: string) {
		try {
			const data = await OpenQuestion.findById(id).exec()

			return data
		}	catch (err) {
			console.error('Error trying to get a question from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async findByThemes(themes: [string]) {
		let data

		try {
			if ( typeof themes === 'string' ) {
				const openQuestions = await OpenQuestion.find({ theme: themes })
				const multipleChoiceQuestions = await MultipleChoiceQuestion.find({ theme: themes })

				data = {
					themes,
					openQuestions,
					multipleChoiceQuestions
				}
			} else {
				data = await Promise.all(
					themes.map(async theme => {
						const openQuestions = await OpenQuestion.find({ theme })
						const multipleChoiceQuestions = await MultipleChoiceQuestion.find({ theme })

						return {
							theme,
							openQuestions,
							multipleChoiceQuestions
						}
					})
				)
			}

			return data
		}	catch (err) {
			console.error('Error trying to get questions from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async createMultipleChoice(questionData: any) {
		try {
			const question = new MultipleChoiceQuestion(questionData)
			const response = await question.save()

			return response
		}	catch (err) {
			console.error('Error trying to create a question into DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async createOpen(questionData: any) {
		try {
			const question = new OpenQuestion(questionData)
			const response = await question.save()

			return response
		}	catch (err) {
			console.error('Error trying to create a question into DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async updateMultipleChoice(id: string, data: any) {
		try {
			const response = await MultipleChoiceQuestion.findByIdAndUpdate({ _id: id }, { ...data })

			return response
		} catch (err) {
			console.error('Error trying to update a question from DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async updateOpen(id: string, data: any) {
		try {
			const response = await OpenQuestion.findByIdAndUpdate({ _id: id }, { ...data })

			return response
		} catch (err) {
			console.error('Error trying to update a question from DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async deleteMultipleChoice(id: string) {
		try {
			await MultipleChoiceQuestion.findOneAndDelete({ _id: id })

			return `La pregunta de opción múltiple con id: ${ id } fue eliminada`
		} catch (err) {
			console.error('Error trying to remove a question from DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async deleteOpenQuestion(id: string) {
		try {
			await OpenQuestion.findOneAndDelete({ _id: id })

			return `La pregunta abierta con id: ${ id } fue eliminada`
		} catch (err) {
			console.error('Error trying to remove a question from DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}
}

export default QuestionsService
