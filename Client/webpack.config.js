const DevPlugin = require('./DevPlugin')
const path = require('path');

module.exports = {
    entry: './src/index.tsx',

    mode : 'development',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist')
    },

    resolve: {
        extensions: ['.ts','.tsx','.js'],
        alias: {
            "lib": path.resolve(__dirname,"src/lib/")
        }
    },

    devtool: 'source-map',

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {loader: 'awesome-typescript-loader'}
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            }
        ]
    },
    plugins: [
        new DevPlugin()
    ]
}
