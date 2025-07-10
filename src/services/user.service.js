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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schema_1 = require("../database/schemas/user.schema");
class UserService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_schema_1.User.find();
                const data = users.map(user => {
                    const realuser = user.toObject();
                    delete realuser.password;
                    return realuser;
                });
                return data;
            }
            catch (err) {
                console.error('Error trying to get users from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    findOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_schema_1.User.findById(id).exec();
                const data = user === null || user === void 0 ? void 0 : user.toObject();
                data === null || data === void 0 ? true : delete data.password;
                return data;
            }
            catch (err) {
                console.error('Error trying to get a user from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield user_schema_1.User.findOne({ email });
                return data;
            }
            catch (err) {
                console.error('Error trying to get a user from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!userData.password) {
                    throw new Error('Invalid data');
                }
                const password = yield bcrypt_1.default.hash(userData.password, 10);
                userData.password = password;
                const theme = new user_schema_1.User(userData);
                const response = yield theme.save();
                return response;
            }
            catch (err) {
                console.error('Error trying to create a user into DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (userData.password) {
                    const password = yield bcrypt_1.default.hash(userData.password, 10);
                    userData.password = password;
                }
                const response = user_schema_1.User.findByIdAndUpdate({ _id: id }, Object.assign({}, userData));
                return response;
            }
            catch (err) {
                console.error('Error trying to update a user into DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield user_schema_1.User.findOneAndDelete({ _id: id });
                return `El usuario con id: ${id} fue eliminado`;
            }
            catch (err) {
                console.error('Error trying to remove a user from DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
}
exports.default = UserService;
