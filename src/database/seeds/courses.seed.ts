import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { Course } from '../schemas/course'

dotenv.config()

const MONGO_URI = process.env.MONGO_URI || ''

const courses = [
	{
		name: 'Análisis de Requerimientos'
	},
	{
		name: 'Administración de proyectos'
	},
]

async function connectDB() {
	console.log('INTENTANTO CONECTAR A LA DB: ', MONGO_URI)
	await mongoose.connect(MONGO_URI)
	console.log('DB CONECTADA')
}

async function seed() {
	await Course.deleteMany()
	await Course.insertMany([ ...courses ])

	console.log('DAÑOS AÑADIDOS A LA BASE DE DATOS')

	return
}

async function run() {
	await connectDB()
	await seed()
}

run()
