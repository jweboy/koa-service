"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let AssetsDirectory = class AssetsDirectory {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], AssetsDirectory.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ length: 20 }),
    tslib_1.__metadata("design:type", String)
], AssetsDirectory.prototype, "name", void 0);
AssetsDirectory = tslib_1.__decorate([
    typeorm_1.Entity()
], AssetsDirectory);
exports.default = AssetsDirectory;
//# sourceMappingURL=directories.js.map