"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const post_1 = tslib_1.__importDefault(require("../entities/post"));
async function findPosts(ctx, next) {
    const repository = typeorm_1.getRepository(post_1.default);
    const [items, total] = await repository
        .createQueryBuilder('post')
        .orderBy('post.createDate', 'DESC')
        .getManyAndCount();
    ctx.body = { items, total };
    next();
}
exports.findPosts = findPosts;
async function createPost(ctx, next) {
    const { body } = ctx.request;
    const repository = typeorm_1.getRepository(post_1.default);
    const post = repository.create(body);
    const data = await repository.save(post);
    ctx.body = data;
    next();
}
exports.createPost = createPost;
//# sourceMappingURL=post.js.map