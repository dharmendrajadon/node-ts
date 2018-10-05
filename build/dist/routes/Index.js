"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_1 = __importDefault(require("./Auth"));
const Home_1 = __importDefault(require("./Home"));
// Create router instance
const router = express_1.default.Router();
// Publish Home Routes
router.use('/', Home_1.default);
// Publish Auth Routes
router.use('/auth', Auth_1.default);
exports.default = router;
//# sourceMappingURL=Index.js.map