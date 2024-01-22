const faker = require('faker');
const axios = require('axios');

const apiUrl = 'http://localhost:8080/api/v2/engagements/';
const authToken = '60ed49da4556792646d6e13dec6144f427e432e9';

function generateRandomEngagement() {

  return {
    tags: ["stone"],
    name: faker.lorem.slug(),
    description: faker.git.commitMessage(),
    version: "1.0",
    first_contacted: "2024-01-18",
    target_start: "2024-01-18",
    target_end: "2050-01-18",
    tracker: "https://vaicorinthians.com/api/",
    testStrategy: "https://vaicorinthians.com/api/",
    threat_model: true,
    api_test: false,
    pen_test: false,
    check_list: true,
    status: "Not Started",
    engagement_type: "Interactive",
    build_id: "string",
    commit_hash: "string",
    branch_tag: faker.lorem.slug(),
    source_code_management_uri: "https://github.vaicorinthians.com/corinthians",
    deduplication_on_engagement: true,
    lead: faker.datatype.number({ min: 1, max: 5 }),
    product: faker.datatype.number({ min: 1, max: 90 }),
  };
}

async function createEngagement(project) {
  try {
    const response = await axios.post(apiUrl, project, {
      headers: {
        'Authorization': `Token ${authToken}`
      }
    });
    console.log(`Engagement criado com sucesso: ${response.data.name}`);
  } catch (error) {
    console.error('Erro ao criar engagement:', error.message);
    console.error('Detalhes do erro:', error.response ? error.response.data : '');
  }
}

async function createRandomEngagement() {
  for (let i = 0; i < 20; i++) {
    const randomProject = generateRandomEngagement();
    await createEngagement(randomProject);
  }
}

createRandomEngagement();