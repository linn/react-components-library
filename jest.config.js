module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest'
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js']
};
