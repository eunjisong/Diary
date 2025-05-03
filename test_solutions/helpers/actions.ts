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

async function getText(element: ChainablePromiseElement) {
  return await element.getText()
}

async function setText(element: ChainablePromiseElement, text: string | number) {
  await element.setValue(text)
}

async function dismissKeyboard(text: string = 'Done') {
  if (driver.isIOS) {
    await tap(selectors.byText(text))
  } else {
    await driver.hideKeyboard()
  }
}

async function waitFor(element: ChainablePromiseElement, timeout = 5000) {
  await element.waitForDisplayed({timeout})
}

export const actions = {
    tap,
    isVisible,
    isNotVisible,
    getText,
    setText,
    dismissKeyboard,
    waitFor
}
