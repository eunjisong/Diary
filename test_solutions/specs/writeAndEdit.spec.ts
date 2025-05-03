import LoginScreen from "../screens/LoginScreen"
import { actions } from "../helpers/actions"

describe('쓰기 탭', () => {
  it('오늘 일기 쓰기', async () => {
    await actions.isVisible(LoginScreen.title)
  })

  it('오늘 일기 이어쓰기', async () => {

  })

  it('어제 일기 쓰기', async () => {

  })

  it('지난달 일기 쓰기', async () => {

  })

  it('일기 수정하기', async () => {

  })



})
