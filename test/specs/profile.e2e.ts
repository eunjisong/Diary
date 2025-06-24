import login from "../helpers/login"
import profileLoc from "../locators/profile.loc"
import profilePage from "../pages/profile.page"

describe('프로필 탭 테스트', () => {

    before(async()=>{
        // 로그인
      await login()
      
    })

    beforeEach(async()=>{
        // 프로필 탭 클릭
        await profilePage.goToProfile()
    })

    it('프로필 스크린 확인', async () => { // 이름, 나이, 성별 확인하겠습니다 
      // 이름, 나이, 성별 확인 
        await profilePage.verifyUserData()
    })

    it('프로필 수정', async () => {
        // 수정 버튼 클릭
        await profilePage.tapEdit()
        // 인풋필드에 새로운 정보 넣기 
        // autobot // 10 // 남자
        await profilePage.editUserData(
            profileLoc.newUserName, 
            profileLoc.newUserAge, 
            profileLoc.newUserGender
        )
        
        // 취소 
        await profilePage.tapCancel()
        // 저장되면 안됨 
        await profilePage.verifyUserData()

        // 수정 버튼 클릭
        await profilePage.tapEdit()
        // 인풋필드에 새로운 정보 넣기 
        // autobot // 10 // 남자
        await profilePage.editUserData(
            profileLoc.newUserName, 
            profileLoc.newUserAge, 
            profileLoc.newUserGender
        )

        // 수정
        await profilePage.tapSave()
        // 수정된 정보 확인
        await profilePage.verifyUserData(
            profileLoc.newUserName, 
            profileLoc.newUserAge, 
            profileLoc.newUserGender
        )

    })

    it('프로필 삭제', async () => {
        // 로그아웃 버튼 누르기 > 얼럿 확인하기 
        await profilePage.tapLogout()
        await profilePage.verifyLogoutAlert()
        
        // 취소 버튼 누르기 > 반드시 프로필탭에 머물러야함 
        await profilePage.tapCancel()
        await profilePage.verifyUserData(
            profileLoc.newUserName, 
            profileLoc.newUserAge, 
            profileLoc.newUserGender
        )

        // 로그아웃 버튼 누르기 
        await profilePage.tapLogout()
        await profilePage.tapConfirm()

        // 확인 버튼 누르기 > 프로필탭 X + 온보딩스크린 
        await profilePage.verifyLoggedOut()
    })

})