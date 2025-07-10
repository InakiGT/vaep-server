import dotenv from 'dotenv'

dotenv.config()

const config = {
  port: process.env.PORT || 3000,
	server: process.env.SERVER || 'http://localhost',
	mongoURI: process.env.MONGO_URI || '',
	jwtSecret: process.env.JWT_SECRET || '',
}

export default config
