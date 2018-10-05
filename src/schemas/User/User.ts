import bcrypt from 'bcrypt';
import {
    Typegoose,
    prop,
    arrayProp,
    pre,
    Ref
} from 'typegoose';
import { check } from 'express-validator/check';
import { UserProfile } from './UserProfile';
import { AuthToken } from './AuthToken';
import { Gender } from '../../shared/Constants';

/**
 * Password hash middleware.
 */
@pre<User>('save', function (next) {
    if (!this.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (saltError: Error, salt: string) => {
        if (saltError) { return next(saltError); }
        bcrypt.hash(this.password, salt, (hashError: Error, hash: string) => {
            if (hashError) { return next(hashError); }
            this.password = hash;
            next();
        });
    });
})
/**
 * User MongoDB Schema
 */
export class User extends Typegoose {
    @prop({ required: true, unique: true, index: true })
    public email?: string;
    @prop({ required: true })
    public isEmailVerified?: boolean;
    @prop({ required: true })
    public password?: string;
    @prop()
    public passwordResetExpires?: Date;
    @prop()
    public passwordResetToken?: string;
    @prop({ required: true })
    public profile?: UserProfile;
    @arrayProp({ itemsRef: AuthToken })
    public tokens?: Array<Ref<AuthToken>>;
}

/**
 * User Schema Validations
 */
export const Validations = {
    // For Login
    login: [
        check('email').isEmail().withMessage('Invalid Email'),
        check('password').trim().isLength({ min: 6 }).withMessage('Must contain at least 6 characters')
    ],
    // For Sign-Up
    signup: [
        check('email').isEmail().withMessage('Invalid Email'),
        check('password').trim().isLength({ min: 6 }).withMessage('Must contain at least 6 characters'),
        check('firstName').trim().isLength({ min: 1 }).withMessage('Invalid First Name'),
        check('lastName').trim().isLength({ min: 1 }).withMessage('Invalid Last Name'),
        check('gender').trim().custom((gender) => {
            const genderList = [Gender.FEMALE, Gender.MALE, Gender.OTHER];
            if (genderList.indexOf(gender) === -1) {
                throw new Error('Invalid Gender');
            }
            return true;
        }),
    ],
};
