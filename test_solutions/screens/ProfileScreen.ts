import { actions } from "../helpers/actions";
import { selectors } from "../helpers/selectors"
import commonLoc from "../locators/common.loc";
import homeLoc from "../locators/home.loc";
import profileLoc from "../locators/profile.loc";
import Common from "./Common";

class ProfileScreen {
    get logoutBtn () {
        return selectors.byText(profileLoc.logout)
    }

    async logout() {
        await actions.tap(Common.profileTab)
        await actions.tap(this.logoutBtn)
        await actions.tap(Common.confirmBtn)
    }   

    async verifyProfileScreen(name: string, age: string, gender: string) {
        
    } 
}

export default new ProfileScreen()
