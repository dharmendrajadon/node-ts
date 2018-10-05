"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthController = __importStar(require("../controllers/Auth/Auth"));
const User_1 = require("../schemas/User/User");
// Create router instance
const router = express_1.default.Router();
// Auth SignUp
router.post('/signup', User_1.Validations.signup, AuthController.postSignUp);
// Auth Login
router.post('/login', User_1.Validations.login, AuthController.postLogin);
exports.default = router;
//# sourceMappingURL=Auth.js.map