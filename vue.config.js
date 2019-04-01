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
  }

}