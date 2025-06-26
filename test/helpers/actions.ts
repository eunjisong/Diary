import { ChainablePromiseElement } from "webdriverio";
import { assert } from 'chai'
import { selectors } from "./selectors";

async function type(element: ChainablePromiseElement, text: string | number) {
    await element.waitForExist()
    await element.setValue('')
    await element.setValue(text)
}

// getText == targetText
async function verifyElementText(element: ChainablePromiseElement, targetText: string) {
    const eleText = await element.getText() 

    // chai 검증
    assert.equal(eleText, targetText, `"${eleText}"와 "${targetText}"는 같지 않습니다!`)
}

async function waitFor(element: ChainablePromiseElement, timeout = 5000) {
    await element.waitForDisplayed({ timeout })
}

async function isVisible(element: ChainablePromiseElement, targetBool = true) {
    const visible = await element.isDisplayed()

    // chai 검증
    assert.equal(visible, targetBool)
}

async function isSelected(element: ChainablePromiseElement, targetBool = true) {
    const selected = await element.isSelected()

    // chai 검증
    assert.equal(selected, targetBool)
}

async function isEnabled(element: ChainablePromiseElement, targetBool = true) {
    const enabled = await element.isEnabled() // true나 false 리턴할겁니다. 

    // chai 검증
    assert.equal(enabled, targetBool)
}

async function tap(element: ChainablePromiseElement) {
    await element.click()
}

async function dismissKeyboard(text = 'Return') {
    if (driver.isIOS) {
        await tap(selectors.getByText(text))
    } else {
        await driver.hideKeyboard()
    }
}

async function getText(element: ChainablePromiseElement) {
    await waitFor(element)
    return await element.getText()
}

export const actions = {
    type,
    verifyElementText,
    waitFor,
    isVisible,
    isSelected,
    isEnabled,
    tap,
    dismissKeyboard,
    getText
}