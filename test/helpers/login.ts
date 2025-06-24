import onboardingPage from "../pages/onboarding.page";

export default async function login() {
    await onboardingPage.setName('오토봇')   
    await onboardingPage.setAge(5)   
    await onboardingPage.tapGender(onboardingPage.female)   
    await onboardingPage.tapSave()   
}