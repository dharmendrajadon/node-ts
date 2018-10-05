import passport from 'passport';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import { UserModel, comparePassword } from '../models/User';

/**
 * Sign in using Email and Password.
 * Passport Middleware
 */
passport.use(new passportLocal.Strategy({
    passwordField: 'password',
    usernameField: 'email'
}, async (email, password, done) => {

    try {

        // Find the user with given email
        const user = await UserModel.findOne({ email: email.toLowerCase() });

        // If Email not found in database
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }

        // If User Exists With Given Email
        // Compare User Password with the given password
        const validPassword: boolean = await comparePassword(user.password || '', password);

        // If Password Matches, return Stored User Object
        if (validPassword === true) {
            return done(undefined, user, { message: 'Logged in Successfully!' });
        } else {
            return done(undefined, false, { message: 'Invalid email or password.' });
        }
    } catch (error) {
        return done(error);
    }
}));

/**
 * User JWT  Token Verification
 */
passport.use(new passportJWT.Strategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Auth Bearer Header
    secretOrKey: process.env.JWT_SIGN_SECRET // JWT SIGN Secret from process environment
}, async (token, done) => {
    try {

        // Pass the user details to the next middleware
        return done(undefined, token.user);
    } catch (error) {
        done(error);
    }
}));
