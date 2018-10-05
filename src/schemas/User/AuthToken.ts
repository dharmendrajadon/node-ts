import {
    Typegoose,
    prop,
} from 'typegoose';

/**
 * User Auth Token MongoDB Schema
 */
export class AuthToken extends Typegoose {
    @prop({ required: true })
    public accessToken?: string;
    @prop({ required: true })
    public kind?: string;
}
