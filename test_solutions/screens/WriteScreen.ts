import { actions } from "../helpers/actions";
import { selectors } from "../helpers/selectors"
import homeLoc from "../locators/home.loc";
import writeLoc from "../locators/write.loc";
import Common from "./Common";

class WriteScreen {
    get title () {
        return selectors.byText(homeLoc.title)
    }
    
    get writeInputfield() {
        return selectors.byId(writeLoc.writeInputField)
    }

    async write (text: string, date: string | undefined = undefined, mood: string | undefined = undefined) {
        if (date) {

        } 
        if (mood) {

        }
        await actions.setText(this.writeInputfield, text)
        await Common.tapSave()

    }
}

export default new WriteScreen()
