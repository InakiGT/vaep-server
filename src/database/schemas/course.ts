import { Schema, model } from 'mongoose'

export const courseSchema = new Schema({
	name: String,
})

export const Course = model('Course', courseSchema)
