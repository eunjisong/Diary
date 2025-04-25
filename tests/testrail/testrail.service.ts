import axios from 'axios';
import { testRailConfig } from './testrail.config';

const { domain, username, apiKey, projectId, suiteId } = testRailConfig;

const testrail = axios.create({
    baseURL: `${domain}/index.php?/api/v2`,
    auth: { username, password: apiKey }
});

export async function getOrCreateTestRun(platform: string): Promise<number | undefined> {
    const today = new Date().toISOString().split('T')[0];
    const name = `${platform}-${today}`;
  
    try {
        const response = await testrail.get(`/get_runs/${projectId}`);
        const runs = response.data.runs || response.data
        const existingRun = Array.isArray(runs) ? runs.find(r => r.name === name) : undefined;
        
      if (existingRun) {
        console.log('[TestRail] Found existing run:', existingRun.id);
        return existingRun.id;
      }
  
      const res = await testrail.post(`/add_run/${projectId}`, {
        suite_id: suiteId,
        name,
        include_all: true
      });
      console.log('[TestRail] Created new run:', res.data.id);
      return res.data.id;
    } catch (error: any) {
      console.error('[TestRail] Failed to get or create run:', error.response?.data || error.message);
      return undefined;
    }
  }
  
export async function getOrCreateSection(name: string): Promise<number> {
    const { data } = await testrail.get(`/get_sections/${projectId}&suite_id=${suiteId}`);

    const sections = data.sections;

    if (!Array.isArray(sections)) {
        throw new Error('Invalid response: "sections" is not an array');
    }

    const found = sections.find((s: any) => s.name === name);
    if (found) return found.id;

    const res = await testrail.post(`/add_section/${projectId}`, {
        suite_id: suiteId,
        name,
    });

    return res.data.id;
}

export async function getOrCreateTestCase(title: string, sectionId: number): Promise<number> {
    const { data } = await testrail.get(
        `/get_cases/${projectId}&suite_id=${suiteId}&section_id=${sectionId}`
    );

    const cases = data.cases;

    if (!Array.isArray(cases)) {
        throw new Error('Invalid response: "cases" is not an array');
    }

    const found = cases.find((c: any) => c.title === title);
    if (found) return found.id;

    const res = await testrail.post(`/add_case/${sectionId}`, {
        title,
        template_id: 1, // 필요에 따라 변경
        type_id: 1,
        priority_id: 2,
    });

    return res.data.id;
}

export async function addTestResult(runId: number, caseId: number, statusId: number, comment?: string) {
    console.log('[DEBUG] Adding result to TestRail:', { runId, caseId, statusId, comment });
  
    try {
      const res = await testrail.post(`/add_result_for_case/${runId}/${caseId}`, {
        status_id: statusId,
        comment: comment || ''
      });
      console.log('[DEBUG] Result added:', res.data);
    } catch (error: any) {
      console.error('[ERROR] Failed to add result:', error.response?.data || error.message);
    }
  }
  
