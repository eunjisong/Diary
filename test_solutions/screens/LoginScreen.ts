import { assert } from "chai";
import { actions } from "../helpers/actions";
import { selectors } from "../helpers/selectors"
import loginLoc from "../locators/login.loc";
import HomeScreen from "./HomeScreen";
import path from 'path'
import { execSync } from 'child_process';
import Common from "./Common";

class LoginScreen {
    get title() {
        return selectors.byText(loginLoc.title)
    }

    get image() {
        return selectors.byId(loginLoc.image)
    }

    get imageBtn() {
        return selectors.byText(loginLoc.imageBtn)
    }

    get nameTitle() {
        return selectors.byText(loginLoc.nameTitle)
    }

    get nameInput() {
        return selectors.byId(loginLoc.nameInput)
    }

    get ageTitle() {
        return selectors.byText(loginLoc.ageTitle)
    }

    get ageInput() {
        return selectors.byId(loginLoc.ageInput)
    }

    get genderTitle() {
        return selectors.byText(loginLoc.genderTitle)
    }

    get female() {
        return selectors.byText(loginLoc.female)
    }

    get male() {
        return selectors.byText(loginLoc.male)
    }

    async verifyLoginScreen() {
        await actions.isVisible(this.title)
        await actions.isVisible(this.image)
        await actions.isVisible(this.imageBtn)
        await actions.isVisible(this.nameTitle)
        await actions.isVisible(this.nameInput)
        await actions.isVisible(this.ageTitle)
        await actions.isVisible(this.ageInput)
        await actions.isVisible(Common.save)
        await actions.isVisible(this.genderTitle)
        await actions.isVisible(this.female)
        await actions.isVisible(this.male)
    }

    async selectPhoto(index = 1) {
        await actions.tap(this.imageBtn)
        await actions.tap(selectors.byImageAtIndex(index))
    }

    async selectGender(gender: string) {
        await actions.tap(selectors.byText(gender))
    }

    async verifyPhotoChanged() {
        const previousImage = await actions.getText(this.image)
        await this.selectPhoto()
        const newImage = await actions.getText(this.image)
        assert.equal(previousImage, newImage, `${previousImage} != ${newImage}`)
    }

    async fillOutAndSaveProfile(name: string, age: string, gender: string) {
        // 이름, 나이, 성별 넣기 
        await actions.typeSlowly(this.nameInput, name)
        await actions.typeSlowly(this.ageInput, age)
        await actions.dismissKeyboard('Done')
        await this.selectGender(gender)

        // 완료하기 
        await Common.tapSave()
    }

    async verifyLoginSuccess() {
        await actions.isNotVisible(this.title)
        await actions.isVisible(HomeScreen.title)
    }

    addPhotoToAndroid() {
        const localImagePath = path.resolve(__dirname, '../example.png');
        if (driver.isAndroid) {
            const deviceImagePath = '/sdcard/DCIM/Camera/exampleDark.png';

            console.log('image push 중...');
            execSync(`adb push "${localImagePath}" "${deviceImagePath}"`);
            console.log('image push 성공!');

            console.log('미디어 스캔 트리거...');
            execSync(`adb shell am broadcast -a android.intent.action.MEDIA_SCANNER_SCAN_FILE -d file://${deviceImagePath}`);
            console.log('갤러리에 반영 완료!');
        }
    }
}


export default new LoginScreen()
