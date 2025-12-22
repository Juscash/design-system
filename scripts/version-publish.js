const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const versionType = process.argv[2] || 'patch';

// Run version update
console.log(`📦 Atualizando versão (${versionType})...`);
execSync(`node scripts/version.js ${versionType}`, { stdio: 'inherit' });

// Read updated version
const packageJsonPath = path.join(__dirname, '../packages/design-system/package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const newVersion = packageJson.version;

console.log(`\n📝 Fazendo commit e criando tag...`);

try {
  // Add package.json
  execSync('git add packages/design-system/package.json', { stdio: 'inherit' });
  
  // Commit
  execSync(`git commit -m "chore: bump @Juscash/design-system to ${newVersion}"`, { stdio: 'inherit' });
  
  // Create tag
  const tagName = `v${newVersion}`;
  execSync(`git tag ${tagName}`, { stdio: 'inherit' });
  
  console.log(`\n🚀 Fazendo push...`);
  
  // Push commits and tags
  execSync('git push', { stdio: 'inherit' });
  execSync('git push --tags', { stdio: 'inherit' });
  
  console.log(`\n✅ Publicação iniciada!`);
  console.log(`   Tag: ${tagName}`);
  console.log(`   O GitHub Actions vai buildar e publicar automaticamente.`);
} catch (error) {
  console.error('\n❌ Erro ao fazer commit/push:', error.message);
  console.log('\nVocê pode fazer manualmente:');
  console.log(`1. git add packages/design-system/package.json`);
  console.log(`2. git commit -m "chore: bump @Juscash/design-system to ${newVersion}"`);
  console.log(`3. git tag v${newVersion}`);
  console.log(`4. git push && git push --tags`);
  process.exit(1);
}

