import { Schema, model } from 'mongoose'

export const gameSchema = new Schema({
	name: String,
	url: String,
	imgUri: String,
})

export const Game = model('Game', gameSchema)
