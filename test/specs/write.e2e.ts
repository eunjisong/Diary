import { actions } from "../helpers/actions"
import login from "../helpers/login"
import writePage from "../pages/write.page"

describe('일기쓰기 테스트', () => {

    before( async () => {
        await login()
    })

    it('자동저장 기능', async () => {
        // 쓰기탭 누르기 
        await writePage.goToWrite()

        // 내용쓰고 3-5초 기다리기 
        await writePage.write('자동저장', true)

        // 저장됨 버튼 확인하기 
        await writePage.verifyAutoSaved()
    })

    it('수동저장 기능', async () => {
        // 내용쓰고 저장 버튼 누르기 
        await writePage.write('수동저장')

        // 홈탭으로 이동 + 내가 새로쓴 테스트 컨텐츠가 보이기 
        await writePage.verifyManualSaved('수동저장')
    })

    it('새일기 > 덮어쓰기 기능', async () => {
        // 쓰기탭으로 이동 
        await writePage.goToWrite()

        // 새일기버튼 누르기 
        await writePage.tapNewDiary()

        // 일기쓰기 + 저장버튼 누르기
        await writePage.write('덮어쓰기')

        // 덮어쓰기 버튼 누르기 
        await writePage.tapOverwrite()

        // 쓰기탭: 덮어쓴 일기 컨텐츠 확인하기 
        await writePage.verifyContent('덮어쓰기')

        // 홈탭: 덮어쓴 일기 컨텐츠 확인하기 
        await writePage.tapSaved()
        await writePage.goToHome()
        await writePage.verifyManualSaved('덮어쓰기')
    })

    it('새일기 > 추가하기 기능', async () => {
        // 쓰기탭으로 이동 
        await writePage.goToWrite()

        // 새일기버튼 누르기 
        await writePage.tapNewDiary()

        // 일기쓰기 + 저장버튼 누르기
        await writePage.write('추가하기')

        // 추가하기 버튼 누르기 
        await writePage.tapAddMore()

        // 쓰기탭: 추가한 일기 확인하기 + 기존 일기 확인하기 
        await writePage.verifyContent('덮어쓰기')
        await writePage.verifyContent('추가하기')

        // 홈탭: 덮어쓴 일기 컨텐츠 확인하기 
        await writePage.tapSaved()
        await writePage.goToHome()
        await writePage.goToJournal('덮어쓰기')
        await writePage.verifyAddOn('추가하기')
        await writePage.goToHome()
    })

    // parameterized test 
    const dates = [
        // 오늘
        actions.journalDate(0, 0, 0),
        // 어제
        actions.journalDate(1, 0, 0),
        // 지난달
        actions.journalDate(0, 1, 0),
        // 지난해
        actions.journalDate(0, 0, 1)
    ]
    
    dates.forEach( (date) => {
        it(`${date} 일기 쓰기 테스트`, async () => {
            await writePage.goToWrite()
            await writePage.write(`${date} 일기 쓰기`, false, date)
            await writePage.verifyManualSaved(`${date} 일기 쓰기`)
        })
    })

})