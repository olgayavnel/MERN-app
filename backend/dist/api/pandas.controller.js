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
const pandasDAO_1 = __importDefault(require("../dao/pandasDAO"));
/**
 * PandasController class acts as a controller that
 * handles incoming HTTP requests from a route and
 * communicates with the DAO layer.
 */
class PandasController {
    static apiGetPandas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const pandasPerPage = req.query.pandasPerPage
                ? parseInt(req.query.pandasPerPage, 10)
                : 10;
            const page = req.query.page
                ? parseInt(req.query.page, 10) - 1
                : 0;
            let filters = {};
            if (req.query.age) {
                filters = Object.assign(Object.assign({}, filters), { age: req.query.age });
            }
            else if (req.query.location) {
                filters = Object.assign(Object.assign({}, filters), { location: req.query.location });
            }
            else if (req.query.name) {
                filters = Object.assign(Object.assign({}, filters), { name: req.query.name });
            }
            const { pandasList, totalNumPandas, totalPages } = yield pandasDAO_1.default.getPandas({
                filters,
                page,
                pandasPerPage,
            });
            let response = {
                pandas: pandasList,
                page: page + 1,
                filters: filters,
                entries_per_page: pandasPerPage,
                total_results: totalNumPandas,
                totalPages: totalPages,
            };
            res.json(response);
        });
    }
    // handling the route of getting the detail of a single panda
    static apiGetPandaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id || '';
                let panda = yield pandasDAO_1.default.getPandaById(id);
                if (!panda) {
                    res.status(404).json({ error: 'Not found' });
                    return;
                }
                res.json(panda);
            }
            catch (e) {
                console.log(`api, ${e}`);
                res.status(500).json({ error: e });
            }
        });
    }
    // handling the route of creating a new panda
    static apiCreatePanda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pandaName = req.body.name;
                const pandaAge = req.body.age;
                const pandaLocation = req.body.location;
                const pandaResponse = yield pandasDAO_1.default.addPanda(pandaName, pandaAge, pandaLocation);
                res.json({ status: 'success', response: pandaResponse });
            }
            catch (e) {
                res.status(500).json({ error: e });
            }
        });
    }
    // handling the route of updating a panda
    static apiUpdatePanda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pandaId = req.params.id;
                const pandaName = req.body.name;
                const pandaAge = req.body.age;
                const pandaLocation = req.body.location;
                const pandaResponse = yield pandasDAO_1.default.updatePanda(pandaId, pandaName, pandaAge, pandaLocation);
                if (pandaResponse.error) {
                    res.status(400).json({ error: pandaResponse.error });
                    return;
                }
                if (pandaResponse.modifiedCount === 0) {
                    throw new Error('unable to update panda - user may not be original poster');
                }
                res.json({ status: 'success', response: pandaResponse });
            }
            catch (e) {
                res.status(500).json({ error: e });
            }
        });
    }
    // handling the route of deleting a panda
    static apiDeletePanda(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pandaId = req.params.id;
                const pandaResponse = yield pandasDAO_1.default.deletePanda(pandaId);
                res.json({ status: 'success', response: pandaResponse });
            }
            catch (e) {
                res.status(500).json({ error: e });
            }
        });
    }
    // handling the route of getting the detail of a single panda by name
    static apiGetPandaByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let name = req.params.name || '';
                let pandaResponse = yield pandasDAO_1.default.getPandaByName(name);
                if (!pandaResponse) {
                    res.status(404).json({ error: 'Not found' });
                    return;
                }
                res.json(pandaResponse);
            }
            catch (e) {
                console.log(`api, ${e}`);
                res.status(500).json({ error: e });
            }
        });
    }
}
exports.default = PandasController;
