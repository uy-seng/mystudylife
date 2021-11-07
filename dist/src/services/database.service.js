var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { createConnection } from "typeorm";
var DatabaseService = (function () {
    function DatabaseService() {
    }
    DatabaseService.prototype.getEntities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entities;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entities = [];
                        return [4, this.connection.entityMetadatas];
                    case 1:
                        (_a.sent()).forEach(function (x) {
                            return entities.push({ name: x.name, tableName: x.tableName });
                        });
                        return [2, entities];
                }
            });
        });
    };
    DatabaseService.prototype.cleanDatabase = function (entities) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, entities_1, entity, repository, SQLCommand, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        _i = 0, entities_1 = entities;
                        _a.label = 1;
                    case 1:
                        if (!(_i < entities_1.length)) return [3, 5];
                        entity = entities_1[_i];
                        return [4, this.connection.getRepository(entity.name)];
                    case 2:
                        repository = _a.sent();
                        SQLCommand = "TRUNCATE TABLE " + entity.tableName + " RESTART IDENTITY CASCADE;";
                        return [4, repository.query(SQLCommand)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3, 1];
                    case 5: return [3, 7];
                    case 6:
                        error_1 = _a.sent();
                        throw new Error("ERROR: Cleaning test db: " + error_1);
                    case 7: return [2];
                }
            });
        });
    };
    DatabaseService.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, CLEAN_DB, entities;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4, createConnection("" + process.env.NODE_ENV)];
                    case 1:
                        _a.connection = _b.sent();
                        console.log("Database initialized...");
                        CLEAN_DB = false;
                        return [4, this.getEntities()];
                    case 2:
                        entities = _b.sent();
                        if (entities && CLEAN_DB) {
                            this.cleanDatabase(entities);
                            console.log("Database cleaned...");
                        }
                        return [2];
                }
            });
        });
    };
    return DatabaseService;
}());
export { DatabaseService };
//# sourceMappingURL=database.service.js.map