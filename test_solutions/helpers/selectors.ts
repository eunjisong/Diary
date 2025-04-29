// 텍스트로 요소 선택
function byText(text: string) {
  const isIOS = driver.isIOS
  return isIOS
    ? $(`//*[@name="${text}"]`)
    : $(`//*[@text="${text}"]`)
}

// testID로 요소 선택
function byId(testID: string) {
    // 해보세요
}

export const selectors = {
    byText
}
