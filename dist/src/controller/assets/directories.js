"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const directories_1 = tslib_1.__importDefault(require("../../entities/assets/directories"));
exports.createDirectory = async (ctx) => {
    const { body } = ctx.request;
    const repository = typeorm_1.getRepository(directories_1.default);
    const directory = repository.create(body);
    const data = await repository.save(directory);
    console.log(data);
};
//# sourceMappingURL=directories.js.map