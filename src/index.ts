import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import swaggerUI from 'swagger-ui-express'
import config from './config'
import StartDB from './database'
import appRouter from './router'
import swaggerSpec from './swagger'
import './utils/auth'
import { errorHandler } from './middlewares/error.handler'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

StartDB()

appRouter(app)
app.use(errorHandler)

app.listen(config.port, () => {
	console.log(`Server listening on port: ${ config.port }`)
})
