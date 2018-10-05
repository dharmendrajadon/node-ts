"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const passport_local_1 = __importDefault(require("passport-local"));
const User_1 = require("../models/User");
/**
 * Sign in using Email and Password.
 * Passport Middleware
 */
passport_1.default.use(new passport_local_1.default.Strategy({
    passwordField: 'password',
    usernameField: 'email'
}, (email, password, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Find the user with given email
        const user = yield User_1.UserModel.findOne({ email: email.toLowerCase() });
        // If Email not found in database
        if (!user) {
            return done(undefined, false, { message: `Email ${email} not found.` });
        }
        // If User Exists With Given Email
        // Compare User Password with the given password
        const validPassword = yield User_1.comparePassword(user.password || '', password);
        // If Password Matches, return Stored User Object
        if (validPassword === true) {
            return done(undefined, user, { message: 'Logged in Successfully!' });
        }
        else {
            return done(undefined, false, { message: 'Invalid email or password.' });
        }
    }
    catch (error) {
        return done(error);
    }
})));
/**
 * User JWT  Token Verification
 */
passport_1.default.use(new passport_jwt_1.default.Strategy({
    jwtFromRequest: passport_jwt_1.default.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SIGN_SECRET // JWT SIGN Secret from process environment
}, (token, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Pass the user details to the next middleware
        return done(undefined, token.user);
    }
    catch (error) {
        done(error);
    }
})));
//# sourceMappingURL=Passport.js.map