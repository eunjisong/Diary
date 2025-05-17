import { actions } from "../helpers/actions"
import ProfileScreen from "../screens/ProfileScreen"
import { warmup } from "../helpers/warmup"
import Common from "../screens/Common"
import loginLoc from "../locators/login.loc"
import profileLoc from "../locators/profile.loc"

describe('프로필 탭', () => {
  before(async () => {
    await warmup()
  })

  it('프로필 스크린 확인', async () => {
    await Common.goToProfileTab()

    await actions.isVisible(ProfileScreen.image)
    await actions.isVisible(ProfileScreen.logoutBtn)
    await actions.isVisible(Common.editBtn)
    await actions.verifyElementText(ProfileScreen.nameVal, loginLoc.nameVal)
    await actions.verifyElementText(ProfileScreen.ageVal, loginLoc.ageVal.toString())
    await actions.verifyElementText(ProfileScreen.genderVal, loginLoc.female)
  })

  it('프로필 수정', async () => {
    await ProfileScreen.verifyProfileScreen(loginLoc.nameVal, loginLoc.ageVal, loginLoc.female)
    await actions.tap(Common.editBtn)
    await ProfileScreen.verifyProfileEditScreen(loginLoc.female)
    await ProfileScreen.editProfile()
    await ProfileScreen.verifyProfileScreen(profileLoc.newNameVal, profileLoc.newAgeVal, loginLoc.male)
  })  

  it('프로필에서 로그아웃 하기', async () => {
    await actions.tap(ProfileScreen.logoutBtn)
    await ProfileScreen.verifyLogoutAlert()
    await actions.tap(Common.cancelBtn)
    await ProfileScreen.verifyProfileScreen(profileLoc.newNameVal, profileLoc.newAgeVal, loginLoc.male)
    await ProfileScreen.tapLogout()
    await Common.tapConfirm()
  })
})
