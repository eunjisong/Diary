import { actions } from "../helpers/actions"
import { selectors } from "../helpers/selectors"

describe('로그아웃', () => {
  it('로그아웃을 할 수 있습니다', async () => {
    await actions.tap(selectors.byText('프로필'))
    await actions.tap(selectors.byText('로그아웃'))
    await Log
  })

})
