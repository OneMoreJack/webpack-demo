const presets = [
    [
        "@babel/preset-env",
        {
            "targets": "> 0.25%, not dead"
        }
    ]
];
const plugins = [
    [
        "@babel/plugin-transform-runtime",
        {
            "absoluteRuntime": false,
            "corejs": false,
            "helpers": true,
            "regenerator": true,
            "useESModules": false
        }
    ]
];
const overrides = [
    {
       exclude: /node_modules/
    }
] 

module.exports = function (api) {
    api.cache(true);
    return {
      presets,
      plugins,
      overrides
    };
}