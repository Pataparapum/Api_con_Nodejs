import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import passport, { Passport } from "passport";

const JwtStrategy = Strategy

const init = () => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
        secretOrKey: 'secretPassword' //TODO deberia estar en una variable de entorno
    }
    passport.use(new JwtStrategy(opts, (decoded, done) => {
        return done(null, decoded);
    }));
}

const protectWithJwt = (req, res, next) => {
    if (req.path == '/' || req.path == '/auth/login') {
        return next();
    }
    return passport.authenticate('jwt', {session:false})(req, res, next);
}

export {
    init,
    protectWithJwt
}