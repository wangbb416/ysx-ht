const path = require('path')

module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? './': "/", // 基本路径-引用文件的路径
    publicPath: './',
    outputDir: 'dist', // 输出文件目录
    assetsDir: 'static', //放置打包生成的静态资源 (js、css、img、fonts) 的目录。
    lintOnSave: false, // eslint-loader 是否在保存的时候检查 开发环境下关闭eslint检查
    // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    // webpack配置
    chainWebpack: config => {
        // config.resolve.symlinks(true);
        // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        // types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
    },
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
        } else {
            // 为开发环境修改配置...
            config.mode = 'development'
        }
        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components')
                } // 别名配置
            }
        })
    },
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    // css相关配置
    css: {
        // extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: true, // 开启 CSS source maps?
        loaderOptions: {
            css: {} // 这里的选项会传递给 css-loader
            //postcss: {} // 这里的选项会传递给 postcss-loader
        }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
        requireModuleExtension: true // 启用 CSS modules for all css / pre-processor files.
    },
    parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    // webpack-dev-server 相关配置
    devServer: {
        //  hot 和 hotOnly 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败
        hot: true,
        hotOnly: true,
        inline: true,
        // open: process.platform === 'darwin',
        host: '0.0.0.0', // 允许外部ip访问
        disableHostCheck: true,
        // port: 8080, // 端口
        // https: false, // 启用https
        // overlay: {
        //   warnings: true,
        //   errors: true
        // }, // 错误、警告在页面弹出
        proxy: {
            // '/lsxh': {
            //     // target: 'http://192.168.1.28:5007',//开发
            //     target: 'http://192.168.1.35:30057', //测试
            //     // target: 'http://192.168.1.126:6801', //宇宇
            //     // target: 'http://192.168.1.81:5007',//王威
            //     // target: 'https://bluecycleapi.tian-wang.com',//正式
            //     // target: 'http://lsxhusercs.tian-wang.com/',
            //     changeOrigin: true, // 允许websockets跨域
            //     ws: true,
            //     pathRewrite: {
            //         '^/lsxh': ''
            //     }
            // },

            '/new-web': {
                // target: 'http://192.168.2.53:6801', //不走gatway校验
                // target: 'http://192.168.2.53:6901', //开发环境,gatway校验
                target: 'http://192.168.1.35:30691', //测试环境,gatway校验
                // target: 'http://192.168.1.98:6801', //王威
                // target: 'http://192.168.1.126:6801', //宇宇
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/new-web': ''
                }
            },

            '/fish-easy/company': {
                target: 'http://lsxhusercs.tian-wang.com/',
                // target: 'http://lsxhusercs.tian-wang.com/',
                changeOrigin: true, // 允许websockets跨域
                ws: true,
                pathRewrite: {
                    '^/fish-easy/company': '/fish-easy/company'
                }
            }
        } // 代理转发配置，用于调试环境
    },
    // 第三方插件配置
    pluginOptions: {}
}
