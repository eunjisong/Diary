import { actions } from "../helpers/actions"
import login from "../helpers/login"
import writeLoc from "../locators/write.loc"
import homePage from "../pages/home.page"
import writePage from "../pages/write.page"

describe('홈스크린 테스트', () => {

    before(async()=>{
        await login()
    })

    it('빈 화면 테스트', async() => {
        // 일기가 하나도 없습니다 + 일기 쓰러 가기 버튼 (재활용 가능하게 쓸 것)
        await homePage.verifyEmptyScreen()
    })

    it('홈탭에서 일기써서 일기 카드 확인하기', async() => {
        // 일기쓰러가기 버튼 누르기 
        await homePage.tapWriteBtn()

        // 일기쓰기 + 무드 선택해서 일기쓰기
        await writePage.write('홈탭에서 일기 쓰기', false, undefined, writeLoc.moodHappy)
 
        // 홈탭 > 일기 리스트 > 일기 카드 테스트하기 (재활용 가능하게 쓸 것)
        await homePage.verifyDiaryCard()

        // 일기카드 클릭 + 일기 디테일 테스트 (재활용 가능하게 쓸 것)

        
    })

    it('일기 수정하기', async() => {
        // 수정 버튼 누르기 

        // 날짜 + 무드 + 컨텐츠 수정
        
        // 홈탭 > 일키 리스트 > 일기 카드 테스트하기 (재활용 가능하게 쓸 것)
        
        // 일기카드 클릭 + 일기 디테일 테스트 (재활용 가능하게 쓸 것)

    })

    it('일기 삭제하기', async() => {
        // 수정 버튼 누르기 

        // 삭제 버튼 누르기 

        // 일기가 하나도 없습니다 + 일기 쓰러 가기 버튼 (재활용 가능하게 쓸 것)

    })



})