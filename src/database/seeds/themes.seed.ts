import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Theme } from '../schemas/theme.schema'
import { Course } from '../schemas/course.schema'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || ''

const themesAP = [
	{
		name: 'Clase 8: Administración Eficiente y Errores del Proceso',
		course: '',
	},
	{
		name: 'Recursos, medidas, métricas e indicadores',
		course: '',
	},
	{
		name: 'Clase 4: "El Problema"',
		course: '',
	},
	{
		name: 'Clase 10: Estimación',
		course: '',
	},
]

const themesAR = [
	{
		name: 'Métodos de comunicación',
		course: '',
	},
]

async function connectDB() {
	console.log('INTENTANTO CONECTAR A LA DB: ', MONGO_URI)
	await mongoose.connect(MONGO_URI)
	console.log('DB CONECTADA')
}

async function seed() {
	const ap = await Course.findOne({ name: 'Administración de proyectos' })
	const ar = await Course.findOne({ name: 'Análisis de Requerimientos' })

	const themeAPWithIds = themesAP.map(theme => ({
		...theme,
		course: ap?._id
	}))

	const themeARWithIds = themesAR.map(theme => ({
		...theme,
		course: ar?._id
	}))

	await Theme.deleteMany()
	await Theme.insertMany([ ...themeAPWithIds, ...themeARWithIds ])

	return
}

async function run() {
	await connectDB()
	await seed()
	console.log('DAÑOS AÑADIDOS A LA BASE DE DATOS')

	return
}

run()
