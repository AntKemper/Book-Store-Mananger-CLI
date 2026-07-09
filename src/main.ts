import { testConnection } from '../database/connection';

async function main() {
  await testConnection();
}

main();