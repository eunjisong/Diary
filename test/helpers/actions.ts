import { ChainablePromiseElement } from "webdriverio";
import { assert } from 'chai'

async function type(element: ChainablePromiseElement, text: string) {
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

export const actions = {
    type,
    verifyElementText
}