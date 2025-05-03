import LoginScreen from "../screens/LoginScreen"
import { actions } from "../helpers/actions"
import { assert } from 'chai'
import ProfileScreen from "../screens/ProfileScreen"
import HomeScreen from "../screens/HomeScreen"
import { warmup } from "../helpers/warmup"

describe('프로필', () => {
  before(async () => {
    await warmup()
  })

  afterEach(async () => {
    await ProfileScreen.logout()
  })

  it('프로필 스크린 확인', async () => {
    // 1. 로그인 스크린 전체 요소 테스트 
    await LoginScreen.verifyLoginScreen()

    // 2. 사진 선택 기능 테스팅 
    const previousImage = await actions.getText(LoginScreen.image)
    await LoginScreen.selectPhoto()
    const newImage = await actions.getText(LoginScreen.image)
    assert.equal(previousImage, newImage, `${previousImage} != ${newImage}`)

    // 3. 이름, 나이, 성별 넣기 
    await actions.setText(LoginScreen.nameInput, '오토봇')
    await actions.setText(LoginScreen.ageInput, 30)
    await actions.dismissKeyboard('Done')
    await LoginScreen.selectGender('여자')

    // 4. 완료하기 
    await actions.tap(LoginScreen.save)

    // 5. 다음스크린으로 넘어갔는지 확인 
    await actions.isNotVisible(LoginScreen.title)
    await actions.isVisible(HomeScreen.title)
  })

  it('프로필 수정', async () => {
    
  })
})
