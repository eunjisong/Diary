import { actions } from "../helpers/actions"
import { selectors } from "../helpers/selectors"

describe('로그인', () => {
  it('로그인 성공', async () => {
    await actions.isVisible(selectors.byText('토큰')) 
  })

  it('로그인 실패', async () => {
    await actions.tap(selectors.byText('토큰')) 
    await actions.scrollToText('Cardano (ADA)')
  })
})
