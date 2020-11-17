"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = tslib_1.__importDefault(require("path"));
const { NODE_ENV } = process.env;
const envFile = path_1.default.resolve(process.cwd(), `.env.${NODE_ENV}`);
require('dotenv').config({ path: envFile });
//# sourceMappingURL=init-env.js.map