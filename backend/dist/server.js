"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Contains the code that defines this Express application
 * and any routes or middleware that it uses.
 */
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pandas_route_1 = __importDefault(require("./api/pandas.route"));
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
exports.default = app;
