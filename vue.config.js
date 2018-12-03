module.exports = {
    // 基本路径
    baseUrl: process.env.NODE_ENV === 'production' ? 'http://10.19.7.69:8080/checkoutsys' : './',
    // 输出文件目录
    outputDir: 'checkoutsys',
    // webpack-dev-server 相关配置
    devServer: {
      port: 8888,
      host: 'localhost',
      proxy: 'http://10.19.7.69:8083'
      // proxy: 'http://10.88.195.193:8083'
    }
  }
