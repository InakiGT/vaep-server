import { Schema, Types, model } from 'mongoose'

export const themeShema = new Schema({
	name: String,
	course: {
		type: Types.ObjectId,
		ref: 'Course',
		required: true,
	}
})

export const Theme = model('Theme', themeShema)
