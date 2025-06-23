// 1. 온보딩 페이지에 관한 셀렉터를 포함한 엘레멘트 // getter
// 2. 온보딩 페이지에 관한 커스텀 메소드 
import { ChainablePromiseElement } from "webdriverio"
import { actions } from "../helpers/actions"
import { selectors } from "../helpers/selectors"
import onboardingLoc from "../locators/onboarding.loc"

class OnboardingPage {

    get appTitleV2() {
        return selectors.getByText(onboardingLoc.appTitle)
    }

    get photo() {
        return selectors.getById(onboardingLoc.photo)
    }

    get photoBtn() {
        return selectors.getByText(onboardingLoc.photoBtn)
    }

    get name() {
        return selectors.getById(onboardingLoc.nameTitle)
    }

    get age() {
        return selectors.getByText(onboardingLoc.age)
    }

    get gender() {
        return selectors.getByText(onboardingLoc.gender)
    }

    get nameInputV2() {
        return selectors.getById(onboardingLoc.nameInput)
    }

    get ageInput() {
        return selectors.getById(onboardingLoc.ageInput)
    }

    get female() {
       return selectors.getByText(onboardingLoc.female) 
    }

    get male() {
       return selectors.getByText(onboardingLoc.male) 
    }

    get save() {
        return selectors.getById(onboardingLoc.save)
    }

    async selectGenderV2(gender = onboardingLoc.female) {
        await selectors.getByText(gender).click()
    } 

    // 이름요소에 이름을 넣기 메소드
    async setName(name: string) {
        await actions.type(this.nameInputV2, name)
        await actions.dismissKeyboard()
    }

    async setAge(age: number) {
        await actions.type(this.ageInput, age)
    }

    async verifyOnboardingPage() {
        await actions.waitFor(this.appTitleV2)
        await actions.isVisible(this.photo)
        await actions.isVisible(this.photoBtn)
        await actions.isVisible(this.name)
        await actions.isVisible(this.nameInputV2)
        await actions.isVisible(this.age)
        await actions.isVisible(this.ageInput)
        await actions.isVisible(this.gender)
        await actions.isVisible(this.female)
        await actions.isVisible(this.male)
        await actions.isVisible(this.save)
    }

    async verifyEmptyState() {
        // 이름과 나이 비어있는지 확인 
        await actions.verifyElementText(this.nameInputV2, '이름 입력')
        await actions.verifyElementText(this.ageInput, '나이 입력')

        // 성별 클릭이 안되어 있는지 확인 
        await actions.isSelected(this.female, false)
        await actions.isSelected(this.male, false)

        // 저장 버튼 disabled되어 있는지 확인 
        await actions.isEnabled(this.save, false)
    }

    async tapSave() {
        await actions.tap(this.save)
    }

    async verifyNotLoggedIn() {
        const noDiaryText = selectors.getByText('일기가 하나도 없습니다.')
        await actions.isVisible(this.appTitleV2)
        await actions.isVisible(noDiaryText, false)
    }

    async verifyLoggedIn() {
        const noDiaryText = selectors.getByText('일기가 하나도 없습니다.')
        await actions.waitFor(noDiaryText)
        await actions.isVisible(this.appTitleV2, false)
    }

    async tapGender(gender: ChainablePromiseElement) {
        await actions.tap(gender)
    }
} 

export default new OnboardingPage()