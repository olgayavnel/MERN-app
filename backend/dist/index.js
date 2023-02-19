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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
const pandasDAO_1 = __importDefault(require("./dao/pandasDAO"));
const pandas_route_1 = __importDefault(require("./api/pandas.route"));
dotenv_1.default.config();
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/v1/pandas', pandas_route_1.default);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));
mongodb_1.MongoClient.connect(process.env.PANDAS_DB_URI, {
    wtimeoutMS: 2500,
})
    .catch((err) => {
    console.error(err.stack);
    process.exit(1);
})
    .then((client) => __awaiter(void 0, void 0, void 0, function* () {
    yield pandasDAO_1.default.injectDB(client);
    app.listen(port, () => {
        console.log(`⚡️ Server is running on port ${port}`);
    });
}));
