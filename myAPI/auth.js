import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

const JwtStrategy = Strategy

export default passport => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: 'secret' //TODO deberia estar en una variable de entorno
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('decoded jwt', decoded);
        return done(null, decoded);
            
    }));
}
