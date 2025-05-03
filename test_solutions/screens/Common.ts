import { actions } from "../helpers/actions";
import { selectors } from "../helpers/selectors"
import commonLoc from "../locators/common.loc";
import homeLoc from "../locators/home.loc";

class Common {
    get homeTab () {
        return selectors.byId(commonLoc.homeTab)
    }

    get writeTab() {
        return selectors.byId(commonLoc.writeTab)
    }

    get tokenTab() {
        return selectors.byId(commonLoc.tokenTab)
    }

    get profileTab() {
        return selectors.byId(commonLoc.profileTab)
    }

    get confirmBtn() {
        return selectors.byText(commonLoc.confirmBtn)
    }
}

export default new Common()
