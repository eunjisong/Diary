import { actions } from "../helpers/actions"
import { selectors } from "../helpers/selectors"
import homeLoc from "../locators/home.loc"
import onboardingPage from "./onboarding.page"

class HomePage {

    get noDiaryText() {
        return selectors.getByText(homeLoc.noDiaryText)
    }

    get writeBtn() {
        return selectors.getBySomeText(homeLoc.writeBtn)
    }

    get edit() {
        return selectors.getByText(homeLoc.edit)
    }

    async verifyEmptyScreen() {
        await actions.waitFor(this.noDiaryText)
        await actions.isVisible(onboardingPage.appTitleV2, false)
        await actions.isVisible(this.writeBtn)
    }

    async tapWriteBtn() {
        await actions.tap(this.writeBtn)
    }

    async verifyDiaryCard(content: string, mood: string, date: string, isEditable = false) {
        await actions.waitFor(selectors.getByText(content))
        await actions.isVisible(selectors.getById(mood)) //`mood_happy`
        await actions.isVisible(selectors.getByText(date))
        await actions.isVisible(this.edit, isEditable)
    }

    async tapDiary(date: string) {
        await actions.tap(selectors.getByText(date))
    }
}

export default new HomePage()