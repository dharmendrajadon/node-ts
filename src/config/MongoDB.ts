import mongoose from 'mongoose';
import bluebird from 'bluebird';

// Get Connection String
const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

// Check if connection string is available
if (!MONGODB_URI) {
    console.error('No mongoDB connection string found. Set MONGODB_URI environment variable.');
    process.exit(1);
}

// Convert all callbacks to Bluebird Promises
mongoose.Promise = bluebird;

// Create MongoDB connection
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI || '', { useNewUrlParser: true }).then(() => {
    // Ready to use MongoDB. The `mongoose.connect()` promise resolves to undefined.
}).catch((error) => {
    console.error(`MongoDB connection error. Please make sure MongoDB is running. ${error}`);
});
