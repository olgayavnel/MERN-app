"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pandas_controller_1 = __importDefault(require("./pandas.controller"));
const router = express_1.default.Router();
router.route('/').get(pandas_controller_1.default.apiGetPandas);
// getting the detail of a single panda
router.route('/:id').get(pandas_controller_1.default.apiGetPandaById);
// creating a new panda
router.route('/').post(pandas_controller_1.default.apiCreatePanda);
// updating a panda
router.route('/:id').put(pandas_controller_1.default.apiUpdatePanda);
// deleting a panda
router.route('/:id').delete(pandas_controller_1.default.apiDeletePanda);
exports.default = router;
