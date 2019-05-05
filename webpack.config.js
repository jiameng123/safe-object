const path = require("path");

module.exports = {
    entry: "./index.js",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "index.js",
        globalObject: "this",
        libraryTarget: "umd",
        umdNamedDefine: true
    }
};
