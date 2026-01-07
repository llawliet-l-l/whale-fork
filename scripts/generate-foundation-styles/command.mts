import { buildSemantic } from './semantic/index.mjs';
import { buildComponent } from './component/index.mjs';
import { OUTPUT_DIRECTORY } from './config.mjs';
import { generateIndexCss } from './utils.mjs';
import { buildPrimitives } from './primitive/index.mjs';

async function run() {
  console.log('\n🔨 Start building foundations...\n');

  await buildPrimitives();
  await buildSemantic();
  await buildComponent();

  await generateIndexCss(OUTPUT_DIRECTORY);

  console.log('\n🎉 Foundation build completed successfully!\n');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
