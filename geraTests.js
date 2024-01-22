const faker = require('faker');
const axios = require('axios');

const apiUrl = 'http://localhost:8080/api/v2/tests/';
const authToken = '<<<APIKey here>>>';

function generateRandomTest() {

  return {
    engagement: faker.datatype.number({ min: 60, max: 200 }),
    tags: ["SAST"],
    scan_type: "Checkmarx One",
    title: faker.lorem.slug(),
    description: faker.git.commitMessage(),
    target_start: "2024-01-19T13:14:22.089Z",
    target_end: "2050-01-19T13:14:22.089Z",
    percent_complete: null,
    version: null,
    build_id: null,
    commit_hash: null,
    branch_tag: null,
    lead: faker.datatype.number({ min: 1, max: 5 }),
    test_type: 141,
    environment: 7,
    api_scan_configuration: null
  }
}

async function createTest(project) {
  try {
    const response = await axios.post(apiUrl, project, {
      headers: {
        'Authorization': `Token ${authToken}`
      }
    });
    
    console.log('Resposta da API:', response.data);  // Adicione esta linha para imprimir a resposta da API

    console.log(`Teste criado com sucesso: ${response.data.name}`);
  } catch (error) {
    console.error('Erro ao criar Test:', error.message);
    console.error('Detalhes do erro:', error.response ? error.response.data : '');
  }
}

async function createRandomTest() {
  for (let i = 0; i < 20; i++) {
    const randomProject = generateRandomTest();
    await createTest(randomProject);
  }
}

createRandomTest();
