import { ChainablePromiseElement } from "webdriverio"
import { selectors } from "./selectors"

// 탭 함수 
async function tap(element: ChainablePromiseElement) {
  await element.click()
}

// 요소 보이는지 확인
async function isVisible(element: ChainablePromiseElement) {
  await expect(element).toBeDisplayed()
}

// 요소 안보이는지 확인
async function isNotVisible(element: ChainablePromiseElement) {
  await expect(element).not.toBeDisplayed()
}

async function enterText(element: ChainablePromiseElement, text: string) {
  await element.setValue(text)
}

async function scrollToText(text: string, maxScrolls = 5) {
  for (let i = 0; i < maxScrolls; i++) {
    const ele = selectors.byText(text)
    if (await ele.isDisplayed()) {
      return ele;
    }

    if (isAndroid()) {
      await driver.execute('mobile: scroll', {
        strategy: '-android uiautomator',
        selector: ele,
      });
    } else {
      await driver.execute('mobile: scroll', { direction: 'down' });
    }
    await driver.pause(500); // 너무 빠르게 하면 인식 안 됨
  }

  throw new Error(`"${text}"이 안보입니다`);
}


export function isIOS(): boolean {
  return driver.isIOS;
}

// Android 전용 스크롤 - 텍스트 찾기 가능
async function androidScrollToText(text: string) {
  await driver.execute('mobile: scroll', {
    strategy: '-android uiautomator',
    selector: `new UiSelector().text("${text}")`,
  });
}

// iOS 전용 스크롤 - 그냥 아래로만 내림
async function iosScrollDown() {
  await driver.execute('mobile: scroll', {
    direction: 'down',
  });
}

export function isAndroid(): boolean {
  return driver.isAndroid;
}
 
export const actions = {
    tap,
    isVisible,
    isNotVisible,
    enterText,
    scrollToText
}
