#!/usr/bin/env node

/**
 * Script automatizado para publicar no npm
 * 
 * Uso:
 *   node scripts/publish.js
 *   node scripts/publish.js --dry-run
 *   node scripts/publish.js --skip-build
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const isDryRun = args.includes('--dry-run');
const skipBuild = args.includes('--skip-build');

const PACKAGE_PATH = path.join(__dirname, '../packages/components');
const PACKAGE_JSON = path.join(PACKAGE_PATH, 'package.json');

function log(message) {
  console.log(`\n📦 ${message}\n`);
}

function error(message) {
  console.error(`\n❌ ${message}\n`);
  process.exit(1);
}

function success(message) {
  console.log(`\n✅ ${message}\n`);
}

function checkNpmLogin() {
  try {
    const whoami = execSync('npm whoami', { encoding: 'utf-8' }).trim();
    log(`Logado no npm como: ${whoami}`);
    return true;
  } catch (err) {
    error('Você não está logado no npm. Execute: npm login');
    return false;
  }
}

function checkPackageJson() {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_JSON, 'utf-8'));
  
  const checks = {
    version: pkg.version !== '0.0.0',
    author: pkg.author && pkg.author !== '',
    repository: pkg.repository && pkg.repository.url && pkg.repository.url !== '',
  };

  const missing = Object.entries(checks)
    .filter(([_, passed]) => !passed)
    .map(([key]) => key);

  if (missing.length > 0) {
    error(`Faltam informações no package.json: ${missing.join(', ')}\n` +
          `Edite: ${PACKAGE_JSON}`);
    return false;
  }

  log(`Versão atual: ${pkg.version}`);
  return true;
}

function build() {
  if (skipBuild) {
    log('Pulando build (--skip-build)');
    return;
  }

  log('Fazendo build da biblioteca...');
  try {
    execSync('pnpm build:components', { stdio: 'inherit' });
    success('Build concluído!');
  } catch (err) {
    error('Erro no build. Corrija os erros antes de publicar.');
  }
}

function checkDist() {
  const distPath = path.join(PACKAGE_PATH, 'dist');
  if (!fs.existsSync(distPath)) {
    error('Pasta dist/ não encontrada. Execute o build primeiro.');
    return false;
  }

  const files = fs.readdirSync(distPath);
  if (files.length === 0) {
    error('Pasta dist/ está vazia. Execute o build primeiro.');
    return false;
  }

  log(`Arquivos no dist/: ${files.length} arquivos`);
  return true;
}

function publish() {
  process.chdir(PACKAGE_PATH);

  if (isDryRun) {
    log('🔍 Simulando publicação (dry-run)...');
    try {
      execSync('npm pack --dry-run', { stdio: 'inherit' });
      success('Dry-run concluído! Nada foi publicado.');
    } catch (err) {
      error('Erro no dry-run');
    }
  } else {
    log('🚀 Publicando no npm...');
    try {
      execSync('npm publish --access public', { stdio: 'inherit' });
      success('Publicação concluída com sucesso! 🎉');
      log('Verifique em: https://www.npmjs.com/package/@design-system/components');
    } catch (err) {
      error('Erro ao publicar. Verifique as mensagens acima.');
    }
  }
}

// Execução principal
function main() {
  log('=== Publicação no NPM ===\n');

  if (!checkNpmLogin()) return;
  if (!checkPackageJson()) return;
  
  build();
  if (!checkDist()) return;
  
  publish();
}

main();

