"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const koa_router_1 = tslib_1.__importDefault(require("koa-router"));
const router_1 = require("../utils/router");
const test_1 = tslib_1.__importDefault(require("./test"));
const post_1 = tslib_1.__importDefault(require("./post"));
const file_1 = tslib_1.__importDefault(require("./file"));
const directories_1 = tslib_1.__importDefault(require("./assets/directories"));
const router = new koa_router_1.default();
const indexRouter = router.get('/', (ctx) => {
    ctx.body = 'mock接口平台';
});
exports.default = router_1.combineRouters([directories_1.default, indexRouter, post_1.default, file_1.default, test_1.default]);
//# sourceMappingURL=index.js.map