// @ts-check

import BundleAnalyzerPluginModule from "webpack-bundle-analyzer";
import path from "path";

/** @type {import("webpack").Configuration} */
export default {
    mode: "production",
    target: "web",
    entry: "./src/index.tsx",
    output: {
        path: path.resolve("dist"),
        clean: true
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true,
                        configFile: path.resolve("tsconfig.json")
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    plugins: [
        new BundleAnalyzerPluginModule.BundleAnalyzerPlugin({
            generateStatsFile: true,
            openAnalyzer: false
        })
    ]
};
