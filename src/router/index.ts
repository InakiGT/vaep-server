import type { Express } from 'express'
import { Router } from 'express'
import userRouter from './user.router'
import authRouter from './auth.router'
import questionRouter from './question.router'
import gameRouter from './game.router'
import courseRouter from './course.router'
import themeRouter from './theme.router'

const router = Router()

export default function appRouter(app: Express) {
	app.use('/api/v1', router)
	router.use('/user', userRouter)
	router.use('/auth', authRouter)
	router.use('/course', courseRouter)
	router.use('/theme', themeRouter)
	router.use('/question', questionRouter)
	router.use('/game', gameRouter)
}
