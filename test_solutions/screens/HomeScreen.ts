import { actions } from "../helpers/actions";
import { selectors } from "../helpers/selectors"
import homeLoc from "../locators/home.loc";

class HomeScreen {
    get title () {
        return selectors.byText(homeLoc.title)
    }
}

export default new HomeScreen()
