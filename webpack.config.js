module.exports = {
  entry:'./index.js',
  mode:'development',
  module: {
    rules: [
      { 
        test: /\.js$/, 
        use: [
          {loader:'./loader-ast.js'},
          {loader:'./loader-demo.js'},
        ] 
      }
    ]
  }
}
