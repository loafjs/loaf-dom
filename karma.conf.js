// Karma configuration
// Generated on Thu Sep 20 2018 02:29:42 GMT+0900 (KST)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    webpack: {
        mode: 'development',
        module: {
            rules: [{
              test: /\.js?$/,
              loader: 'babel-loader',
              options: {
                presets: ['env']
              },
              exclude: ['/node_modules']
            }]
        }
    },
    files: [
      'test/**Spec.js',
      'loaf-dom.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**Spec.js': ['webpack'],
      'loaf-dom.js': ['webpack']
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  })
}
