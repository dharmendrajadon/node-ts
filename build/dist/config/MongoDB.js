"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bluebird_1 = __importDefault(require("bluebird"));
// Get Connection String
const MONGODB_URI = process.env.MONGODB_URI;
// Check if connection string is available
if (!MONGODB_URI) {
    console.error('No mongoDB connection string found. Set MONGODB_URI environment variable.');
    process.exit(1);
}
// Convert all callbacks to Bluebird Promises
mongoose_1.default.Promise = bluebird_1.default;
// Create MongoDB connection
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.connect(MONGODB_URI || '', { useNewUrlParser: true }).then(() => {
    // Ready to use MongoDB. The `mongoose.connect()` promise resolves to undefined.
}).catch((error) => {
    console.error(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
});
//# sourceMappingURL=MongoDB.js.map