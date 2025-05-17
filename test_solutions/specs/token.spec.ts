import LoginScreen from "../screens/LoginScreen"
import { actions } from "../helpers/actions"
import Common from "../screens/Common"
import { warmup } from "../helpers/warmup"
import TokenScreen from "../screens/TokenScreen"

let allTokens: any


describe('토큰 탭', () => {
  before(async () => {
    allTokens = await TokenScreen.getTopTenTokens()
    await warmup()
  })

  it('넘버원 토큰 데이터 테스트 ', async () => {
    await Common.goToTokenTab()
    const top = allTokens[0]
    await TokenScreen.verifyTokenRow(top)
  })

  it('탑텐 토큰 리스트 테스트', async () => {
    await TokenScreen.verifyTokens(allTokens)
  })
})
