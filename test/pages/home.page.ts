import { actions } from "../helpers/actions"
import { selectors } from "../helpers/selectors"
import homeLoc from "../locators/home.loc"
import onboardingPage from "./onboarding.page"
import writePage from "./write.page"

class HomePage {

    get noDiaryText() {
        return selectors.getByText(homeLoc.noDiaryText)
    }

    get writeBtn() {
        return selectors.getById(homeLoc.writeBtnId)
    }

    get edit() {
        return selectors.getByText(homeLoc.edit)
    }

    get editInputField() {
        return selectors.getById(homeLoc.editInputField)
    }

    get save() {
        return selectors.getByText(homeLoc.save)
    }

    get removeBtn() {
        return selectors.getByText(homeLoc.removeBtn)
    }

    get confirmBtn() {
        return selectors.getByText(homeLoc.confirmBtn)
    }

    async verifyEmptyScreen() {
        await actions.waitFor(this.noDiaryText)
        await actions.isVisible(onboardingPage.appTitleV2, false)
        await actions.isVisible(this.writeBtn)
    }

    async tapWriteBtn() {
        await actions.tap(this.writeBtn)
    }

    async verifyDiaryCard(content: string, mood: string, date: string, isEditable = false) {
        await actions.waitFor(selectors.getByText(content))
        await actions.isVisible(selectors.getById(mood)) //`mood_happy`
        await actions.isVisible(selectors.getByText(date))
        await actions.isVisible(this.edit, isEditable)
    }

    async tapDiary(date: string) {
        await actions.tap(selectors.getByText(date))
    }

    async tapEdit() {
        await actions.tap(this.edit)
    }

    async editDiary(content: string, mood: string, date: string | undefined = undefined) {
        // 컨텐츠 추가
        await actions.type(this.editInputField, content)
        // 기분 설정
        await actions.tap(selectors.getById(mood))

        // 날짜 넣기 
        if(date) {
            await writePage.tapCalendar()
            await writePage.injectDate(date)
        }

        // 저장 버튼 누르기 
        await actions.tap(this.save)
    } 

    async remove() {
        await actions.tap(this.removeBtn)
        await actions.tap(this.confirmBtn)
    }
    
}

export default new HomePage()