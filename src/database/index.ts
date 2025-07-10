import mongoose from 'mongoose'
import config from '../config'

export default async function StartDB() {
	await mongoose.connect(config.mongoURI)
}
