import path from 'path'

export const config: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  specs: ["./tests/specs/**/*.spec.ts"],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'iOS',
      'appium:deviceName': 'iPhone 16 Pro',
      'appium:platformVersion': '18.2',
      'appium:automationName': 'XCUITest',
      'appium:app': path.resolve('./ios/DerivedData/Build/Products/Debug-iphonesimulator/Diary.app'), // iOS 앱 경로
      'appium:noReset': true
    },
    {
      platformName: 'Android',
      'appium:deviceName': 'Pixel_7_Pro_API_34',
      'appium:platformVersion': '14',
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.resolve('./android/app/build/outputs/apk/debug/diary.apk'),
    'appium:noReset': true
    }
  ],
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  }
}
