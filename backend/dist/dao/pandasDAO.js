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
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
// let pandas; // stores a reference to the db
/**
 * The PandasDAO class provides a data access layer that interacts with the database to retrieve and store data.
 */
class PandasDAO {
    static injectDB(conn) {
        return __awaiter(this, void 0, void 0, function* () {
            if (PandasDAO.pandas) {
                return;
            }
            try {
                PandasDAO.pandas = yield conn
                    .db(process.env.PANDAS_DB_NAME)
                    .collection('pandas');
            }
            catch (e) {
                console.error(`Unable to establish a collection handle in pandasDAO: ${e}`);
            }
        });
    }
    static getPandas({ filters = {}, page = 0, pandasPerPage = 10, }) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (filters) {
                if ('name' in filters) {
                    query = { $text: { $search: filters['name'] } };
                }
                else if ('age' in filters) {
                    query = { age: { $eq: filters['age'] } };
                }
                else if ('location' in filters) {
                    query = { location: { $eq: filters['location'] } };
                }
            }
            let cursor;
            try {
                cursor = yield PandasDAO.pandas.find(query);
            }
            catch (e) {
                console.error(`Unable to issue find command, ${e}`);
                return { pandasList: [], totalNumPandas: 0, totalPages: 0 };
            }
            // Make sure that page is at least 0
            const positivePage = page >= 0 ? page : 0;
            const displayCursor = cursor
                .limit(pandasPerPage)
                .skip(pandasPerPage * positivePage);
            try {
                const pandasList = yield displayCursor.toArray();
                const totalNumPandas = yield PandasDAO.pandas.countDocuments(query);
                const totalPages = Math.ceil(totalNumPandas / pandasPerPage);
                return { pandasList, totalNumPandas, totalPages };
            }
            catch (e) {
                console.error(`Unable to convert cursor to array or problem counting documents, ${e}`);
                return { pandasList: [], totalNumPandas: 0, totalPages: 0 };
            }
        });
    }
    static getPandaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pipeline = [
                    {
                        $match: {
                            _id: new mongodb_1.ObjectId(id),
                        },
                    },
                ];
                return yield PandasDAO.pandas.aggregate(pipeline).next();
            }
            catch (e) {
                console.error(`Something went wrong in getPandaById: ${e}`);
                throw e;
            }
        });
    }
    static addPanda(name, age, location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pandaDoc = { name, age, location };
                return yield PandasDAO.pandas.insertOne(pandaDoc);
            }
            catch (e) {
                console.error(`Unable to post panda, ${e}`);
                return { error: e };
            }
        });
    }
    static updatePanda(pandaId, name, age, location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updateResponse = yield PandasDAO.pandas.updateOne({ _id: new mongodb_1.ObjectId(pandaId) }, { $set: { name, age, location } });
                return updateResponse;
            }
            catch (e) {
                console.error(`Unable to update panda, ${e}`);
                return { error: e };
            }
        });
    }
    static deletePanda(pandaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deleteResponse = yield PandasDAO.pandas.deleteOne({
                    _id: new mongodb_1.ObjectId(pandaId),
                });
                return deleteResponse;
            }
            catch (e) {
                console.error(`Unable to delete panda, ${e}`);
                return { error: e };
            }
        });
    }
    static getPandaByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pipeline = [
                    {
                        $match: {
                            name: name,
                        },
                    },
                ];
                return yield PandasDAO.pandas.aggregate(pipeline).next();
            }
            catch (e) {
                console.error(`Something went wrong in getPandaByName: ${e}`);
                throw e;
            }
        });
    }
}
exports.default = PandasDAO;
