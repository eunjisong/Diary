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
}

export default new HomePage()