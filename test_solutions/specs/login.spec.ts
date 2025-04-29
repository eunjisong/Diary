import LoginScreen from "../screens/LoginScreen"
import { actions } from "../helpers/actions"

describe('로그인', () => {
  it('로그인 성공', async () => {
    await LoginScreen.verifyLoginScreen()
    await LoginScreen.selectPhoto()
    await 
  })

  it('로그인 실패', async () => {
    // 테스트를 스스로 해보세요. 
  })
})
