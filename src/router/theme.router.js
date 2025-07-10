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
const theme_service_1 = __importDefault(require("../services/theme.service"));
const router = (0, express_1.Router)();
const service = new theme_service_1.default();
/**
 * @swagger
 * /theme:
 *   get:
 *     summary: Obtener todos los temas
 *     tags: [Temas]
 *     responses:
 *       200:
 *         description: Lista de temas
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
 *                   course:
 *                     type: string
 *                   __v:
 *                     type: number
 *       500:
 *         description: Error interno del servidor
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
 * /theme/{id}:
 *   get:
 *     summary: Obtener un tema por ID
 *     tags: [Temas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema
 *     responses:
 *       200:
 *         description: Tema encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 course:
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
 * /theme:
 *   post:
 *     summary: Crear un nuevo tema
 *     tags: [Temas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - course
 *             properties:
 *               name:
 *                 type: string
 *                 example: Interfaces de Usuario
 *               course:
 *                 type: string
 *                 example: 64c86f2d9a8f9a1e3d6a1b21
 *     responses:
 *       201:
 *         description: Tema creado exitosamente
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
 * /theme/{id}:
 *   patch:
 *     summary: Actualizar un tema por ID
 *     tags: [Temas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: UI Avanzada
 *               course:
 *                 type: string
 *                 example: 64c86f2d9a8f9a1e3d6a1b21
 *     responses:
 *       204:
 *         description: Tema actualizado correctamente (sin contenido)
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
 * /theme/{id}:
 *   delete:
 *     summary: Eliminar un tema por ID
 *     tags: [Temas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del tema a eliminar
 *     responses:
 *       204:
 *         description: Tema eliminado correctamente
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
