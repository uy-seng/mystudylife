"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const oauth_route_1 = require("./routes/oauth.route");
const resolvers_1 = require("./graphql/resolvers");
const services_1 = require("./services");
const path_1 = __importDefault(require("path"));
(async () => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, cors_1.default)({
        credentials: true,
        origin: [
            "https://studio.apollographql.com",
            "http://localhost:3000",
            "http://localhost:3001",
        ],
    }));
    const databaseService = new services_1.DatabaseService();
    await databaseService.init();
    const passportService = new services_1.PassportService(app);
    passportService.initGoogleOAuthStrategy();
    passportService.initFacebookOAuthStrategy();
    app.use("/oauth", oauth_route_1.oauthRoute);
    app.use("/api", routes_1.apiRoute);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [
                resolvers_1.AuthResolver,
                resolvers_1.AcademicYearResolver,
                resolvers_1.AcademicYearScheduleResolver,
                resolvers_1.TermResolver,
                resolvers_1.SubjectResolver,
                resolvers_1.ClassResolver,
                resolvers_1.ClassScheduleResolver,
                resolvers_1.OneOffScheduleResolver,
                resolvers_1.RepeatScheduleResolver,
                resolvers_1.TaskResolver,
                resolvers_1.HolidayResolver,
            ],
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: false });
    const PORT = process.env.PORT || 8000;
    if (process.env.NODE_ENV === "production") {
        app.use(express_1.default.static("web/build"));
        app.get("*", (_req, res) => {
            return res.sendFile(path_1.default.resolve(__dirname, "web", "build", "index.html"));
        });
    }
    app.listen(PORT, () => {
        console.log("Client running at http://localhost:8000");
        console.log(`Server running at http://localhost:8000\nGraphql running at http://localhost:8000/graphql`);
    });
})();
//# sourceMappingURL=index.js.map