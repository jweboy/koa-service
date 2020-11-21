"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const koa_router_1 = tslib_1.__importDefault(require("koa-router"));
const directories_1 = require("../../controller/assets/directories");
const router = new koa_router_1.default();
const directoryRouter = router
    .get('/assets/directory/', directories_1.getDirectories)
    .post('/assets/directory/create', directories_1.createDirectory);
exports.default = directoryRouter;
//# sourceMappingURL=directories.js.map