"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const App_1 = __importDefault(require("./App"));
/**
 * Start Express server.
 */
const server = App_1.default.listen(process.env.APP_PORT, () => {
    console.log(`  App is running at ${process.env.APP_HOST}:${process.env.APP_PORT} in ${process.env.APP_ENV} mode`);
    console.log('  Press CTRL-C to stop\n');
});
exports.default = server;
//# sourceMappingURL=server.js.map