module.exports = {
    presets: ['@vue/cli-plugin-babel/preset', ["@babel/preset-env", {modules: false}]],
    plugins: [
        [
            "component",
            {
                libraryName: "element-ui",
                styleLibraryName: "theme-chalk"
            },
        ],
    ]
}
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push("transform-remove-console");
}
