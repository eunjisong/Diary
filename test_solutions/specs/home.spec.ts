import { actions } from "../helpers/actions"
import HomeScreen from "../screens/HomeScreen"
import { warmup } from "../helpers/warmup"
import WriteScreen from "../screens/WriteScreen"
import Common from "../screens/Common"
import commonLoc from "../locators/common.loc"



describe(('제목: 홈탭에 대한 테스트'), ()=>{

  //test 1 
  it(('저장버튼 누르기'), async ()=>{
    await button.click()
    await actions.verifyText('저장')
  })

  //test 2
  it(('수정버튼 누르기'), async ()=>{
    await button2.click()
    await actions.verifyText('수정')
  })

  //hook 
  before(('셋업해야할것'), async ()=>{
    await login()
    await setup()
  })

})





















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
