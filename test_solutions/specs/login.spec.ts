import LoginScreen from "../screens/LoginScreen"
import { actions } from "../helpers/actions"
import { assert } from 'chai'
import ProfileScreen from "../screens/ProfileScreen"
import HomeScreen from "../screens/HomeScreen"
import loginLoc from "../locators/login.loc"
import Common from "../screens/Common"

describe('로그인', () => {
  before(() => {
    LoginScreen.addPhotoToAndroid()
  })

  afterEach(async () => {
    await ProfileScreen.logout()
  })

  it('로그인 성공', async () => {
    // 1. 로그인 스크린 전체 요소 테스트 
    await LoginScreen.verifyLoginScreen()

    // 2. 사진 선택 기능 테스팅 
    const previousImage = await actions.getText(LoginScreen.image)
    await LoginScreen.selectPhoto()
    const newImage = await actions.getText(LoginScreen.image)
    assert.equal(previousImage, newImage, `${previousImage} != ${newImage}`)

    // 3. 이름, 나이, 성별 넣기 
    await actions.type(LoginScreen.nameInput, loginLoc.nameVal)
    await actions.type(LoginScreen.ageInput, loginLoc.ageVal)
    await actions.dismissKeyboard()
    await LoginScreen.selectGender(loginLoc.female)

    // 4. 완료하기 
    await actions.tap(Common.save)

    // 5. 다음스크린으로 넘어갔는지 확인 
    await actions.isNotVisible(LoginScreen.title)
    await actions.isVisible(HomeScreen.title)
  })

  it('로그인 성공 - 리팩토링 버전', async () => {
    // 1. 사진 선택 기능 테스팅 
    await LoginScreen.verifyPhotoChanged()

    // 2. 이름, 나이, 성별 넣기 
    await LoginScreen.fillOutAndSaveProfile(loginLoc.nameVal, loginLoc.ageVal, loginLoc.female)
    
    // 4. 다음스크린으로 넘어갔는지 확인 
    await LoginScreen.verifyLoginSuccess()
  })
})
