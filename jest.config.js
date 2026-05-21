module.exports = {
    testEnvironment: "node",
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },
    roots: ["tests"],
    moduleFileExtensions: ["js"],
};