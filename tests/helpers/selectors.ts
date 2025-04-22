// iOS와 Android 모두에서 텍스트로 요소를 선택할 수 있도록 도와주는 함수.
function byText(text: string) {
  const isIOS = driver.isIOS
  return isIOS
    ? $(`//*[@name="${text}"]`)
    : $(`//*[@text="${text}"]`)
}

// iOS와 Android 모두에서 testID로 요소를 선택할 수 있도록 도와주는 함수.
function byId(testID: string) {
    // 해보세요
}

export const selectors = {
    byText
}