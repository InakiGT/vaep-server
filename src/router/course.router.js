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
const course_service_1 = __importDefault(require("../services/course.service"));
const router = (0, express_1.Router)();
const service = new course_service_1.default();
/**
 * @swagger
 * /course:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Materias]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   __v:
 *                     type: number
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
 * /course/{id}:
 *   get:
 *     summary: Obtener un curso por ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 __v:
 *                   type: number
 *       500:
 *         description: Error interno del servidor
 */
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield service.findOne(id);
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
 * /course:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags: [Materias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Curso de Programación
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const data = yield service.create(body);
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
 * /course/{id}:
 *   patch:
 *     summary: Actualizar un curso por ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Curso actualizado
 *     responses:
 *       204:
 *         description: Curso actualizado correctamente (sin contenido)
 *       500:
 *         description: Error interno del servidor
 */
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { body } = req;
        yield service.update(id, body);
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
 * /course/{id}:
 *   delete:
 *     summary: Eliminar un curso por ID
 *     tags: [Materias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso a eliminar
 *     responses:
 *       204:
 *         description: Curso eliminado correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield service.delete(id);
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
