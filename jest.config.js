module.exports = {
    testEnvironment: 'jsdom', // Ensure jsdom environment
    transform: {
        '^.+\\.jsx?$': 'babel-jest' // Use babel-jest to transform JSX files
    },
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'] // Optional: if you have setupTests.js
};
