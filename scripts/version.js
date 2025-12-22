const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../packages/design-system/package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

const versionType = process.argv[2]; // 'patch', 'minor', ou 'major'

if (!versionType || !['patch', 'minor', 'major'].includes(versionType)) {
  console.error('Uso: node scripts/version.js [patch|minor|major]');
  process.exit(1);
}

// Parse current version
const [major, minor, patch] = packageJson.version.split('.').map(Number);

let newVersion;
switch (versionType) {
  case 'major':
    newVersion = `${major + 1}.0.0`;
    break;
  case 'minor':
    newVersion = `${major}.${minor + 1}.0`;
    break;
  case 'patch':
    newVersion = `${major}.${minor}.${patch + 1}`;
    break;
}

// Update version
packageJson.version = newVersion;

// Write back to file
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`✅ Versão atualizada: ${packageJson.name}@${newVersion}`);
console.log(`\nPróximos passos:`);
console.log(`1. git add packages/design-system/package.json`);
console.log(`2. git commit -m "chore: bump @Juscash/design-system to ${newVersion}"`);
console.log(`3. git tag v${newVersion}`);
console.log(`4. git push && git push --tags`);
console.log(`\nOu use: npm run version:publish`);

