"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = exports.courseSchema = void 0;
const mongoose_1 = require("mongoose");
exports.courseSchema = new mongoose_1.Schema({
    name: String,
});
exports.Course = (0, mongoose_1.model)('Course', exports.courseSchema);
