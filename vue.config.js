module.exports = {
  publicPath : process.env.NODE_ENV === 'production' ? './' : '/',
  css: {
    extract: true,
    modules: false,
    loaderOptions: {
      sass: {
        data: `
          @import "@/style.scss";
        `
      }
    }
  },
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'https://api-wallet-ela-testnet.elastos.org',
    //     changeOrigin: true,
    //     // "pathRewrite": {
    //     //   "^/api/": "/api"
    //     // },
    //     // disableHostCheck: false
    
    //   }
    // }
  }

}