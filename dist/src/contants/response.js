"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StatusCode;
(function (StatusCode) {
    StatusCode[StatusCode["Success"] = 0] = "Success";
    StatusCode[StatusCode["Error"] = 1] = "Error";
})(StatusCode = exports.StatusCode || (exports.StatusCode = {}));
exports.STATUS_TEXT = {
    [StatusCode.Success]: {
        text: '请求成功',
    },
};
//# sourceMappingURL=response.js.map