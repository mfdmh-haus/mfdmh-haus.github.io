// Based on and inspired by https://github.com/matthewharwood/deno-preact

import {
    ensureDir,
    copy,
} from "fs";
import {renderTemplate} from '~/util.ts';
import {Home} from "~/pages/Home/mod.ts";
import * as Posts from '~/posts/mod.ts';


const DIST_DIR = `${Deno.cwd()}/docs`;
const STATIC = `${Deno.cwd()}/static`;
await ensureDir(DIST_DIR);
await copy(STATIC, `${DIST_DIR}/static`, {overwrite: true});

const documentTemplate = await Deno.readTextFile(`${Deno.cwd()}/src/html/document.html`)

const getStandardTitle = (pageTitle: string) => `${pageTitle} - Canfield R&D`

const pages = [
    {filePath: 'index', content: renderTemplate(documentTemplate, {title: getStandardTitle("home"), content: Home()})},
    {filePath: 'post/deno', content: renderTemplate(documentTemplate, {title: getStandardTitle("Deno"), content: Posts.Deno.Post()})},
    {filePath: 'post/persistent_http', content: renderTemplate(documentTemplate, {title: getStandardTitle("Persistent HTTP"), content: Posts.PersistHttp.Post()})},
];

export async function render() {
  for await (const p of pages) {
    if (p.filePath === 'index') {
      await write(`${DIST_DIR}/index.html`, p.content);
    } else {
      const deepDistDir = `${DIST_DIR}/${p.filePath}`;
      await ensureDir(deepDistDir);
      await write(`${deepDistDir}/index.html`, p.content);
    }
  }
}


async function write(path: string, content: string) {
  console.log(`Render ${path}`)
  await Deno.writeTextFile(path, content);
}
