"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const koa_1 = tslib_1.__importDefault(require("koa"));
const koa_bodyparser_1 = tslib_1.__importDefault(require("koa-bodyparser"));
const dotenv_flow_1 = tslib_1.__importDefault(require("dotenv-flow"));
const cors_1 = tslib_1.__importDefault(require("@koa/cors"));
const koa_logger_1 = tslib_1.__importDefault(require("koa-logger"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const entities_1 = tslib_1.__importDefault(require("./entities"));
dotenv_flow_1.default.config();
const app = new koa_1.default();
const { PORT, PROTOCOL, HOST, DB_HOST, DB_PORT } = process.env;
console.log(process.env.PROTOCOL);
app
    .use(koa_bodyparser_1.default())
    .use(cors_1.default({}))
    .use(routes_1.default())
    .use(koa_logger_1.default());
app.listen(PORT, async () => {
    try {
        await entities_1.default.connect();
        console.log(`👏 Database connection succeeded at http://${DB_HOST}:${DB_PORT}`);
        console.log(`🚀 Server running at ${PROTOCOL}://${HOST}:${PORT}/api/pet`);
    }
    catch (err) {
        throw err;
    }
});
process.on('unhandledRejection', (err) => {
    throw err;
});
//# sourceMappingURL=app.js.map