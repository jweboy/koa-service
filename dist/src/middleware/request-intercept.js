"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const locale_1 = require("../contants/locale");
const requestIntercept = () => {
    return async (ctx, next) => {
        const { status, body } = ctx.response;
        if (status === locale_1.NOT_FOUND_CODE) {
            ctx.body = {
                code: locale_1.NOT_FOUND_CODE,
                msg: locale_1.NOT_FOUND_TEXT,
                data: null,
            };
        }
        ctx.body = {
            code: locale_1.SUCCEED_CODE,
            msg: locale_1.SUCCEED_TEXT,
            data: body,
        };
        try {
            await next();
        }
        catch (err) {
            ctx.status = err.statusCode || err.status || 500;
            ctx.body = {
                message: err.message,
            };
        }
    };
};
exports.default = requestIntercept;
//# sourceMappingURL=request-intercept.js.map