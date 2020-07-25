// Karma configuration
// Generated on Thu Sep 20 2018 02:29:42 GMT+0900 (KST)
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    webpack: {
        mode: 'development',
        module: {
          rules: [
            { test: /\.js$/, use: "babel-loader" }
          ]
        }
    },
    files: [
      'test/**Spec.js',
      'src/index.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/**Spec.js': ['webpack'],
      'src/index.js': ['webpack']
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