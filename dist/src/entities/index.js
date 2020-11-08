"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_flow_1 = tslib_1.__importDefault(require("dotenv-flow"));
const post_1 = tslib_1.__importDefault(require("./post"));
dotenv_flow_1.default.config();
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_TABLE, DB_TYPE } = process.env;
const options = {
    type: 'mysql',
    host: DB_HOST,
    port: 3306,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_TABLE,
    synchronize: true,
    logging: ['error', 'schema'],
    entities: [post_1.default],
};
class Database {
    async connect() {
        if (this.connection) {
            await this.connection.connect();
            return this.connection;
        }
        this.connection = await typeorm_1.createConnection(options);
        return this.connection;
    }
    getTable(repository) {
        return this.connection.getRepository(repository);
    }
}
const db = new Database();
exports.default = db;
//# sourceMappingURL=index.js.map