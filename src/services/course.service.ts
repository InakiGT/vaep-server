import { Course } from '../database/schemas/course'
import { Theme } from '../database/schemas/theme'

class CourseService {
	async findAll() {
		try {
			const data = await Course.find()

			return data
		} catch (err) {
			console.error('Error trying to get courses from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async findOne(id: string) {
		try {
			const course = await Course.findById(id).exec()

			if (!course) {
				throw new Error('Curso no encontrado')
			}

			const themes = await Theme.find({ course: course._id })

			const data = {
				...course.toObject(),
				themes
			}


			return data
		} catch (err) {
			console.error('Error trying to get a course from DB: ', err)
			throw new Error('Error al consultar la base de datos')
		}
	}

	async create(courseData: any) {
		try {
			const course = new Course(courseData)
			const response = await course.save()

			return response
		} catch (err) {
			console.error('Error trying to create a course into DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async update(id: string, data: any) {
		try {
			const response = await Course.findByIdAndUpdate({ _id: id }, { ...data })

			return response
		} catch (err) {
			console.error('Error trying to update a course from DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}

	async delete(id: string) {
		try {
			await Course.findOneAndDelete({ _id: id })

			return `La materia con id: ${ id } fue eliminada`
		} catch (err) {
			console.error('Error trying to remove a course from DB: ', err)
			throw new Error('Error al modificar la base de datos')
		}
	}
}

export default CourseService
