import LoginScreen from "../screens/LoginScreen"
import { actions } from "../helpers/actions"
import HomeScreen from "../screens/HomeScreen"
import { warmup } from "../helpers/warmup"
import WriteScreen from "../screens/WriteScreen"

describe('홈 탭', () => {
  before(async () => {
    await warmup()
  })

  it('빈 화면 상태', async () => {
    await HomeScreen.verifyEmptyScreen()
  })

  it('일기 리스트', async () => {
    await WriteScreen.write('Hello World')
  })


  it('일기 디테일', async () => {

  })

  it('홈 탭에서 일기 수정하기', async () => {

  })

  it('일기 삭제하기', async () => {

  })

  it('일기 모두 삭제하기', async () => {

  })


})
