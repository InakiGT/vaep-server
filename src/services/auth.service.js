"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../config/index"));
const user_service_1 = __importDefault(require("./user.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthService {
    constructor() {
        this.userService = new user_service_1.default();
    }
    getUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield this.userService.findUserByEmail(email);
                if (!user) {
                    throw new Error('No existe el usuario');
                }
                const isMatch = yield bcrypt_1.default.compare(password, (_a = user.password) !== null && _a !== void 0 ? _a : '');
                if (!isMatch) {
                    throw new Error('La contraseña es incorrecta');
                }
                delete user.password;
                return user;
            }
            catch (err) {
                console.error(err);
                throw new Error(err);
            }
        });
    }
    signToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = {
                sub: user._id.toString(),
            };
            const token = jsonwebtoken_1.default.sign(payload, index_1.default.jwtSecret);
            return token;
        });
    }
}
exports.default = AuthService;
