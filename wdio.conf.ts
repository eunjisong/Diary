import path from 'path'
import { addTestResult, getOrCreateSection, getOrCreateTestCase, getOrCreateTestRun } from './test_solutions/testrail/testrail.service';

let testRunId: number | undefined
let sectionCache: Record<string, number> = {}
const platformToRun = process.env.PLATFORM
const isBitrise = process.env.CI === 'true'
const iosAppPath = isBitrise
  ? "/Users/vagrant/git/build/Build/Products/Debug-iphonesimulator/diary.app"
  : path.resolve('./ios/DerivedData/Build/Products/Debug-iphonesimulator/diary.app');

export const config: WebdriverIO.Config = {
  runner: 'local',
  tsConfigPath: './tsconfig.json',
  specs: ["./tests/specs/**/*.spec.ts"],
  exclude: [],
  maxInstances: 1,
  capabilities: [
    {
      platformName: 'iOS',
      'appium:deviceName': 'iPhone 16',
      'appium:platformVersion': '18.2',
      'appium:automationName': 'XCUITest',
      'appium:app': iosAppPath
    },
    {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '14',
      'appium:automationName': 'UiAutomator2',
      'appium:app': path.resolve('./android/app/build/outputs/apk/debug/diary.apk')
    }
  ].filter(cap => {
    if (!platformToRun) return true; // 아무것도 지정 안 했으면 둘 다
    return cap.platformName.toLowerCase() === platformToRun.toLowerCase();
  }),
  logLevel: 'info',
  bail: 0,
  waitforTimeout: 5000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000
  },


  before: async () => {
    const platform = driver.isAndroid ? 'Android' : 'iOS';
    testRunId = await getOrCreateTestRun(platform)
    console.log('[DEBUG BEFORE] testRunId set to:', testRunId);
  },


  beforeTest: async (test) => {
    const sectionTitle = test.parent; // 'describe()'의 텍스트!
    if (!sectionCache[sectionTitle]) {
      sectionCache[sectionTitle] = await getOrCreateSection(sectionTitle);
    }
  },

  afterTest: async (test, _context, { passed, error }) => {
    const sectionId = sectionCache[test.parent];
    const caseId = await getOrCreateTestCase(test.title, sectionId);
    if (testRunId !== undefined) {
      await addTestResult(testRunId, caseId, passed ? 1 : 5, error?.message);
    } else {
      console.error('testRunID is undefined!')
    }
  }
}
