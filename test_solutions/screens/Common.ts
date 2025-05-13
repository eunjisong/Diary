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

    get cancelBtn() {
        return selectors.byText(commonLoc.cancelBtn)
    }

    get remove() {
        return selectors.byText(commonLoc.remove)
    }

    get removeAlertTitle() {
        return selectors.byText(commonLoc.removeAlertTitle)
    }

    get removeAlertSubtitle() {
        return selectors.byText(commonLoc.removeAlertSubtitle)
    }
    get save() {
        return selectors.byText(commonLoc.save)
    }

    get editBtn() {
        return selectors.byText(commonLoc.edit)
    }

    get helloWorld() {
        return selectors.byText(commonLoc.helloWorld)
    }

    get helloWorldKo() {
        return selectors.byText(commonLoc.helloWorldKo)
    }

    get happyMood() {
        return selectors.byId(commonLoc.happyMood)
    }

    get sadMood() {
        return selectors.byId(commonLoc.sadMood)
    }

    get badMood() {
        return selectors.byId(commonLoc.badMood)
    }

    get goodMood() {
        return selectors.byId(commonLoc.goodMood)
    }

    async goToHomeTab() {
        await actions.tap(this.homeTab)
    }

    async goToWriteTab() {
        await actions.tap(this.writeTab)
    }

    async goToTokenTab() {
        await actions.tap(this.tokenTab)
    }

    async goToProfileTab() {
        await actions.tap(this.profileTab)
    }

    async tapConfirm() {
        await actions.tap(this.confirmBtn)
    }

    async tapCancel() {
        await actions.tap(this.cancelBtn)
    }

    async tapSave() {
        await actions.tap(this.save)
    }

}

export default new Common()
