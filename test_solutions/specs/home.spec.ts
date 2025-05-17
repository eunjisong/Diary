import { actions } from "../helpers/actions"
import HomeScreen from "../screens/HomeScreen"
import { warmup } from "../helpers/warmup"
import WriteScreen from "../screens/WriteScreen"
import Common from "../screens/Common"
import commonLoc from "../locators/common.loc"

describe('홈 탭', () => {
  let today = ''

  before(async () => {
    await warmup()
    today = actions.today()
  })

  it('빈 화면 상태', async () => {
    await HomeScreen.verifyEmptyScreen()
  })

  it('일기 리스트', async () => {
    await HomeScreen.tapWriteBtn()
    await WriteScreen.write(commonLoc.helloWorld)
    await Common.goToHomeTab()
    await HomeScreen.verifyDiaryRow(commonLoc.helloWorld, today)
  })


  it('일기 디테일', async () => {
    await actions.tap(Common.helloWorld)
    await HomeScreen.verifyDiaryDetail(commonLoc.helloWorld)
  })

  it('홈 탭에서 일기 수정하기', async () => {
    await actions.tap(Common.editBtn)
    await WriteScreen.writeInputfield.clearValue()
    await WriteScreen.write(commonLoc.helloWorldKo, commonLoc.goodMood)
    await HomeScreen.verifyDiaryDetail(commonLoc.helloWorldKo, commonLoc.goodMood)
    await Common.goToHomeTab()
    await HomeScreen.verifyDiaryRow(commonLoc.helloWorldKo, today)
  })

  it('일기 삭제하기', async () => {
    await actions.tap(Common.helloWorldKo)
    await actions.tap(Common.editBtn)
    await actions.tap(Common.remove)
    await HomeScreen.verifyRemoveAlert()
    await actions.tap(Common.confirmBtn)
    await HomeScreen.verifyDiaryRow(commonLoc.helloWorldKo, today, false)
    await HomeScreen.verifyEmptyScreen()
  })
})
