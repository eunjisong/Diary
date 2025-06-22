function withPlatform(ios: string, android: string) {
    return driver.isIOS ? $(ios) : $(android)
}

function getByText(text: string) {
    return withPlatform(`//*[@name="${text}"]`, `//*[@text="${text}"]`)
}

// getByID 
function getById(id: string) {
    return withPlatform(`~${id}`, `//*[@resource-id="${id}"]`)
}



export const selectors = {
    getByText,
    getById
}