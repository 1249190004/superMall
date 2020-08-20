module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assert': '@/assert',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'router': '@/router'
      }
    }
  }
}
