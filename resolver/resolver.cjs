"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GzComResolver = void 0;
var com = "@sugaz/gz-com";
function kebabCase(key) {
    var result = key.replace(/([A-Z])/g, " $1").trim();
    return result.split(" ").join("-").toLowerCase();
}
function getSideEffects(partialName, options) {
    var _a = options.importStyle, importStyle = _a === void 0 ? true : _a;
    if (importStyle === "sass") {
        return [
            "".concat(com, "/src/theme-default/base.scss"),
            "".concat(com, "/src/theme-default/").concat(partialName, ".scss")
        ];
    }
    else if (importStyle === true || importStyle === "css") {
        return [
            "".concat(com, "/lib/theme-default/base.css"),
            "".concat(com, "/lib/theme-default/").concat(partialName, ".css")
        ];
    }
}
function GzComResolver(options) {
    if (options === void 0) { options = {}; }
    return {
        type: "component",
        resolve: function (name) {
            if (name.startsWith("Gz")) {
                var partialName = name.slice(2);
                return {
                    name: partialName,
                    from: "".concat(com, "/lib/").concat(kebabCase(partialName)),
                    sideEffects: getSideEffects(kebabCase(partialName), options)
                };
            }
        }
    };
}
exports.GzComResolver = GzComResolver;
