module.exports = {
    // 打开这些配置就能在手机上通过pc的内网地址来查看项目
    // devServer: {
    //     open: true,
    //     host: '0.0.0.0',
    //     port: 8080,
    // },
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