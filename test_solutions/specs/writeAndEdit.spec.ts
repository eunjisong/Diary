import { actions } from "../helpers/actions"
import { warmup } from "../helpers/warmup"
import Common from "../screens/Common"
import WriteScreen from "../screens/WriteScreen"
import HomeScreen from "../screens/HomeScreen"
import writeLoc from "../locators/write.loc"
import commonLoc from "../locators/common.loc"

describe('쓰기 탭', () => {

  before(async () => {
    await warmup()
    await Common.goToWriteTab()
  })

  it('오늘 일기 쓰기', async () => {
    const today = actions.today()
    await WriteScreen.write(commonLoc.helloWorld)
    await HomeScreen.verifyDiaryRow(commonLoc.helloWorld, today)
  })

  it('쓰기 탭에서 자동 저장으로 일기 수정하기', async () => {
    await Common.goToWriteTab()
    await WriteScreen.write(commonLoc.helloWorldKo, commonLoc.goodMood, true)
  })

  it('쓰기 탭에서 기존 일기에 내용 추가하기', async () => {
    await WriteScreen.tapNewDiary()
    await WriteScreen.write(commonLoc.helloWorldKo, commonLoc.badMood)
    await WriteScreen.tapAppend()
    const text = await actions.getText(WriteScreen.writeInputfield)
    console.log(text)
  })

  it('쓰기 탭에서 새일기 덮어쓰기', async () => {
    await WriteScreen.tapNewDiary()
    await WriteScreen.write(commonLoc.newHelloWorld, commonLoc.badMood)
    await WriteScreen.tapOverwrite()
    const text = await actions.getText(WriteScreen.writeInputfield)
    console.log(text)
  })

  it('어제 일기 쓰기', async () => { 
    const yesterday = actions.yesterday()
    await WriteScreen.selectYesterday()
    await WriteScreen.write(writeLoc.yesterdayDiary, commonLoc.happyMood)
    await HomeScreen.verifyDiaryRow(writeLoc.yesterdayDiary, yesterday)
  })

  it('지난달 일기 쓰기', async () => {
    await Common.goToWriteTab()
    const lastMonth = actions.lastMonth()
    await WriteScreen.selectLastMonth()
    await WriteScreen.write(writeLoc.lastMonthDiary, commonLoc.sadMood)
    await HomeScreen.verifyDiaryRow(writeLoc.lastMonthDiary, lastMonth)
  })

})
