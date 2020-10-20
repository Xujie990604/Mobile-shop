module.exports = {
    // 打开这配置，在本地开启一个服务器。运行项目。
    // devServer: {
    //     open: true,
    //     host: '0.0.0.0',
    //     port: 8080,
    // },
    // 打开之后dist文件夹的index.html打开不为空白
    publicPath: "./",
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
            }
        },
        
    },
}