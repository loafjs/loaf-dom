module.exports = {
  mode: 'production',
  output: {
    filename: 'index.js'
  },
  module: {
    rules: [{ 
      test: /\.js$/, 
      use: "babel-loader",
      exclude: ['/node_modules']
    }]
  }
}