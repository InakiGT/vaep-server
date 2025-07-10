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
const questions_service_1 = __importDefault(require("../services/questions.service"));
const router = (0, express_1.Router)();
const service = new questions_service_1.default();
/**
 * @swagger
 * components:
 *   schemas:
 *     MultipleChoiceQuestion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         question:
 *           type: string
 *         answers:
 *           type: array
 *           items:
 *             type: string
 *         correctAnswer:
 *           type: string
 *         theme:
 *           type: string
 *         __v:
 *           type: number
 *     MultipleChoiceQuestionCreate:
 *       type: object
 *       required:
 *         - question
 *         - answers
 *         - correctAnswer
 *         - theme
 *       properties:
 *         question:
 *           type: string
 *         answers:
 *           type: array
 *           items:
 *             type: string
 *         correctAnswer:
 *           type: string
 *         theme:
 *           type: string
 *     MultipleChoiceQuestionUpdate:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *         answers:
 *           type: array
 *           items:
 *             type: string
 *         correctAnswer:
 *           type: string
 *         theme:
 *           type: string
 *     OpenQuestion:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *         theme:
 *           type: string
 *         __v:
 *           type: number
 *     OpenQuestionCreate:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *         - theme
 *       properties:
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *         theme:
 *           type: string
 *     OpenQuestionUpdate:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *         theme:
 *           type: string
 *     ThemeQuestionsResponse:
 *       type: object
 *       properties:
 *         theme:
 *           type: string
 *           description: ID del tema
 *         openQuestions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OpenQuestion'
 *         multipleChoiceQuestions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/MultipleChoiceQuestion'
 *     ThemeQuestionsResponseArray:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ThemeQuestionsResponse'
 */
/**
 * @swagger
 * /question:
 *   get:
 *     summary: Obtener todas las preguntas (abiertas y de opción múltiple)
 *     tags: [Preguntas]
 *     responses:
 *       200:
 *         description: Preguntas abiertas y de opción múltiple
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     openQuestions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/OpenQuestion'
 *                     multipleChoiceQuestions:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/MultipleChoiceQuestion'
 */
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service.findAll();
        res
            .status(200)
            .json({
            data,
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err,
        });
    }
}));
/**
 * @swagger
 * /question/multipleChoice/{id}:
 *   get:
 *     summary: Obtener pregunta de opción múltiple por ID
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta opción múltiple
 *     responses:
 *       200:
 *         description: Pregunta opción múltiple encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/MultipleChoiceQuestion'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/multipleChoice/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield service.findOneMultipleChoice(id);
        res
            .status(200)
            .json({
            data,
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err,
        });
    }
}));
/**
 * @swagger
 * /question/open/{id}:
 *   get:
 *     summary: Obtener pregunta abierta por ID
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta abierta
 *     responses:
 *       200:
 *         description: Pregunta abierta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/OpenQuestion'
 *       500:
 *         description: Error interno del servidor
 */
router.get('/open/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield service.findOneOpen(id);
        res
            .status(200)
            .json({
            data,
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err,
        });
    }
}));
/**
 * @swagger
 * /question/theme:
 *   get:
 *     summary: Obtener preguntas agrupadas por tema
 *     tags: [Preguntas]
 *     parameters:
 *       - in: query
 *         name: themes
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: IDs de temas (array o único) para filtrar preguntas
 *     responses:
 *       200:
 *         description: Preguntas agrupadas por tema
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ThemeQuestionsResponseArray'
 */
router.get('/theme', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { themes } = req.query;
        const data = yield service.findByThemes(themes);
        res
            .status(200)
            .json({
            data,
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err,
        });
    }
}));
/**
 * @swagger
 * /question/multipleChoice:
 *   post:
 *     summary: Crear pregunta de opción múltiple
 *     tags: [Preguntas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MultipleChoiceQuestionCreate'
 *     responses:
 *       201:
 *         description: Pregunta opción múltiple creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/MultipleChoiceQuestion'
 *       500:
 *         description: Error interno del servidor
 */
router.post('/multipleChoice', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const data = yield service.createMultipleChoice(body);
        res
            .status(201)
            .json({
            data,
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err,
        });
    }
}));
/**
 * @swagger
 * /question/open:
 *   post:
 *     summary: Crear pregunta abierta
 *     tags: [Preguntas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OpenQuestionCreate'
 *     responses:
 *       201:
 *         description: Pregunta abierta creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/OpenQuestion'
 *       500:
 *         description: Error interno del servidor
 */
router.post('/open', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const data = yield service.createOpen(body);
        res
            .status(201)
            .json({
            data,
        });
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err,
        });
    }
}));
/**
 * @swagger
 * /question/multipleChoice/{id}:
 *   patch:
 *     summary: Actualizar pregunta de opción múltiple por ID
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta opción múltiple a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MultipleChoiceQuestionUpdate'
 *     responses:
 *       204:
 *         description: Pregunta actualizada correctamente (sin contenido)
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/multipleChoice/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        yield service.updateMultipleChoice(id, body);
        res
            .status(204)
            .json();
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err,
        });
    }
}));
/**
 * @swagger
 * /question/open/{id}:
 *   patch:
 *     summary: Actualizar pregunta abierta por ID
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta abierta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OpenQuestionUpdate'
 *     responses:
 *       204:
 *         description: Pregunta actualizada correctamente (sin contenido)
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/open/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        yield service.updateOpen(id, body);
        res
            .status(204)
            .json();
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err,
        });
    }
}));
/**
 * @swagger
 * /question/multipleChoice/{id}:
 *   delete:
 *     summary: Eliminar pregunta de opción múltiple por ID
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta opción múltiple a eliminar
 *     responses:
 *       204:
 *         description: Pregunta eliminada correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/multipleChoice/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield service.deleteMultipleChoice(id);
        console.log(data);
        res
            .status(204)
            .json();
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err,
        });
    }
}));
/**
 * @swagger
 * /question/open/{id}:
 *   delete:
 *     summary: Eliminar pregunta abierta por ID
 *     tags: [Preguntas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la pregunta abierta a eliminar
 *     responses:
 *       204:
 *         description: Pregunta eliminada correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/open/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield service.deleteOpenQuestion(id);
        console.log(data);
        res
            .status(204)
            .json();
    }
    catch (err) {
        res
            .status(500)
            .json({
            error: err,
        });
    }
}));
exports.default = router;
