import { actions } from "../helpers/actions";
import { selectors } from "../helpers/selectors"
import profileLoc from "../locators/profile.loc";
import Common from "./Common";
import LoginScreen from "./LoginScreen";

class ProfileScreen {
    get image() {
        return selectors.byId(profileLoc.image)
    }

    get nameVal() {
        return selectors.byId(profileLoc.nameVal)
    }

    get ageVal() {
        return selectors.byId(profileLoc.ageVal)
    }

    get genderVal() {
        return selectors.byId(profileLoc.genderVal)
    }

    get logoutBtn() {
        return selectors.byText(profileLoc.logout)
    }

    get nameEditInputField() {
        return selectors.byId(profileLoc.nameEditInputField)
    }

    get ageEditInputField() {
        return selectors.byId(profileLoc.ageEditInputField)
    }

    get unselectedGender() {
        return selectors.byId(profileLoc.unselectedGender)
    }

    get selectedGender() {
        return selectors.byId(profileLoc.selectedGender)
    }

    get logoutAlertTitle() {
        return selectors.byText(profileLoc.logoutAlertTitle)
    }

    get logoutAlertSubtitle() {
        return selectors.byText(profileLoc.logoutAlertSubtitle)
    }

    async tapLogout() {
        await actions.tap(this.logoutBtn)
    }

    async logout() {
        await Common.goToProfileTab()
        await this.tapLogout()
        await Common.tapConfirm()
    }   

    async verifyProfileScreen(name: string, age: string, gender: string) {
        await actions.isVisible(this.image)
        await actions.isVisible(this.logoutBtn)
        await actions.isVisible(Common.editBtn)
        await actions.verifyElementText(this.nameVal, name)
        await actions.verifyElementText(this.ageVal, age)
        await actions.verifyElementText(this.genderVal, gender)
    } 

    async verifyProfileEditScreen(selectedGender: string) {
        await actions.isNotVisible(this.nameVal)
        await actions.isNotVisible(this.ageVal)
        await actions.isNotVisible(this.genderVal)
        await actions.isVisible(this.nameEditInputField)
        await actions.isVisible(this.ageEditInputField)
        await actions.isVisible(this.unselectedGender)
        await actions.isVisible(this.selectedGender)
        await actions.verifyElementText(this.selectedGender, selectedGender)
    }

    async editProfile() {
        await this.nameEditInputField.clearValue()
        await actions.typeSlowly(this.nameEditInputField, profileLoc.newNameVal)
        await this.ageEditInputField.clearValue()
        await actions.typeSlowly(this.ageEditInputField, profileLoc.newAgeVal)
        await actions.dismissKeyboard()
        await actions.tap(LoginScreen.male)
        await Common.tapSave()
    }

    async verifyLogoutAlert() {
        await actions.isVisible(this.logoutAlertTitle)
        await actions.isVisible(this.logoutAlertSubtitle)
        await actions.isVisible(Common.confirmBtn)
        await actions.isVisible(Common.cancelBtn)
    }
}

export default new ProfileScreen()
