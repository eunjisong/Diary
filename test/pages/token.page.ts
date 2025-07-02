import { assert } from "chai"
import { actions } from "../helpers/actions"
import { selectors } from "../helpers/selectors"
import tokenLoc from "../locators/token.loc"

class TokenPage {
    // getter를 통한 엘레멘트 
    get tokenTab() {
        return selectors.getById(tokenLoc.tokenTab)
    }

    get tokenList() {
        return selectors.getById(tokenLoc.tokenList)
    }

    // async 메소드
    async getApiTokens() {
        const response = await fetch(tokenLoc.endPoint)

        return response.json()
    }

    async goToTokenTab() {
        await actions.tap(this.tokenTab)
    }

    async compareApiCardAndUiCard(apiCard: Coin) {
        // 이름 + 심볼
        await actions.waitFor(selectors.getByText(`${apiCard.name} (${apiCard.symbol.toUpperCase()})`))

        // 토큰 카드 테스트
        console.error('테스트: ', tokenLoc.tokenCard + apiCard.name)
        await actions.isVisible(selectors.getById(tokenLoc.tokenCard + apiCard.name))

        // ui 토큰 가격 가져오기 넘버타입으로. 
        const uiPriceString = await actions.getText(selectors.getById(`token_price__${apiCard.name}`)) // $1,234.23 >>>> 1234.23 (number)
        let uiPrice = parseFloat(uiPriceString.replace(/[^0-9.]/g, ''))
        // api가격과 ui 가격을 비교함
        assert(this.withinTolerance(uiPrice, apiCard.current_price), 
        `uiPrice와 apiPrice가 오차값 안에 있지 않습니다. ${uiPrice} ~ ${apiCard.current_price} ` )

        // 변화율 테스트  
        const uiPercentString = (await actions.getText(selectors.getById(`${tokenLoc.tokenPercent}${apiCard.name}`))).replace('%', '') 
        const uiPercent = parseFloat(uiPercentString)
        // 1.85% >>> 1.85
        // api퍼센트와 ui퍼센트를 비교함
        assert(this.withinTolerance(uiPercent, apiCard.price_change_percentage_24h), 
        `uiPercent와 apiPercent가 오차값 안에 있지 않습니다. ${uiPercent} ~ ${apiCard.price_change_percentage_24h} ` )
    }

    async withinTolerance(uiPrice: number, apiPrice: number) {
        const diff = Math.abs(uiPrice - apiPrice) // 2000 - 2010 = -10 >>>> 10 
        const percentDiff = (diff / apiPrice) * 100 // 차이의 비율이 나옵니다  (10/2010) * 100 = 0.5
        return percentDiff <= 10
    } 

    async compareApiTokenNameAndUiTokenName(token: Coin) {
        // Bitcoin (BTC) 텍스트 체크 
        const title = `${token.name} (${token.symbol.toUpperCase()})`
        try {
            await actions.isVisible(selectors.getByText(title))
        } catch(e) {
            // swipe 
            await actions.swipe('up', 0.1, this.tokenList)
            await actions.isVisible(selectors.getByText(title))
        }
    }

}

type Coin = {
    name: string; 
    symbol: string; 
    current_price: number; 
    price_change_percentage_24h: number
}

export default new TokenPage()