import { testConnection } from '../database/connection';
import { exibirMenuPrincipal } from '../menus/menuDeNavegacao';

async function main() {
  await testConnection();
  await exibirMenuPrincipal();
}

main();