import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT || 3000,
	server: process.env.SERVER || 'http://localhost:' + process.env.PORT,
	mongoURI: process.env.MONGO_URI || '',
	jwtSecret: process.env.JWT_SECRET || '',
	frontendServer: process.env.FRONTEND_SERVER || 'http://localhost:5173',
	stmpPass: process.env.STMP_PASS || '',
	stmpUser: process.env.STMP_USER || '',
}

export default config
