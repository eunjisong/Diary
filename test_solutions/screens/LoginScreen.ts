import { selectors } from "../helpers/selectors"
import loginLoc from "../locators/login.loc";

class LoginScreen {
    get title () {
        return selectors.byText(loginLoc.title)
    }
}

export default new LoginScreen()
