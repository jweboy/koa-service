"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const post_1 = tslib_1.__importDefault(require("../entities/post"));
const response_1 = require("../contants/response");
async function findPosts(ctx) {
    const repository = typeorm_1.getRepository(post_1.default);
    const [items, total] = await repository
        .createQueryBuilder('post')
        .orderBy('post.createDate', 'DESC')
        .getManyAndCount();
    const resp = {
        data: { items, total },
        msg: response_1.STATUS_TEXT[response_1.StatusCode.Success].text,
        code: response_1.StatusCode.Success,
    };
    ctx.body = resp;
}
exports.findPosts = findPosts;
async function createPost(ctx) {
    const { body } = ctx.request;
    const repository = typeorm_1.getRepository(post_1.default);
    const post = repository.create(body);
    const postData = await repository.save(post);
    const resp = {
        data: postData,
        msg: response_1.STATUS_TEXT[response_1.StatusCode.Success].text,
        code: response_1.StatusCode.Success,
    };
    ctx.body = resp;
}
exports.createPost = createPost;
//# sourceMappingURL=post.js.map