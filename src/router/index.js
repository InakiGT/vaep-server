"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = appRouter;
const express_1 = require("express");
const user_router_1 = __importDefault(require("./user.router"));
const auth_router_1 = __importDefault(require("./auth.router"));
const question_router_1 = __importDefault(require("./question.router"));
const course_router_1 = __importDefault(require("./course.router"));
const theme_router_1 = __importDefault(require("./theme.router"));
const router = (0, express_1.Router)();
function appRouter(app) {
    app.use('/api/v1', router);
    router.use('/user', user_router_1.default);
    router.use('/auth', auth_router_1.default);
    router.use('/course', course_router_1.default);
    router.use('/theme', theme_router_1.default);
    router.use('/question', question_router_1.default);
}
