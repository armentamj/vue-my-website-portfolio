const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy:{
      '/pb': {
        target: 'http://localhost:8090',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/pb': ''
        }
      }
    }
  }
})
