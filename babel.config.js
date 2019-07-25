const presets = [
    [
        "@babel/preset-env",
        {
            "targets": "> 0.25%, not dead"
        }
    ]
];
const plugins = [
    "@babel/plugin-transform-runtime"
];

module.exports = function (api) {
    api.cache(true);
    return {
      presets,
      plugins
    };
}