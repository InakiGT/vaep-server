"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const config_1 = __importDefault(require("./config"));
const database_1 = __importDefault(require("./database"));
const router_1 = __importDefault(require("./router"));
const swagger_1 = __importDefault(require("./swagger"));
require("./utils/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
(0, database_1.default)();
(0, router_1.default)(app);
app.listen(config_1.default.port, () => {
    console.log(`Server listening on port: ${config_1.default.port}`);
});
