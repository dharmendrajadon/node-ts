"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const lusca_1 = __importDefault(require("lusca"));
const passport_1 = __importDefault(require("passport"));
const path_1 = __importDefault(require("path"));
const express_validator_1 = __importDefault(require("express-validator"));
const errorhandler_1 = __importDefault(require("errorhandler"));
const Index_1 = __importDefault(require("./routes/Index"));
/**
 * Environment Variable Configuration
 * Production, Staging and Development
 */
dotenv_1.default.config({ path: '.env.dev' });
// Create Express server
const app = express_1.default();
if (process.env.NODE_ENV === 'Development') {
    // Error Handler for only use in development
    app.use(errorhandler_1.default());
}
// MongoDB Connection
require("./config/MongoDB");
// Authentication Configuration
require("./config/Passport");
/**
 * Express configuration
 */
// WhiteList Domains
const whiteList = [
    'http://localhost:3000'
];
// CORS Configuration
const corsMiddleware = cors_1.default({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
    origin: whiteList
});
// Enable Cors in development
app.use(corsMiddleware);
app.use(compression_1.default());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_validator_1.default());
app.use(passport_1.default.initialize());
// Security Configuration
app.use(lusca_1.default({
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
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'), { maxAge: 31557600000 }));
/**
 * Application Routes.
 */
app.use('/api', Index_1.default);
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
exports.default = app;
//# sourceMappingURL=App.js.map