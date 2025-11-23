#!/usr/bin/env node

/**
 * Script para criar um novo componente rapidamente
 * 
 * Uso:
 *   node scripts/add-component.js Button
 *   node scripts/add-component.js Input --with-styles
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const componentName = args.find(arg => !arg.startsWith('--')) || args[0];
const withStyles = args.includes('--with-styles') || args.includes('--styles');

if (!componentName) {
  console.error('❌ Erro: Nome do componente é obrigatório');
  console.log('\nUso: node scripts/add-component.js ComponentName [--with-styles]\n');
  process.exit(1);
}

const COMPONENTS_DIR = path.join(__dirname, '../packages/components/src/components');
const COMPONENT_DIR = path.join(COMPONENTS_DIR, componentName);
const COMPONENT_INDEX = path.join(COMPONENT_DIR, 'index.ts');
const COMPONENT_FILE = path.join(COMPONENT_DIR, `${componentName}.tsx`);
const COMPONENT_TYPES = path.join(COMPONENT_DIR, `${componentName}.types.ts`);
const COMPONENT_STYLES = path.join(COMPONENT_DIR, `${componentName}.styles.ts`);

function log(message) {
  console.log(`\n✨ ${message}\n`);
}

function createComponentFiles() {
  // Criar diretório
  if (fs.existsSync(COMPONENT_DIR)) {
    console.error(`❌ Componente ${componentName} já existe!`);
    process.exit(1);
  }
  
  fs.mkdirSync(COMPONENT_DIR, { recursive: true });
  log(`Criando componente: ${componentName}`);

  // Componente principal
  const componentContent = `import React from 'react';
import { ${componentName}Props } from './${componentName}.types';
${withStyles ? `import { Styled${componentName} } from './${componentName}.styles';\n` : ''}

/**
 * ${componentName} Component
 * 
 * TODO: Adicionar descrição do componente
 */
export const ${componentName}: React.FC<${componentName}Props> = ({
  children,
  ...props
}) => {
  return (
    ${withStyles ? `<Styled${componentName} {...props}>` : `<div {...props}>`}
      {children}
    ${withStyles ? `</Styled${componentName}>` : '</div>'}
  );
};
`;

  fs.writeFileSync(COMPONENT_FILE, componentContent);

  // Types
  const typesContent = `import { ComponentProps } from '../../types';

export interface ${componentName}Props extends ComponentProps {
  children?: React.ReactNode;
  // TODO: Adicionar props específicas do componente
}
`;

  fs.writeFileSync(COMPONENT_TYPES, typesContent);

  // Styles (se solicitado)
  if (withStyles) {
    const stylesContent = `import styled from '@emotion/styled';
import { designTokens } from '../../themes';

export const Styled${componentName} = styled.div\`
  // Estilos customizados usando design tokens
  padding: \${designTokens.spacing.md}px;
  border-radius: \${designTokens.borderRadius.md}px;
\`;
`;

    fs.writeFileSync(COMPONENT_STYLES, stylesContent);
  }

  // Index
  const indexContent = `export { ${componentName} } from './${componentName}';
export type { ${componentName}Props } from './${componentName}.types';
`;

  fs.writeFileSync(COMPONENT_INDEX, indexContent);

  log(`Arquivos criados em: ${COMPONENT_DIR}`);
}

function updateExports() {
  const componentsIndex = path.join(COMPONENTS_DIR, 'index.ts');
  let content = fs.readFileSync(componentsIndex, 'utf-8');

  // Adicionar export se não existir
  const exportLine = `export { ${componentName} } from './${componentName}';`;
  
  if (!content.includes(exportLine)) {
    // Remover comentário de exemplo se existir
    content = content.replace(/\/\/ Exemplo futuro:.*\n/g, '');
    
    // Adicionar export
    if (content.trim() === '') {
      content = exportLine + '\n';
    } else {
      content += '\n' + exportLine + '\n';
    }

    fs.writeFileSync(componentsIndex, content);
    log('Export adicionado em components/index.ts');
  }
}

function updateMainIndex() {
  const mainIndex = path.join(__dirname, '../packages/components/src/index.ts');
  let content = fs.readFileSync(mainIndex, 'utf-8');

  const exportLine = `export { ${componentName} } from './components/${componentName}';`;
  
  if (!content.includes(exportLine)) {
    // Adicionar após os comentários de exemplo
    const lines = content.split('\n');
    const insertIndex = lines.findIndex(line => line.includes('// export {'));
    
    if (insertIndex !== -1) {
      lines.splice(insertIndex, 0, exportLine);
    } else {
      lines.push(exportLine);
    }

    fs.writeFileSync(mainIndex, lines.join('\n'));
    log('Export adicionado em src/index.ts');
  }
}

function main() {
  createComponentFiles();
  updateExports();
  updateMainIndex();
  
  console.log('\n✅ Componente criado com sucesso!');
  console.log('\n📝 Próximos passos:');
  console.log(`   1. Implementar a lógica em ${COMPONENT_FILE}`);
  console.log(`   2. Adicionar props em ${COMPONENT_TYPES}`);
  if (withStyles) {
    console.log(`   3. Customizar estilos em ${COMPONENT_STYLES}`);
  }
  console.log(`   4. Adicionar exemplo na documentação (apps/docs/src/pages/ComponentsPage.tsx)`);
  console.log(`   5. Testar: pnpm dev\n`);
}

main();

