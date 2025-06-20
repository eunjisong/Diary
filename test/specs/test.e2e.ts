
describe('샘플테스트', ()=>{
    it('첫번째 테스트 케이스', async () => {
        await $('//*[@name="남자"]').click()
        await $('//*[@name="여자"]').click()
        await $('//*[@name="남자"]').click()
        await $('//XCUIElementTypeStaticText[@name="name_title"]').click()
        console.log('hello world')
    })
})