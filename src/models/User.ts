import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from '../schemas/User/User';

export const UserModel = new User().getModelForClass(User, {
    schemaOptions: {
        timestamps: true,
    }
});

/**
 * Compare User Password With Stored Hash Password
 * @param storedPassword User Stored Password
 * @param givenPassword User Given Password
 */
export const comparePassword = async (storedPassword: string, givenPassword: string): Promise<boolean> => {

    return new Promise<boolean>((resolve, reject) => {
        bcrypt.compare(givenPassword, storedPassword, (error: mongoose.Error, isMatch: boolean) => {
            if (error) {
                reject(error);
            } else {
                resolve(isMatch);
            }
        });
    });
};
