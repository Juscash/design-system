#!/usr/bin/env node

/**
 * Script para criar changeset e versionar facilmente
 * 
 * Uso:
 *   node scripts/version.js patch   # 0.0.1 -> 0.0.2
 *   node scripts/version.js minor   # 0.0.1 -> 0.1.0
 *   node scripts/version.js major   # 0.0.1 -> 1.0.0
 *   node scripts/version.js         # Interativo
 */

const { execSync } = require('child_process');
const args = process.argv.slice(2);
const versionType = args[0]; // patch, minor, major

function log(message) {
  console.log(`\n📝 ${message}\n`);
}

function createChangeset() {
  log('Criando changeset...');
  try {
    execSync('pnpm changeset', { stdio: 'inherit' });
  } catch (err) {
    console.error('Erro ao criar changeset');
    process.exit(1);
  }
}

function version() {
  log('Atualizando versões...');
  try {
    execSync('pnpm version', { stdio: 'inherit' });
  } catch (err) {
    console.error('Erro ao atualizar versões');
    process.exit(1);
  }
}

function main() {
  if (versionType) {
    const validTypes = ['patch', 'minor', 'major'];
    if (!validTypes.includes(versionType)) {
      console.error(`❌ Tipo inválido: ${versionType}`);
      console.log(`Use: ${validTypes.join(', ')}`);
      process.exit(1);
    }
    
    log(`Criando changeset para ${versionType}...`);
    createChangeset();
    version();
  } else {
    log('Criando changeset interativo...');
    createChangeset();
    log('Atualizando versões...');
    version();
  }

  console.log('\n✅ Versão atualizada!');
  console.log('\n📦 Próximo passo: pnpm release (ou node scripts/publish.js)\n');
}

main();

