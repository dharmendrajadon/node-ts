import {
    Typegoose,
    prop,
} from 'typegoose';
import { Gender } from '../../shared/Constants';

/**
 * User Profile MongoDB Schema
 */
export class UserProfile extends Typegoose {
    public address?: string;
    public birthday?: Date;
    public city?: string;
    @prop({ required: true })
    public firstName?: string;
    @prop({ required: true })
    public gender?: Gender;
    @prop({ required: true })
    public lastName?: string;
    public pinCode?: number;
    public state?: string;
}
