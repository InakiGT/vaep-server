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
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const router = (0, express_1.Router)();
const service = new auth_service_1.default();
router.post('/login', passport_1.default.authenticate('local', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service.signToken(req.user);
        res
            .status(200)
            .json({
            data
        });
    }
    catch (err) {
        res
            .status(401)
            .json({
            error: err
        });
    }
}));
exports.default = router;
