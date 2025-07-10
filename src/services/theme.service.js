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
Object.defineProperty(exports, "__esModule", { value: true });
const mcquestion_1 = require("../database/schemas/mcquestion");
const openequestion_schema_1 = require("../database/schemas/openequestion.schema");
const theme_1 = require("../database/schemas/theme");
class ThemeService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield theme_1.Theme.find();
                return data;
            }
            catch (err) {
                console.error('Error trying to get courses from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const theme = yield theme_1.Theme.findById(id).exec();
                if (!theme) {
                    throw new Error('Tema no encontrado');
                }
                const openQuestions = yield openequestion_schema_1.OpenQuestion.find({ theme: theme._id });
                const mcQuestions = yield mcquestion_1.MultipleChoiceQuestion.find({ theme: theme._id });
                const data = Object.assign(Object.assign({}, theme.toObject()), { openQuestions,
                    mcQuestions });
                return data;
            }
            catch (err) {
                console.error('Error trying to get a theme from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    create(themeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const theme = new theme_1.Theme(themeData);
                const response = yield theme.save();
                return response;
            }
            catch (err) {
                console.error('Error trying to create a theme into DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield theme_1.Theme.findByIdAndUpdate({ _id: id }, Object.assign({}, data));
                return response;
            }
            catch (err) {
                console.error('Error trying to update a theme from DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield theme_1.Theme.findOneAndDelete({ _id: id });
                return `La materia con id: ${id} fue eliminada`;
            }
            catch (err) {
                console.error('Error trying to remove a theme from DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
}
exports.default = ThemeService;
