function withPlatform(ios: string, android: string) {
  return driver.isIOS ? $(ios) : $(android);
}


function byText(text: string) {
  return withPlatform(`//*[@name="${text}"]`, `//*[@text="${text}"]`);
}

function byContainsText(text: string) {
  return withPlatform(
    `//*[contains(@name, "${text}")]`, 
    `//*[contains(@text, "${text}")]`
  );
}

function byId(testID: string) {
  return withPlatform(`~${testID}`, `//*[@resource-id="${testID}"]`);
}

function byImageAtIndex(index: number) {
  return withPlatform(
    `//XCUIElementTypeImage[${index + 1}]`,
    `//android.widget.FrameLayout[android.widget.ImageView[${index}]]`
  );
}

export const selectors = {
  byText,
  byContainsText,
  byId,
  byImageAtIndex, 
  withPlatform
}
