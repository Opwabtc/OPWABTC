export default {
    mode: 'production',
    target: 'web',
    entry: './src/index.ts',
    watch: false,
    output: {
        filename: 'index.js',
        path: import.meta.dirname + '/browser',
        libraryTarget: 'module',
    },
    node: {
        __dirname: false,
    },
    experiments: {
        outputModule: true,
        asyncWebAssembly: true,
        syncWebAssembly: true,
    },
    resolve: {
        extensionAlias: {
            '.js': ['.js', '.ts'],
        },
        modules: ['.', 'node_modules'],
        extensions: ['.*', '.js', '.jsx', '.tsx', '.ts', '.wasm'],
        fallback: {},
    },
    cache: false,
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                resolve: {
                    fullySpecified: false,
                },
                use: [
                    {
                        loader: 'babel-loader',
                    },
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.webpack.json',
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        usedExports: true,
    },
    plugins: [],
};
