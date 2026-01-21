module.exports = {
    testEnvironment: 'node',
    reporters: [
        'default',
        ['jest-junit', {
            outputDirectory: './test-results',
            outputName: 'junit.xml',
        }],
        ['jest-allure', {
            outputDirectory: './allure-results'
        }]
    ]
};