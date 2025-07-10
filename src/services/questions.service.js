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
const openequestion_schema_1 = require("../database/schemas/openequestion.schema");
const mcquestion_1 = require("../database/schemas/mcquestion");
class QuestionsService {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const openQuestions = yield openequestion_schema_1.OpenQuestion.find();
                const multipleChoiceQuestions = yield mcquestion_1.MultipleChoiceQuestion.find();
                const data = {
                    openQuestions,
                    multipleChoiceQuestions
                };
                return data;
            }
            catch (err) {
                console.error('Error trying to get questions from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    findOneMultipleChoice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield mcquestion_1.MultipleChoiceQuestion.findById(id).exec();
                return data;
            }
            catch (err) {
                console.error('Error trying to get a question from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    findOneOpen(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield openequestion_schema_1.OpenQuestion.findById(id).exec();
                return data;
            }
            catch (err) {
                console.error('Error trying to get a question from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    findByThemes(themes) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            try {
                if (typeof themes === 'string') {
                    const openQuestions = yield openequestion_schema_1.OpenQuestion.find({ theme: themes });
                    const multipleChoiceQuestions = yield mcquestion_1.MultipleChoiceQuestion.find({ theme: themes });
                    data = {
                        themes,
                        openQuestions,
                        multipleChoiceQuestions
                    };
                }
                else {
                    data = yield Promise.all(themes.map((theme) => __awaiter(this, void 0, void 0, function* () {
                        const openQuestions = yield openequestion_schema_1.OpenQuestion.find({ theme });
                        const multipleChoiceQuestions = yield mcquestion_1.MultipleChoiceQuestion.find({ theme });
                        return {
                            theme,
                            openQuestions,
                            multipleChoiceQuestions
                        };
                    })));
                }
                return data;
            }
            catch (err) {
                console.error('Error trying to get questions from DB: ', err);
                throw new Error('Error al consultar la base de datos');
            }
        });
    }
    createMultipleChoice(questionData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = new mcquestion_1.MultipleChoiceQuestion(questionData);
                const response = yield question.save();
                return response;
            }
            catch (err) {
                console.error('Error trying to create a question into DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    createOpen(questionData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = new openequestion_schema_1.OpenQuestion(questionData);
                const response = yield question.save();
                return response;
            }
            catch (err) {
                console.error('Error trying to create a question into DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    updateMultipleChoice(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield mcquestion_1.MultipleChoiceQuestion.findByIdAndUpdate({ _id: id }, Object.assign({}, data));
                return response;
            }
            catch (err) {
                console.error('Error trying to update a question from DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    updateOpen(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield openequestion_schema_1.OpenQuestion.findByIdAndUpdate({ _id: id }, Object.assign({}, data));
                return response;
            }
            catch (err) {
                console.error('Error trying to update a question from DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    deleteMultipleChoice(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mcquestion_1.MultipleChoiceQuestion.findOneAndDelete({ _id: id });
                return `La pregunta de opción múltiple con id: ${id} fue eliminada`;
            }
            catch (err) {
                console.error('Error trying to remove a question from DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
    deleteOpenQuestion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield openequestion_schema_1.OpenQuestion.findOneAndDelete({ _id: id });
                return `La pregunta abierta con id: ${id} fue eliminada`;
            }
            catch (err) {
                console.error('Error trying to remove a question from DB: ', err);
                throw new Error('Error al modificar la base de datos');
            }
        });
    }
}
exports.default = QuestionsService;
