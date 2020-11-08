"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const koa_compose_1 = tslib_1.__importDefault(require("koa-compose"));
function combineRouters(routers) {
    return () => {
        const middleware = [];
        routers.forEach((router) => {
            router.prefix('/api/pet');
            middleware.push(router.routes());
            middleware.push(router.allowedMethods({}));
        });
        return koa_compose_1.default(middleware);
    };
}
exports.combineRouters = combineRouters;
//# sourceMappingURL=router.js.map