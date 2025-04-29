import LoginScreen from "../screens/LoginScreen"
import { actions } from "../helpers/actions"

describe('새 일기 쓰기', () => {
  it('쓰기 성공', async () => {
    await actions.isVisible(LoginScreen.title)
  })

  it('쓰기 실패', async () => {
    // 테스트를 스스로 해보세요. 
  })
})
