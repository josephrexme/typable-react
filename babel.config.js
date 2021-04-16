module.exports = function(api) {
  api.cache(true)
  return {
    presets: [
     ["@babel/preset-env", { targets: { node: "current" } }],
    ],
    plugins: [
      "@babel/plugin-transform-runtime",
    ]
  }
}

