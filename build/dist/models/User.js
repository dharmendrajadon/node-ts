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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../schemas/User/User");
exports.UserModel = new User_1.User().getModelForClass(User_1.User, {
    schemaOptions: {
        timestamps: true,
    }
});
/**
 * Compare User Password With Stored Hash Password
 * @param storedPassword User Stored Password
 * @param givenPassword User Given Password
 */
exports.comparePassword = (storedPassword, givenPassword) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(givenPassword, storedPassword, (error, isMatch) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(isMatch);
            }
        });
    });
});
//# sourceMappingURL=User.js.map