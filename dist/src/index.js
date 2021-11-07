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
import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cors from "cors";
import { apiRoute } from "./routes";
import { AuthResolver, AcademicYearResolver, AcademicYearScheduleResolver, TermResolver, SubjectResolver, ClassResolver, ClassScheduleResolver, OneOffScheduleResolver, RepeatScheduleResolver, } from "./graphql/resolvers";
import { DatabaseService } from "./services";
import path from "path";
import { TaskResolver } from "./graphql/resolvers/task/task.resolver";
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, databaseService, apolloServer, _a, PORT;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                app = express();
                app.use(bodyParser.urlencoded({ extended: true }));
                app.use(express.json());
                app.use(cookieParser());
                app.use(cors({
                    credentials: true,
                    origin: [
                        "https://studio.apollographql.com",
                        "http://localhost:3000",
                        "http://localhost:3001",
                    ],
                }));
                databaseService = new DatabaseService();
                return [4, databaseService.init()];
            case 1:
                _c.sent();
                app.use("/api", apiRoute);
                _a = ApolloServer.bind;
                _b = {};
                return [4, buildSchema({
                        resolvers: [
                            AuthResolver,
                            AcademicYearResolver,
                            AcademicYearScheduleResolver,
                            TermResolver,
                            SubjectResolver,
                            ClassResolver,
                            ClassScheduleResolver,
                            OneOffScheduleResolver,
                            RepeatScheduleResolver,
                            TaskResolver,
                        ],
                    })];
            case 2:
                apolloServer = new (_a.apply(ApolloServer, [void 0, (_b.schema = _c.sent(),
                        _b.context = function (_a) {
                            var req = _a.req, res = _a.res;
                            return ({ req: req, res: res });
                        },
                        _b)]))();
                return [4, apolloServer.start()];
            case 3:
                _c.sent();
                apolloServer.applyMiddleware({ app: app, cors: false });
                PORT = process.env.PORT || 8000;
                if (process.env.NODE_ENV === "production") {
                    app.use(express.static("web/build"));
                    app.get("*", function (_req, res) {
                        return res.sendFile(path.resolve(__dirname, "web", "build", "index.html"));
                    });
                }
                app.listen(PORT, function () {
                    console.log("Server running at http://localhost:8000\nGraphql running at http://localhost:8000/graphql");
                });
                return [2];
        }
    });
}); })();
//# sourceMappingURL=index.js.map