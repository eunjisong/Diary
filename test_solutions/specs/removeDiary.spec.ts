import LoginScreen from "../screens/LoginScreen"
import { actions } from "../helpers/actions"

describe('일기 삭제', () => {
  it('로그인 성공', async () => {
    await actions.isVisible(LoginScreen.title)
  })

  it('로그인 실패', async () => {
    // 테스트를 스스로 해보세요. 
  })
})
