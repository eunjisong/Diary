// 1. 온보딩 페이지에 관한 셀렉터를 포함한 엘레멘트 // getter
// 2. 온보딩 페이지에 관한 커스텀 메소드 
import { selectors } from "../helpers/selectors"
import onboardingLoc from "../locators/onboarding.loc"

class OnboardingPage {

    get appTitleV2() {
        return selectors.getByText(onboardingLoc.appTitle)
    }

    get nameInputV2() {
        return selectors.getById(onboardingLoc.nameInput)
    }

    async selectGenderV2(gender = onboardingLoc.female) {
        await selectors.getByText(gender).click()
    } 

    // 이름요소에 이름을 넣기 메소드
    async setName(name: string) {
        await this.nameInputV2.addValue(name)
    }

}

export default new OnboardingPage()