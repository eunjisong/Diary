import { ChainablePromiseElement } from "webdriverio"

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
  // 해보세요 
}


export const actions = {
    tap,
    isVisible
}
