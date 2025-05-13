import { actions } from "../helpers/actions";
import { selectors } from "../helpers/selectors"
import homeLoc from "../locators/home.loc";
import Common from "./Common";

class HomeScreen {
    get title() {
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

    async verifyEmptyScreen() {
        await actions.isNotVisible(this.diaryList)
        await actions.isVisible(this.emptyText)
        await actions.isVisible(this.writeBtn)
    }

    async verifyDiaryDetail(text: string, mood = 'happyMood', date = 'today') {
        await actions.isVisible(selectors.byText(text))
        await actions.isVisible(selectors.byId(`selected_${mood}`))
        if (date === 'today') {
            const today = actions.today()
            await actions.isVisible(selectors.byText(today))
        }
        await actions.isVisible(Common.editBtn)
    }

    async verifyDiaryRow(text: string, date: string, visible = true) {
        const verifyMethod = visible ? actions.isVisible : actions.isNotVisible
        await verifyMethod(selectors.byContainsText(date))
        await verifyMethod(selectors.byContainsText(text))
    }

    async verifyRemoveAlert() {
        await actions.isVisible(Common.removeAlertTitle)
        await actions.isVisible(Common.removeAlertSubtitle)
        await actions.isVisible(Common.confirmBtn)
        await actions.isVisible(Common.cancelBtn)
    }
}

export default new HomeScreen()
