import { ChainablePromiseElement } from "webdriverio"
import { selectors } from "./selectors"
import { assert } from "chai"

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

async function type(element: ChainablePromiseElement, text: string | number) {
  await element.addValue(text)
}

async function typeSlowly(element: ChainablePromiseElement, text: string | number) {
  // const val = String(text)
  // for (const char of val) {
    await element.setValue(text);
  // }
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

async function verifyElementText(element: ChainablePromiseElement, text: string) {
  const eleText = await getText(element)
  assert.equal(eleText, text, `${eleText} != ${text}`)
}

function today(): string {
  return new Date().toISOString().split('T')[0]; // "2025-05-03"
}

function yesterday(): string {
  const date = new Date();
  date.setDate(date.getDate() - 1); // 하루 빼기
  return date.toISOString().split('T')[0];
}

function lastMonth(): string {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().split('T')[0];
}

async function swipe(direction: string, percent: number) {
  await driver.execute('mobile: swipe', { direction: direction, percent: percent}) 
}

export const actions = {
    tap,
    isVisible,
    isNotVisible,
    getText,
    type,
    typeSlowly,
    dismissKeyboard,
    waitFor,
    verifyElementText,
    today,
    yesterday,
    lastMonth,
    swipe
}
