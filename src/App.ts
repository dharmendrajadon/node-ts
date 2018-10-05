import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cors from 'cors';
import lusca from 'lusca';
import passport from 'passport';
import path from 'path';
import expressValidator from 'express-validator';
import errorhandler from 'errorhandler';
import router from './routes/Index';

/**
 * Environment Variable Configuration
 * Production, Staging and Development
 */
dotenv.config({ path: '.env.dev' });

// Create Express server
const app = express();
if (process.env.NODE_ENV === 'Development') {

    // Error Handler for only use in development
    app.use(errorhandler());
}

// MongoDB Connection
import './config/MongoDB';

// Authentication Configuration
import './config/Passport';

/**
 * Express configuration
 */

// WhiteList Domains
const whiteList: string[] = [
    'http://localhost:3000'
];

// CORS Configuration
const corsMiddleware = cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    origin: whiteList
});

// Enable Cors in development
app.use(corsMiddleware);

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(passport.initialize());

// Security Configuration
app.use(lusca({
    hsts: {
        includeSubDomains: true,
        maxAge: 31536000,
        preload: true
    },
    nosniff: true,
    referrerPolicy: 'same-origin',
    xframe: 'SAMEORIGIN',
    xssProtection: true
}));

// Static Resource Expiry
app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

/**
 * Application Routes.
 */
app.use('/api', router);

// Basic 404 handler
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// // Basic error handler
// app.use((err: any, req: any, res: any, next: any) => {
//   // If our routes specified a specific response, then send that. Otherwise,
//   // send a generic message so as not to leak anything.
//   res.status(500).send(err.response || 'Something went wrong!');
// });
// // [END errors]

process.on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

export default app;
