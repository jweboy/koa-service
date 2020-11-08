"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const koa_router_1 = tslib_1.__importDefault(require("koa-router"));
const post_1 = require("../controller/post");
const router = new koa_router_1.default();
const postRouter = router.get('/posts', post_1.findPosts).post('/post', post_1.createPost);
exports.default = postRouter;
//# sourceMappingURL=post.js.map