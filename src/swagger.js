"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const config_1 = __importDefault(require("./config"));
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'VAEP API',
        version: '1.0.0',
        description: 'Documentación generada con swagger-jsdoc',
    },
    servers: [
        {
            url: `${config_1.default.server}:${config_1.default.port}`,
        },
    ],
};
const options = {
    swaggerDefinition,
    apis: ['./src/router/**/*.router.ts'], // Ajusta a la ruta de tus archivos de rutas
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
