"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testClient = exports.cookie = exports.getCookies = void 0;
const graphql_1 = require("graphql");
const resolvers_1 = require("src/graphql/resolvers");
const class_resolver_1 = require("src/graphql/resolvers/class/class.resolver");
const classSchedule_resolver_1 = require("src/graphql/resolvers/class/classSchedule.resolver");
const oneOffSchedule_resolver_1 = require("src/graphql/resolvers/class/oneOffSchedule.resolver");
const repeatSchedule_resolver_1 = require("src/graphql/resolvers/class/repeatSchedule.resolver");
const task_resolver_1 = require("src/graphql/resolvers/task/task.resolver");
const type_graphql_1 = require("type-graphql");
let cookies = {};
const getCookies = () => {
    return cookies;
};
exports.getCookies = getCookies;
const cookie = (key, value, options) => {
    Object.assign(cookies, Object.assign(Object.assign({}, cookies), { [key]: value }));
};
exports.cookie = cookie;
const testClient = async ({ source, variableValues, headers, }) => {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [
            resolvers_1.AuthResolver,
            resolvers_1.AcademicYearResolver,
            resolvers_1.AcademicYearScheduleResolver,
            resolvers_1.TermResolver,
            resolvers_1.SubjectResolver,
            class_resolver_1.ClassResolver,
            classSchedule_resolver_1.ClassScheduleResolver,
            oneOffSchedule_resolver_1.OneOffScheduleResolver,
            repeatSchedule_resolver_1.RepeatScheduleResolver,
            task_resolver_1.TaskResolver,
        ],
    });
    return (0, graphql_1.graphql)({
        schema: schema,
        source: source,
        variableValues: variableValues,
        contextValue: {
            req: {
                headers: headers,
                cookies: cookies,
            },
            res: {
                cookie: exports.cookie,
            },
        },
    });
};
exports.testClient = testClient;
//# sourceMappingURL=graphqlTestClient.js.map