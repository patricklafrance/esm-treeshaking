// @ts-check

import BundleAnalyzerPluginModule from "webpack-bundle-analyzer";
import path from "path";

/** @type {import("webpack").Configuration} */
export default {
    mode: "production",
    target: "web",
    entry: "./src/index.js",
    output: {
        path: path.resolve("dist"),
        clean: true
    },
    optimization: {
        minimize: false
    },
    resolve: {
        extensions: [".js"]
    },
    plugins: [
        new BundleAnalyzerPluginModule.BundleAnalyzerPlugin({
            generateStatsFile: true,
            openAnalyzer: false
        })
    ]
};
