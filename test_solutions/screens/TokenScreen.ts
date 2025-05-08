
import { assert } from "chai";
import { actions } from "../helpers/actions";
import { selectors } from "../helpers/selectors"
import loginLoc from "../locators/login.loc";
import tokenLoc from "../locators/token.loc";



class TokenScreen {
    get title() {
        return selectors.byText(loginLoc.title)
    }

    get coinPrice() {
        return selectors.byId(tokenLoc.coinPrice)
    }

    async getTopTenTokens() {
        const response = await fetch(tokenLoc.endPoint);
        return await response.json();
    } 

    async verifyTokenRow(token: Coin) {
        // 토큰 이름
        const name_api  = token.name
        const symbol_api = `(${token.symbol.toUpperCase()})`
        await actions.isVisible(selectors.byText(`${name_api} ${symbol_api}`))

        // 토큰 가격 
        const currPrice_api = token.current_price
        const currPrice_ui = await actions.getText(this.coinPrice)
        assert(this.withinTolerance(currPrice_ui, currPrice_api), `${currPrice_api} & ${currPrice_ui} 오차범위 10%를 벗어납니다.`)

        // 토큰 가격 변화 비율
        const priceChange = this.roundToTwoDecimals(token.price_change_percentage_24h)
        await actions.isVisible(selectors.byText(`${priceChange}%`))
 
    }

    roundToTwoDecimals(num: number): number {
        return Math.round(num * 100) / 100;
    }

    async verifyTokens(tokens: Coin[]) {
        for (let i = 0; i< tokens.length; i++) {
            const curr = tokens[i]
            const symbol = curr.symbol.toUpperCase()
            console.log(`\n\n==== ${curr.name} (${symbol}) ====`)
            try {
                await actions.isVisible(selectors.byText(`${curr.name} (${symbol})`))
            } catch(e) {
                await actions.swipe('up', 0.1)
                await actions.isVisible(selectors.byText(`${curr.name} (${symbol})`))      
            } 
        }
    }

    convertFormattedTextToPrice(text: string): number {
        // "$0.10" → 0.10, "$95,823" → 95823
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    }
      
    withinTolerance(actualText: string, expectedPrice: number): boolean {
        const appSidePrice = this.convertFormattedTextToPrice(actualText); // 예: "$95,823" → 95823
    
        const difference = Math.abs(appSidePrice - expectedPrice); // 절대값 차이
        const percentageDiff = (difference / expectedPrice) * 100; // 차이의 비율 %
    
        return percentageDiff <= 10; // 오차범위 10% 이내면 true
    }
}

type Coin = {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
  };

export default new TokenScreen()
