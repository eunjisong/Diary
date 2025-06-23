import path from 'path'

export const config: WebdriverIO.Config = {
    runner: 'local',
    tsConfigPath: './test/tsconfig.json',
    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [
        // 'path/to/excluded/files'
        './test/specs/login.e2e.ts'
    ],
    maxInstances: 10,
    capabilities: [
        {
        // capabilities for local Appium web tests on an Android Emulator
        platformName: 'Android',
        'appium:deviceName': 'pixel_7_pro',
        'appium:platformVersion': '16.0',
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.resolve('./android/app/build/outputs/apk/debug/diary.apk'),
        // 'appium:noReset': true
    },
    {
        platformName: 'iOS',
        'appium:deviceName': 'iPhone 16 Pro',
        'appium:platformVersion': '18.2',
        'appium:automationName': 'xcuitest',
        'appium:app': path.resolve('./ios/DerivedData/Debug-iphonesimulator/Diary.app'),
        // 'appium:noReset': true
    }
],
    hostname: '127.0.0.1',
    port: 4723,
    // services: ['appium'],
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}
