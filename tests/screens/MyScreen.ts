import { selectors } from "../helpers/selectors"
import loginLoc from "../locators/login.loc";

class MyScreen {
    get title () {
        return selectors.byText(loginLoc.title)
    }

    get logout() {
        return selectors.byText('로그아웃')
    }

    get modalContent() {
        return selectors.byText('모든 정보가 사라집니다. 정말 로그아웃 하시겠습니까?')
    }
}

export default new LoginScreen()
