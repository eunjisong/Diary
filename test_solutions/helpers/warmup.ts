import loginLoc from "../locators/login.loc"
import LoginScreen from "../screens/LoginScreen"

export async function warmup() {
    console.log('로그인...')
    await LoginScreen.fillOutAndSaveProfile(loginLoc.nameVal, loginLoc.ageVal, loginLoc.female)
    await LoginScreen.verifyLoginSuccess()
}