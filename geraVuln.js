const faker = require('faker');
const axios = require('axios');

const apiUrl = 'http://localhost:8080/api/v2/findings/';
const authToken = '60ed49da4556792646d6e13dec6144f427e432e9';

const tags = ["intranet", "exposure", "exploitPub", "exploitable"];
const classification = ["very high", "high", "medium", "low", "very low", "none"];
const nSeverity = ["S0", "S1", "S2", "S3", "S4"]

// Função para gerar valores aleatórios de CVSS
function generateRandomCVSS() {
  return `CVSS:3.0/S:${faker.random.arrayElement(['U', 'C', 'R'])}/AV:${faker.random.arrayElement(['N', 'A', 'L', 'P'])}/AC:${faker.random.arrayElement(['H', 'L', 'M'])}/PR:${faker.random.arrayElement(['N', 'L', 'H'])}/UI:${faker.random.arrayElement(['N', 'R'])}/C:${faker.random.arrayElement(['N', 'L', 'H'])}/I:${faker.random.arrayElement(['N', 'L', 'H'])}/A:${faker.random.arrayElement(['N', 'L', 'H'])}/E:${faker.random.arrayElement(['ND', 'U', 'POC', 'F', 'H', 'O'])}/RL:${faker.random.arrayElement(['X', 'O', 'T', 'W', 'U', 'C'])}`;
}

// Função para gerar CWEs
function getRandomCWEId() {
  const cweList = ["CWE-200", "CWE-201", "CWE-202", "CWE-203", "CWE-204"];
  return faker.random.arrayElement(cweList);
}

// Função que gera vulnerabilidades aleatoriamente
function generateRandomVuln() {
  const randomCVSS = generateRandomCVSS(); // Chama a função para gerar o CVSS
  
  const numberOfCWEs = faker.datatype.number({ min: 1, max: 5 });
  const cweIds = Array.from({ length: numberOfCWEs }, () => getRandomCWEId());
  const vulnerabilityIds = cweIds.map(cweId => ({ vulnerability_id: cweId }));

  return {
    test: 4,
    thread_id: faker.datatype.number({ min: 1, max: 30 }),
    found_by: [141],
    url: "https://vaicorinthians.com/",
    tags: [faker.random.arrayElement(tags)],
    push_to_jira: false,
    vulnerability_ids: vulnerabilityIds,
    reporter: faker.datatype.number({ min: 1, max: 5 }),
    title: faker.hacker.noun(),
    date: "2024-01-19",
    sla_start_date: "2024-01-19",
    cwe: faker.datatype.number({ min: 50, max: 200 }),
    cvssv3: randomCVSS, // Usa o valor gerado para o campo cvssv3
    cvssv3_score: null,
    severity: faker.random.arrayElement(classification),
    description: faker.hacker.phrase(),
    mitigation: faker.hacker.phrase(),
    impact: faker.hacker.phrase(),
    steps_to_reproduce: faker.hacker.phrase(),
    severity_justification: null,
    references: null,
    active: true,
    verified: faker.datatype.boolean(),
    false_p: false,
    duplicate: false,
    out_of_scope: faker.datatype.boolean(),
    risk_accepted: false,
    under_review: false,
    under_defect_review: false,
    is_mitigated: true,
    numerical_severity: faker.random.arrayElement(nSeverity),
    line: faker.datatype.number({ min: 1, max: 1000 }),
    file_path: null,
    component_name: null,
    component_version: null,
    static_finding: faker.datatype.boolean(),
    dynamic_finding: faker.datatype.boolean(),
    unique_id_from_tool: null,
    vuln_id_from_tool: null,
    sast_source_object: null,
    sast_sink_object: null,
    sast_source_line: null,
    sast_source_file_path: null,
    nb_occurences: null,
    publish_date: null,
    service: null,
    planned_remediation_date: null,
    planned_remediation_version: null,
    effort_for_fixing: null,
    review_requested_by: faker.datatype.number({ min: 1, max: 5 }),
    defect_review_requested_by: null,
    sonarqube_issue: null,
    reviewers: [faker.datatype.number({ min: 1, max: 5 })]
  };
}

// Função para criar a vulnerabilidade
async function createVuln(project) {
  try {
    const response = await axios.post(apiUrl, project, {
      headers: {
        'Authorization': `Token ${authToken}`
      }
    });
    console.log(`Vulnerabilidade criada com sucesso: ${response.data.name}`);
  } catch (error) {
    console.error('Erro ao criar Vulnerabilidade:', error.message);
    console.error('Detalhes do erro:', error.response ? error.response.data : '');
  }
}

// Função para criar várias vulnerabilidades aleatórias
async function createRandomVuln() {
  for (let i = 0; i < 10; i++) {
    const randomProject = generateRandomVuln();
    await createVuln(randomProject);
  }
}

// Chama a função para criar vulnerabilidades aleatórias
createRandomVuln();