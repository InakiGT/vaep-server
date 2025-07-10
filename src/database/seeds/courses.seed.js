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
const course_1 = require("../schemas/course");
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_URI || '';
const courses = [
    {
        name: 'Análisis de Requerimientos'
    },
    {
        name: 'Administración de proyectos'
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
        yield course_1.Course.deleteMany();
        yield course_1.Course.insertMany([...courses]);
        console.log('DAÑOS AÑADIDOS A LA BASE DE DATOS');
        return;
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        yield connectDB();
        yield seed();
    });
}
run();
