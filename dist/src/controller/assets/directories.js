"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const directories_1 = tslib_1.__importDefault(require("../../entities/assets/directories"));
exports.createDirectory = async (ctx, next) => {
    const { body } = ctx.request;
    const repository = typeorm_1.getRepository(directories_1.default);
    const directory = repository.create(body);
    const data = await repository.save(directory);
    ctx.body = data;
    next();
};
exports.getDirectories = async (ctx, next) => {
    const { query } = ctx.request;
    const repository = typeorm_1.getRepository(directories_1.default);
    const [items, total] = await repository
        .createQueryBuilder('assets_directory')
        .orderBy('assets_directory.createAt', 'DESC')
        .getManyAndCount();
    ctx.body = { items, total };
    next();
};
//# sourceMappingURL=directories.js.map