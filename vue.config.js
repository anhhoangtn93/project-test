const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // create a Development server
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://vinnet.vn/',
        logLevel: 'debug',
        changeOrigin: true,
        headers: {
          Connection: 'keep-alive'
        },
      }
    }
  }
})
