import { ExtractJwt, Strategy } from 'passport-jwt'
import config from '../../../config'

const JwtStrategt = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
}, (  payload, done ) => done(null, payload))

export default JwtStrategt
