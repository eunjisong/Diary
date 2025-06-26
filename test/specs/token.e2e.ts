import login from "../helpers/login"

describe('토큰탭 API 테스트', () => {

    let apiTokens: any

    before(async() => {
        apiTokens = await tokenPage.getApiTokens()
        // 로그인
        await login()
        // 토큰탭 클릭
        await tokenPage.goToToken()
    })


    it('넘버원 토큰 카드 테스트', async () => {
        // 넘버원 토큰 API에서 가져오기 
        const apiToken = apiTokens[0]

        // 비교하기: API토큰 VS UI토큰
        await tokenPage.compareApiCardAndUiCard(apiToken)
    })

    it('전체 토큰 리스트 테스트', async () => {
        // 1-10 리스트를 먼저 API에서 가져오기 

        // 비교하기:  1-10까지 토큰 이름과 토큰 심볼 // Bitcoin (BTC)
        for (let i=0; i<apiTokens.length; i++) {
            // 필요시 스크롤 
            await tokenPage.compareApiTokenNameAndUiTokenName(apiTokens[i])
        }
        
    })

})