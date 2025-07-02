import { assert } from "chai"
import { actions } from "../helpers/actions"
import { selectors } from "../helpers/selectors"
import writeLoc from "../locators/write.loc"

class WritePage {
    // getter를 통한 엘레멘트 정의
    get writeTab() {
        return selectors.getById(writeLoc.writeTab)
    }

    get writeInputField() {
        return selectors.getById(writeLoc.writeInputField)
    }

    get saved() {
        return selectors.getByText(writeLoc.saved)
    }

    get save() {
        return selectors.getByText(writeLoc.save)
    }

    get newDiary() {
        return selectors.getByText(writeLoc.newDiary)
    }

    get overwrite() {
        return selectors.getByText(writeLoc.overwrite)
    }

    get homeTab() {
        return selectors.getById(writeLoc.homeTab)
    }

    get addMore() {
        return selectors.getByText(writeLoc.addMore)
    }

    get calendarButton() {
        return selectors.getById(writeLoc.calendarButton)
    }

    get prevMonth() {
        return selectors.getById(writeLoc.prevMonth)
    }

    // 커스텀 메소드 정의
    async goToWrite() {
        await actions.tap(this.writeTab)
    }

    async tapCalendar() {
        await actions.tap(this.calendarButton)
    }

    async injectDate(date: string) {
        const ele = selectors.getById(date) // '2025-07-31' testID
        try {
            await actions.tap(ele)
        } catch (e) {
            while (!(await actions.isVisibleTrueOrFalse(ele))) {
                await this.tapPrevMonth()
                await actions.delay(500)
            }
            await actions.tap(ele)
        }
    }

    async tapPrevMonth() {
        await actions.tap(this.prevMonth)
    }

    async tapMood(mood: string) {
        await actions.tap(selectors.getById(mood))
    }

    async write(content: string, isAutoSave = false, date: string | undefined = undefined, mood: string | undefined = undefined) {
        // 날짜 넣기 
        if(date) {
            await this.tapCalendar()
            await this.injectDate(date)
        }

        // 무드 넣기 
        if(mood) {
            await this.tapMood(mood)
        }

        // 일기 내용 넣기 
        await actions.type(this.writeInputField, content)

        // 저장 버튼 누를지 말지 최종 버튼 누르기/안누르기 
        if (isAutoSave) {
            await actions.delay(5000)
        } else {
            await actions.tap(this.save)
        }
    }

    async verifyAutoSaved() {
        await actions.isVisible(this.saved)
        await actions.isVisible(selectors.getByText('일기 리스트'), false)
    }

    async verifyManualSaved(content: string) {
        await actions.delay(1000)
        await actions.isVisible(this.saved, false)
        await actions.isVisible(selectors.getByText('일기 리스트'))
        await actions.isVisible(selectors.getByText(content))
    }

    async tapNewDiary() {
        await actions.tap(this.newDiary)
    }
    
    async tapOverwrite() {
        await actions.tap(this.overwrite)
    }

    async verifyContent(targetDiary: string) {
        const uiDiary = await actions.getText(this.writeInputField)

        assert.include(uiDiary, targetDiary, `${uiDiary}에 ${targetDiary}가 포함되어 있지 않습니다!`)
    }

    async goToHome() {
        await actions.tap(this.homeTab)
    }

    async tapAddMore() {
        await actions.tap(this.addMore)
    }

    async goToJournal(content: string) {
        await actions.tap(selectors.getBySomeText(content))
    }

    async verifyAddOn(content: string) {
        await actions.isVisible(selectors.getBySomeText(content))
    }

    async tapSaved() {
        await actions.waitFor(this.saved)
        await actions.tap(this.saved)

    }
}

export default new WritePage()