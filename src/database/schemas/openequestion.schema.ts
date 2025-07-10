import { Schema, Types, model } from 'mongoose'

export const openQuestionSchema = new Schema({
	question: String,
	answer: String,
	theme: {
		type: Types.ObjectId,
		ref: 'Theme',
		required: true,
	}
})

export const OpenQuestion = model('OpenQuestion', openQuestionSchema)
