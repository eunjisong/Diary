import { actions } from "../helpers/actions";
import { selectors } from "../helpers/selectors";
import onboardingLoc from "../locators/onboarding.loc";
import profileLoc from "../locators/profile.loc";
import onboardingPage from "./onboarding.page";

class ProfilePage {
    // getter로 가져오는 엘레멘트 
    get nameTitle() {
        return selectors.getByText(profileLoc.nameTitle)
    }

    get ageTitle() {
        return selectors.getByText(profileLoc.ageTitle)
    }

    get genderTitle() {
        return selectors.getByText(profileLoc.genderTitle)
    }

    get nameValue() {
        return selectors.getById(profileLoc.nameValue)
    }

    get ageValue() {
        return selectors.getById(profileLoc.ageValue)
    }

    get genderValue() {
        return selectors.getById(profileLoc.genderValue)
    }

    get edit() {
        return selectors.getByText(profileLoc.edit)
    }

    get logout() {
        return selectors.getByText(profileLoc.logout)
    }

    get profileTab() {
        return selectors.getById(profileLoc.profileTabId)
    }

    get nameEditInput() {
        return selectors.getById(profileLoc.nameEditInput)
    }

    get ageEditInput() {
        return selectors.getById(profileLoc.ageEditInput)
    }

    get cancel() {
        return selectors.getByText(profileLoc.cancel)
    }

    get save() {
        return selectors.getByText(profileLoc.save)
    }

    get alertContent() {
        return selectors.getByText(profileLoc.alertContent)
    }

    get confirm() {
        return selectors.getByText(profileLoc.confirm)
    }

    // getter를 사용해서 커스텀 메소드
    async goToProfile() {
        await actions.tap(this.profileTab)
    }

    async verifyUserData(name = onboardingLoc.userName, age = onboardingLoc.userAge, gender = onboardingLoc.female) {
        await actions.waitFor(this.nameTitle)
        await actions.isVisible(selectors.getByText(name))
        await actions.isVisible(selectors.getByText(age.toString()))
        await actions.isVisible(selectors.getByText(gender))
    }

    async tapEdit() {
        await actions.tap(this.edit) 
    }

    async editUserData(name: string, age: number, gender: string) {
        await actions.type(this.nameEditInput, name)
        await actions.type(this.ageEditInput, age)
        await actions.dismissKeyboard('Done')
        await actions.tap(selectors.getByText(gender))
    }

    async tapCancel() {
        await actions.tap(this.cancel)
    }

    async tapConfirm() {
        await actions.tap(this.confirm)
    }

    async tapSave() {
        await actions.tap(this.save)
    }

    async tapLogout() {
        await actions.tap(this.logout)
    }

    async verifyLogoutAlert() {
        await actions.waitFor(this.alertContent)
        await actions.isVisible(this.cancel)
        await actions.isVisible(this.confirm)
    }

    async verifyLoggedOut() {
        // 프로필탭 X 
        await actions.isVisible(this.nameTitle, false)
        await actions.isVisible(this.nameValue, false)

        // 온보딩스크린 
        await onboardingPage.verifyEmptyState()
    }
}

export default new ProfilePage()