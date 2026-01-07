import path from 'path';
import fs from 'fs-extra';
import { CSS_GENERATED_HEADER } from './config.mjs';

export async function prependCssHeader(filePath: string): Promise<void> {
  const content = await fs.readFile(filePath, 'utf8');
  if (!content.startsWith(CSS_GENERATED_HEADER.trim())) {
    await fs.writeFile(filePath, CSS_GENERATED_HEADER + content, 'utf8');
  }
}

export async function generateIndexCss(outputDirectory: string): Promise<void> {
  const cssFiles: string[] = [];

  async function findCssFiles(
    dir: string,
    relativePath: string = '',
  ): Promise<void> {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativeFilePath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        await findCssFiles(fullPath, relativeFilePath);
      } else if (
        entry.isFile() &&
        entry.name.endsWith('.css') &&
        entry.name !== 'index.css'
      ) {
        cssFiles.push(`./${relativeFilePath.replace(/\\/g, '/')}`);
      }
    }
  }

  await findCssFiles(outputDirectory);

  const categoryOrder = ['primitive', 'semantic', 'component'];
  cssFiles.sort((a, b) => {
    const aCategory = a.split('/')[1] || '';
    const bCategory = b.split('/')[1] || '';
    const aIndex = categoryOrder.indexOf(aCategory);
    const bIndex = categoryOrder.indexOf(bCategory);

    if (aIndex !== bIndex) {
      return aIndex - bIndex;
    }

    return a.localeCompare(b);
  });

  const imports =
    cssFiles.map((file) => `@import "${file}";`).join('\n') + '\n';
  const indexPath = path.join(outputDirectory, 'index.css');
  await fs.writeFile(indexPath, CSS_GENERATED_HEADER + imports, 'utf8');
}
