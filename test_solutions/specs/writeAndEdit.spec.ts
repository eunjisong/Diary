import { actions } from "../helpers/actions"
import { warmup } from "../helpers/warmup"
import Common from "../screens/Common"
import WriteScreen from "../screens/WriteScreen"
import HomeScreen from "../screens/HomeScreen"
import writeLoc from "../locators/write.loc"
import commonLoc from "../locators/common.loc"

describe('쓰기 탭', () => {
  let diary: string
  let mood = 'happyMood'
  let date = actions.today()
  const contents: string[] = []

  before(async () => {
    await warmup()
    await Common.goToWriteTab()
  })

  it('오늘 일기 쓰기', async () => {
    // 테스트 준비
    diary = writeLoc.todayDiary
    contents.push(diary)

    // 일기 쓰기
    await WriteScreen.write(diary)
    
    // 홈탭에서 오늘 일기 확인
    await HomeScreen.verifyDiaryRow(diary, date)

    // 쓰기탭에서 오늘 일기 확인
    await Common.goToWriteTab()
    await WriteScreen.verifyWrittenDiary(diary, mood)
  })

  it('쓰기 탭에서 자동 저장으로 일기 수정하기', async () => {
    // 테스트 준비
    mood = commonLoc.goodMood
    diary = writeLoc.autoSavedTodayDiary
    contents.push(diary.trim())

    // 일기 수정
    await WriteScreen.write(diary, mood, true)
    await WriteScreen.dismissWriteTabKeyboard()

    // 쓰기탭에서 오늘일기 확인 
    await WriteScreen.verifyWrittenDiary(contents, mood)
  })

  it('쓰기 탭에서 기존 일기에 내용 추가하기', async () => {
    // 테스트준비
    mood = commonLoc.badMood
    diary = writeLoc.appendTodayDiary
    contents.push(diary)
    
    // 일기 추가하여 수정
    await WriteScreen.tapNewDiary()
    await WriteScreen.write(writeLoc.appendTodayDiary, mood)
    await WriteScreen.tapAppend()

    // 쓰기탭에서 오늘 일기 확인 
    await WriteScreen.verifyWrittenDiary(contents, mood)
  })

  it('쓰기 탭에서 새일기 덮어쓰기', async () => {
    // 테스트 준비
    diary = writeLoc.overwriteTodayDiary
    mood = commonLoc.happyMood
    console.log(`새로 덮어쓴 오늘 일기는...\ntext: ${diary}\nmood: ${mood}`)

    // 새 일기 덮어쓰기 
    await WriteScreen.tapNewDiary()
    await WriteScreen.write(diary, mood)
    await WriteScreen.tapOverwrite()

    // 쓰기탭에서 오늘 일기 확인 
    await WriteScreen.verifyWrittenDiary(diary, mood)
  })

  it('어제 일기 쓰기', async () => { 
    // 테스트 준비
    diary = writeLoc.yesterdayDiary
    date = actions.yesterday()
    mood = commonLoc.badMood
    console.log(`어제 일기는...\ntext: ${diary}\nmood: ${mood}`)

    // 어제 일기쓰기
    await WriteScreen.selectYesterday()
    await WriteScreen.write(diary, mood)

    // 홈탭에서 일기 확인 
    await HomeScreen.verifyDiaryRow(diary, date)

    // 쓰기탭에서 일기 확인 
    await Common.goToWriteTab()
    await WriteScreen.verifyWrittenDiary(diary, mood)
  })

  it('지난달 일기 쓰기', async () => {
    // 테스트 준비
    diary = writeLoc.lastMonthDiary
    date = actions.lastMonth()
    mood = commonLoc.sadMood
    console.log(`지난달 일기는...\ntext: ${diary}\nmood: ${mood}`)

    // 지난달 일기쓰기
    await WriteScreen.selectLastMonth()
    await WriteScreen.write(diary, mood)

    // 홈탭에서 일기 확인
    await HomeScreen.verifyDiaryRow(diary, date)

    // 쓰기탭에서 일기 확인 
    await Common.goToWriteTab()
    await WriteScreen.verifyWrittenDiary(diary, mood)
  })

})
