import onboardingLoc from "../locators/onboarding.loc"
import onboardingPage from "../pages/onboarding.page"

describe('온보딩 테스트', () => {

    it('성별과 이름 넣기', async () => {
        await onboardingPage.setName('오토봇')
        await onboardingPage.selectGenderV2(onboardingLoc.male)
    
    })
})