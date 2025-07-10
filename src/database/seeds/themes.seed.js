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
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const theme_1 = require("../schemas/theme");
const course_1 = require("../schemas/course");
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || '';
const themesAP = [
    {
        name: 'Clase 8: Administración Eficiente y Errores del Proceso',
        course: '',
    },
    {
        name: 'Recursos, medidas, métricas e indicadores',
        course: '',
    },
    {
        name: 'Clase 4: "El Problema"',
        course: '',
    },
    {
        name: 'Clase 10: Estimación',
        course: '',
    },
];
const themesAR = [
    {
        name: 'Métodos de comunicación',
        course: '',
    },
];
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('INTENTANTO CONECTAR A LA DB: ', MONGO_URI);
        yield mongoose_1.default.connect(MONGO_URI);
        console.log('DB CONECTADA');
    });
}
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        const ap = yield course_1.Course.findOne({ name: 'Administración de proyectos' });
        const ar = yield course_1.Course.findOne({ name: 'Análisis de Requerimientos' });
        const themeAPWithIds = themesAP.map(theme => (Object.assign(Object.assign({}, theme), { course: ap === null || ap === void 0 ? void 0 : ap._id })));
        const themeARWithIds = themesAR.map(theme => (Object.assign(Object.assign({}, theme), { course: ar === null || ar === void 0 ? void 0 : ar._id })));
        yield theme_1.Theme.deleteMany();
        yield theme_1.Theme.insertMany([...themeAPWithIds, ...themeARWithIds]);
        return;
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDB();
        yield seed();
        console.log('DAÑOS AÑADIDOS A LA BASE DE DATOS');
        return;
    });
}
run();
