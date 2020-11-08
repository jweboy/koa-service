"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const koa_router_1 = tslib_1.__importDefault(require("koa-router"));
const router = new koa_router_1.default();
const testRouter = router.get('/test', (ctx) => {
    ctx.body = 'test';
    console.log(ctx.status);
});
exports.default = testRouter;
//# sourceMappingURL=test.js.map