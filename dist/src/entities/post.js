"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let Post = class Post {
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 50,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    typeorm_1.Column({
        length: 300,
    }),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "content", void 0);
tslib_1.__decorate([
    typeorm_1.CreateDateColumn(),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "createDate", void 0);
tslib_1.__decorate([
    typeorm_1.Column('simple-array'),
    tslib_1.__metadata("design:type", Array)
], Post.prototype, "pictures", void 0);
Post = tslib_1.__decorate([
    typeorm_1.Entity()
], Post);
exports.default = Post;
//# sourceMappingURL=post.js.map