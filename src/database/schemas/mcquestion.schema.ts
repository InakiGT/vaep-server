import { Schema, Types, model } from 'mongoose'

export const multipleChoiceQuestionSchema = new Schema({
	question: String,
	answers: [String],
	correctAnswer: String,
	theme: {
		type: Types.ObjectId,
		ref: 'Theme',
		required: true,
	}
})

export const MultipleChoiceQuestion = model('MultipleChoiceQuestion', multipleChoiceQuestionSchema)
