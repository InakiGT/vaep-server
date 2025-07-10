"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenQuestion = exports.openQuestionSchema = void 0;
const mongoose_1 = require("mongoose");
exports.openQuestionSchema = new mongoose_1.Schema({
    question: String,
    answer: String,
    theme: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Theme',
        required: true,
    }
});
exports.OpenQuestion = (0, mongoose_1.model)('OpenQuestion', exports.openQuestionSchema);
