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

    get save() {
        return selectors.byText(commonLoc.save)
    }

    async goToHomeTab() {
        await actions.tap(this.profileTab)
    }

    async goToWriteTab() {
        await actions.tap(this.profileTab)
    }

    async goToTokenTab() {
        await actions.tap(this.profileTab)
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
