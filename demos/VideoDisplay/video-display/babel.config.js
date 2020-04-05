const oshPlugins = [
    [
        require.resolve('babel-plugin-module-resolver'),
        {
            root: ["./src/"],
            alias: {
                "osh": "../../../source/osh",
                "ext/osh": "../../../source/ext/osh",
            }
        }
    ]
];

module.exports = {
    presets: ["@vue/cli-plugin-babel/preset"],
    plugins: [...oshPlugins],
};
