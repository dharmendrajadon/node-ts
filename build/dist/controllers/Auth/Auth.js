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
const check_1 = require("express-validator/check");
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = require("mongoose");
const User_1 = require("../../models/User");
/**
 * POST /signup
 * Sign-Up in using email and password.
 * @param req Request Payload
 * @param res Response Message
 * @param next Next Request Handler
 */
exports.postSignUp = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // Check for Validation Errors
    const validationErrorList = check_1.validationResult(req);
    if (!validationErrorList.isEmpty()) {
        return res.status(422).json({ errors: validationErrorList.array() });
    }
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const gender = req.body.gender;
    try {
        // Find the user with given email
        const existingUser = yield User_1.UserModel.findOne({ email: email.toLowerCase() });
        // If Email already exists in database
        if (existingUser) {
            return res.status(422).json({
                errors: {
                    location: 'body',
                    msg: 'Email already exists',
                    param: 'email',
                    value: email
                }
            });
        }
        // If User Does not Exists With Given Email
        // Save the information provided by the user to the database
        const newUser = yield User_1.UserModel.create({
            email,
            isEmailVerified: false,
            password,
            profile: {
                firstName,
                gender,
                lastName
            }
        });
        // Once User is created, Login the user and return with Bearer token
        // Attempt Login
        createLoginAttempt(req, res, next);
    }
    catch (error) {
        return res.status(400).json({ message: error });
    }
});
/**
 * POST /login
 * Sign in using email and password.
 * @param req Request Payload
 * @param res Response Message
 * @param next Next Request Handler
 */
exports.postLogin = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    // Check for Validation Errors
    const validationErrorList = check_1.validationResult(req);
    if (!validationErrorList.isEmpty()) {
        return res.status(422).json({ errors: validationErrorList.array() });
    }
    // Attempt Login
    createLoginAttempt(req, res, next);
});
/**
 * Create Login Attempt and return respective response
 * @param req Request Payload
 * @param res Response Message
 * @param next Next Request Handler
 */
const createLoginAttempt = (req, res, next) => {
    // Create Authentication Request
    passport_1.default.authenticate('local', { session: false }, (databaseError, user, info) => {
        // If any error or validation failure
        if (databaseError || !user) {
            return next(databaseError);
        }
        // Attempt login, generate JWT Token and return the response
        req.login(user, { session: false }, (error) => {
            // If any error or login failure
            if (error || !user) {
                return next(error);
            }
            // Get JWT Secret from process environment
            const jwtSecret = process.env.JWT_SIGN_SECRET;
            // If JWT Secret not found
            if (jwtSecret === undefined) {
                return next(new mongoose_1.Error('Invalid Passport Configurations!'));
            }
            // Generate a signed the JWT token and populate the payload with the user info
            const token = jsonwebtoken_1.default.sign({
                user: {
                    birthday: user.profile.birthday,
                    email: user.email,
                    firstName: user.profile.firstName,
                    gender: user.profile.gender,
                    id: user._id,
                    lastName: user.profile.lastName
                }
            }, jwtSecret);
            // Return token and user info back to the user
            return res.json({
                token,
                user: {
                    birthday: user.profile.birthday,
                    email: user.email,
                    firstName: user.profile.firstName,
                    gender: user.profile.gender,
                    id: user._id,
                    lastName: user.profile.lastName
                }
            });
        });
    })(req, res, next);
};
//# sourceMappingURL=Auth.js.map