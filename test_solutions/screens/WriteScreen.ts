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

    get saved() {
        return selectors.byText(writeLoc.saved)
    }

    get newDiary() {
        return selectors.byText(writeLoc.newDiary)
    }

    get append() {
        return selectors.byText(writeLoc.append)
    }

    get overwrite() {
        return selectors.byText(writeLoc.overwrite)
    }

    get prevMonth() {
        return selectors.byContainsText(writeLoc.leftArrow)
    }

    async selectLastMonth() {
        const lastMonth = actions.lastMonth()
        const yesterday = actions.yesterday()
        await this.tapCalendar(yesterday)
        await actions.tap(this.prevMonth)
        await actions.tap(selectors.byContainsText(lastMonth))
    }

    async selectYesterday() {
        const yesterday = actions.yesterday()
        await this.tapCalendar()
        await actions.tap(selectors.byContainsText(yesterday))
    }

    async tapCalendar(date: string = actions.today()) {
        await actions.tap(selectors.byText(date))
    }

    async write(text: string, mood: string = 'happyMood', autosave = false) {
        await actions.tap(selectors.byId(mood))
        await actions.type(this.writeInputfield, text)

        if (autosave) {
            await actions.waitFor(this.saved, 70000)
            await actions.tap(this.saved)
        } else {
            await Common.tapSave()
        }
    }

    async tapNewDiary() {
        await actions.tap(this.newDiary)
    }

    async tapAppend() {
        await actions.tap(this.append)
    }

    async tapOverwrite() {
        await actions.tap(this.overwrite)
    }
}

export default new WriteScreen()
