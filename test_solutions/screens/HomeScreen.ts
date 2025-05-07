import { actions } from "../helpers/actions";
import { selectors } from "../helpers/selectors"
import homeLoc from "../locators/home.loc";

class HomeScreen {
    get title () {
        return selectors.byText(homeLoc.title)
    }

    get emptyText() {
        return selectors.byText(homeLoc.emptyText)
    }

    get writeBtn() {
        return selectors.byText(homeLoc.writeBtn)
    }

    get diaryList() {
        return selectors.byId(homeLoc.diaryList)
    }

    async verifyEmptyScreen () {
        await actions.isNotVisible(this.diaryList)
        await actions.isVisible(this.emptyText)
        await actions.isVisible(this.writeBtn)
    }
}

export default new HomeScreen()
