"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = exports.themeShema = void 0;
const mongoose_1 = require("mongoose");
exports.themeShema = new mongoose_1.Schema({
    name: String,
    course: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Course',
        required: true,
    }
});
exports.Theme = (0, mongoose_1.model)('Theme', exports.themeShema);
