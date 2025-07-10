import passport from 'passport'
import LocalStrategy from './strategies/local.strategy'
import JwtStrategy from './strategies/jwt.strategy'

console.log('CONFIGURANDO ESTRATEGIAS...')

passport.use(LocalStrategy)
passport.use(JwtStrategy)

export default {}
