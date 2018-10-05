import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator/check';
import passport from 'passport';
import JWT from 'jsonwebtoken';
import { Error } from 'mongoose';
import { UserModel } from '../../models/User';

/**
 * POST /signup
 * Sign-Up in using email and password.
 * @param req Request Payload
 * @param res Response Message
 * @param next Next Request Handler
 */
export let postSignUp = async (req: Request, res: Response, next: NextFunction) => {

    // Check for Validation Errors
    const validationErrorList = validationResult(req);
    if (!validationErrorList.isEmpty()) {
        return res.status(422).json({ errors: validationErrorList.array() });
    }

    const email: string = req.body.email;
    const password: string = req.body.password;
    const firstName: string = req.body.firstName;
    const lastName: string = req.body.lastName;
    const gender: string = req.body.gender;

    try {

        // Find the user with given email
        const existingUser = await UserModel.findOne({ email: email.toLowerCase() });

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
        const newUser = await UserModel.create({
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

    } catch (error) {
        return res.status(400).json({ message: error });
    }
};

/**
 * POST /login
 * Sign in using email and password.
 * @param req Request Payload
 * @param res Response Message
 * @param next Next Request Handler
 */
export let postLogin = async (req: Request, res: Response, next: NextFunction) => {

    // Check for Validation Errors
    const validationErrorList = validationResult(req);
    if (!validationErrorList.isEmpty()) {
        return res.status(422).json({ errors: validationErrorList.array() });
    }

    // Attempt Login
    createLoginAttempt(req, res, next);
};

/**
 * Create Login Attempt and return respective response
 * @param req Request Payload
 * @param res Response Message
 * @param next Next Request Handler
 */
const createLoginAttempt = (req: Request, res: Response, next: NextFunction) => {

    // Create Authentication Request
    passport.authenticate('local', { session: false }, (databaseError: Error, user: any, info: any) => {

        // If any error or validation failure
        if (databaseError || !user) { return next(databaseError); }

        // Attempt login, generate JWT Token and return the response
        req.login(user, { session: false }, (error: any) => {

            // If any error or login failure
            if (error || !user) { return next(error); }

            // Get JWT Secret from process environment
            const jwtSecret: string | undefined = process.env.JWT_SIGN_SECRET;

            // If JWT Secret not found
            if (jwtSecret === undefined) {
                return next(new Error('Invalid Passport Configurations!'));
            }

            // Generate a signed the JWT token and populate the payload with the user info
            const token = JWT.sign({
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
