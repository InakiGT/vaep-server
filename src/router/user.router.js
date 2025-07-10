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
const user_service_1 = __importDefault(require("../services/user.service"));
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
const service = new user_service_1.default();
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service.findAll();
        res
            .status(200)
            .json({
            data
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err
        });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield service.findOneById(id);
        res
            .status(200)
            .json({
            data
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err
        });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const data = yield service.create(body);
        res
            .status(201)
            .json({
            data
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err
        });
    }
}));
router.patch('/', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sub } = req.user;
        const { body } = req;
        yield service.update(sub, body);
        res
            .status(204)
            .json();
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err
        });
    }
}));
router.delete('/:id', passport_1.default.authenticate('jwt', { session: false }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sub } = req.user;
        if (sub === req.params.id) {
            const data = yield service.delete(sub);
            console.log(data);
            res
                .status(204)
                .json();
        }
        else {
            res
                .status(401)
                .json({
                error: 'No tienes permiso para eliminar a este usuario'
            });
        }
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err
        });
    }
}));
exports.default = router;
