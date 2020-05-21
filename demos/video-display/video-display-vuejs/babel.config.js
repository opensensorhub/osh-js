const oshPlugins = [
    [
        require.resolve('babel-plugin-module-resolver'),
        {
            root: ["./src/"],
            alias: {
                "osh": "../../../source/osh",
                "ext/osh": "../../../source/osh-ext",
            }
        }
    ]
];

module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: [...oshPlugins],
};
