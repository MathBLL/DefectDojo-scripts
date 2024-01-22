const faker = require('faker');
const axios = require('axios');

const apiUrl = 'http://localhost:8080/api/v2/products/';
const authToken = '60ed49da4556792646d6e13dec6144f427e432e9';

// Função para gerar um projeto aleatório
function generateRandomProject() {
  const tags = ["banking", "ton", "payments"];
  const businessCriticalities = ["very high", "high", "medium", "low", "very low", "none"];
  const platforms = ["web service", "desktop", "iot", "mobile", "web"];
  const lifecycles = ["construction", "production", "retirement"];
  const origins = ["third party library", "purchased", "contractor", "internal", "open source", "outsourced"];

  return {
    tags: [faker.random.arrayElement(tags)],
    name: faker.lorem.slug(), 
    description: faker.git.commitMessage(),
    prod_numeric_grade: 2147483647,
    business_criticality: faker.random.arrayElement(businessCriticalities),
    platform: faker.random.arrayElement(platforms),
    lifecycle: faker.random.arrayElement(lifecycles),
    origin: faker.random.arrayElement(origins),
    user_records: 214,
    revenue: "100",
    external_audience: faker.datatype.boolean(),
    internet_accessible: faker.datatype.boolean(),
    enable_product_tag_inheritance: faker.datatype.boolean(),
    enable_simple_risk_acceptance: faker.datatype.boolean(),
    enable_full_risk_acceptance: faker.datatype.boolean(),
    disable_sla_breach_notifications: faker.datatype.boolean(),
    product_manager: faker.datatype.number({ min: 1, max: 5 }),
    technical_contact: faker.datatype.number({ min: 1, max: 5 }),
    team_manager: faker.datatype.number({ min: 1, max: 5 }),
    prod_type: 2,
    sla_configuration: 1,
    regulations: [14]
  };
}

async function createProject(project) {
  try {
    const response = await axios.post(apiUrl, project, {
      headers: {
        'Authorization': `Token ${authToken}`
      }
    });
    console.log(`Projeto criado com sucesso: ${response.data.name}`);
  } catch (error) {
    console.error('Erro ao criar projeto:', error.message);
    console.error('Detalhes do erro:', error.response ? error.response.data : '');
  }
}

async function createRandomProjects() {
  for (let i = 0; i < 20; i++) {
    const randomProject = generateRandomProject();
    await createProject(randomProject);
  }
}

createRandomProjects();