"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleChoiceQuestion = exports.multipleChoiceQuestionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.multipleChoiceQuestionSchema = new mongoose_1.Schema({
    question: String,
    answers: [String],
    correctAnswer: String,
    theme: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Theme',
        required: true,
    }
});
exports.MultipleChoiceQuestion = (0, mongoose_1.model)('MultipleChoiceQuestion', exports.multipleChoiceQuestionSchema);
