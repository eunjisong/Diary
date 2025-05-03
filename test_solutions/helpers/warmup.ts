import loginLoc from "../locators/login.loc"
import LoginScreen from "../screens/LoginScreen"

export async function warmup() {
    console.log('로그인...')
    await LoginScreen.selectPhoto()
    await LoginScreen.fillOutAndSaveProfile(loginLoc.name, loginLoc.age, loginLoc.female)
    await LoginScreen.verifyLoginSuccess()
}