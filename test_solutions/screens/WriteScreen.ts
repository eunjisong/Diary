import { assert } from "chai";
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

    get calendar() {
        return selectors.byId(writeLoc.calendar)
    }

    async tapCalendar() {
        await actions.tap(this.calendar)
    }

    async selectLastMonth() {
        const lastMonth = actions.lastMonth()
        await this.tapCalendar()
        await actions.tap(this.prevMonth)
        await actions.tap(selectors.byContainsText(lastMonth))
    }

    async selectYesterday() {
        const yesterday = actions.yesterday()
        await this.tapCalendar()
        await actions.tap(selectors.byContainsText(yesterday))
    }

    async write(text: string, mood: string = 'happyMood', autosave = false) {
        await actions.tap(selectors.byId(mood))
        await actions.typeSlowly(this.writeInputfield, text)

        if (autosave) {
            await actions.waitFor(this.saved, 70000)
            await this.dismissWriteTabKeyboard()
        } else {
            await Common.tapSave()
        }
    }

    async dismissWriteTabKeyboard() {
        await actions.tap(this.saved)
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

    async verifyWrittenDiary(text: string | string[], mood: string) {
        await actions.isVisible(selectors.byId(`selected_${mood}`))
        const curr = await actions.getText(this.writeInputfield)
        if (typeof text === 'string') {
            assert.equal(curr, text, `${curr} != ${text}`)
        } else {
            const currStrings = curr.split('\n').map( str => str.trim()).filter( str => str.length > 0)
            assert.deepEqual(text, currStrings)
        }
        
        
    }
 }

export default new WriteScreen()
