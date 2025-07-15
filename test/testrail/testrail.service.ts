// 2. api 콜을 통해서 test section + test case를 만듭니다 (없으면 만들고, 있으면 있는 id를 가져올 예정입니다 )
// 3. 테스트가 진행됩니다 
// 4. 테스트 결과값을 api 콜을 통해 보내줍니다. 

import axios from "axios";
import { testRailConfig } from "./testrail.config";

const { domain, username, apiKey, projectId, suiteId } = testRailConfig

const testrail = axios.create({
    baseURL: domain + '/index.php?/api/v2', 
    auth: { username, password: apiKey }
})

// 1. api 콜을 통해서 testrun 만듭니다 (없으면 만들고, 있으면 있는 id를 가져올 예정입니다 )
export async function getTestRun(platform: string) {
    // iOS: 오늘날짜
    const today = new Date().toISOString().split('T')[0]
    const title = `${platform}: ${today}`

    try {
        // testRun 있으면 exsiting에 담아서 리턴 
        const response = await testrail.get(`/get_runs/${projectId}`)
        const runs = response.data.runs || response.data
        const existing = Array.isArray(runs) ? runs.find( run => run.name === title ) : undefined
        if (existing) {
            console.log('해당 테스트런을 찾았습니다!', existing.id)
            return existing.id
        }

        // testRun 없으면 만들어서 리턴 
        const res = await testrail.post(`/add_run/${projectId}`, {
            suiteId: suiteId,
            name: title
        })
        console.log('새로운 테스트런이 만들어졌습니다', res.data.id)
        return res.data.id
    } catch (e: any) {
        console.error('테스트런을 만들거나 가져오는 과정 중에 에러가 났습니다!', e.response?.data || e.message )
        return undefined
    }
}

// 2. api 콜을 통해서 test section
export async function getSection(name: string) {
    // 있으면 get할 것 
    const { data } = await testrail.get(`/get_sections/${projectId}&suite_id=${suiteId}`)
    const sections = data.sections 
    const existing = Array.isArray(sections) ? sections.find( run => run.name === name ) : undefined
    if (existing) return existing.id

    // 없으면 post할 것 
    const res = await testrail.post(`/add_section/${projectId}`, {
            suiteId: suiteId,
            name
        })
    return res.data.id
}

// 3. test case를 만듭니다 (없으면 만들고, 있으면 있는 id를 가져올 예정입니다 )
export async function getTestCase(title: string, sectionId: number) {
    // 있으면 get할 것 
    const { data } = await testrail.get(`/get_cases/${projectId}&suite_id=${suiteId}&section_id=${sectionId}`)
    const cases = data.cases 
    const existing = Array.isArray(cases) ? cases.find( c => c.title === title ) : undefined
    if (existing) return existing.id
    
    // 없으면 post할 것 
    const res = await testrail.post(`/add_case/${sectionId}`, {
            title
        })
    return res.data.id
}

// 4. 테스트 결과값을 api 콜을 통해 보내줍니다. 
export async function sendResult(runId: number, caseId: number, statusId: number) {
    // post 결과값을 보내줄 예정
    try {
        const res = await testrail.post(`/add_result_for_case/${runId}/${caseId}`, {
            status_id: statusId
        })
        console.log('결과값을 보냈습니다!')
    } catch (e: any) {
        console.error('결과값을 보내지 못했습니다!', e.response?.data || e.message)
    }
}