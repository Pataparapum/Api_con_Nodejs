import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

const JwtStrategy = Strategy

export default passport => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: 'secretPassword' //TODO deberia estar en una variable de entorno
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        console.log('decoded jwt', decoded);
        return done(null, decoded);
            
    }));
}
