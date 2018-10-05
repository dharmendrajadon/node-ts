"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const typegoose_1 = require("typegoose");
const check_1 = require("express-validator/check");
const UserProfile_1 = require("./UserProfile");
const AuthToken_1 = require("./AuthToken");
const Constants_1 = require("../../shared/Constants");
/**
 * Password hash middleware.
 */
let User = 
/**
 * User MongoDB Schema
 */
class User extends typegoose_1.Typegoose {
};
__decorate([
    typegoose_1.prop({ required: true, unique: true, index: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isEmailVerified", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", Date)
], User.prototype, "passwordResetExpires", void 0);
__decorate([
    typegoose_1.prop(),
    __metadata("design:type", String)
], User.prototype, "passwordResetToken", void 0);
__decorate([
    typegoose_1.prop({ required: true }),
    __metadata("design:type", UserProfile_1.UserProfile)
], User.prototype, "profile", void 0);
__decorate([
    typegoose_1.arrayProp({ itemsRef: AuthToken_1.AuthToken }),
    __metadata("design:type", Array)
], User.prototype, "tokens", void 0);
User = __decorate([
    typegoose_1.pre('save', function (next) {
        if (!this.isModified('password')) {
            return next();
        }
        bcrypt_1.default.genSalt(10, (saltError, salt) => {
            if (saltError) {
                return next(saltError);
            }
            bcrypt_1.default.hash(this.password, salt, (hashError, hash) => {
                if (hashError) {
                    return next(hashError);
                }
                this.password = hash;
                next();
            });
        });
    })
    /**
     * User MongoDB Schema
     */
], User);
exports.User = User;
/**
 * User Schema Validations
 */
exports.Validations = {
    // For Login
    login: [
        check_1.check('email').isEmail().withMessage('Invalid Email'),
        check_1.check('password').trim().isLength({ min: 6 }).withMessage('Must contain at least 6 characters')
    ],
    // For Sign-Up
    signup: [
        check_1.check('email').isEmail().withMessage('Invalid Email'),
        check_1.check('password').trim().isLength({ min: 6 }).withMessage('Must contain at least 6 characters'),
        check_1.check('firstName').trim().isLength({ min: 1 }).withMessage('Invalid First Name'),
        check_1.check('lastName').trim().isLength({ min: 1 }).withMessage('Invalid Last Name'),
        check_1.check('gender').trim().custom((gender) => {
            const genderList = [Constants_1.Gender.FEMALE, Constants_1.Gender.MALE, Constants_1.Gender.OTHER];
            if (genderList.indexOf(gender) === -1) {
                throw new Error('Invalid Gender');
            }
            return true;
        }),
    ],
};
//# sourceMappingURL=User.js.map