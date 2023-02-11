// Based on and inspired by https://github.com/matthewharwood/deno-preact

import {
    ensureDir,
    copy as _copy,
} from "fs";
import {getStaticTargets, renderTemplate} from '~/util.ts';
import {Home} from "~/pages/Home/mod.ts";
import * as Posts from '~/posts/mod.ts';


const pwd = Deno.cwd()
const DIST_DIR = `${pwd}/docs`;

const getStandardTitle = (pageTitle: string) => `${pageTitle} - Co/de:baser/`


export async function render() {
  await ensureDir(DIST_DIR);
  await ensureDir(`${DIST_DIR}/static`);
  await copy(`${pwd}/src/styles`, `${DIST_DIR}/static/styles`);
  await copy(`${pwd}/src/images`, `${DIST_DIR}/static/images`);

  const documentTemplate = await Deno.readTextFile(`${pwd}/src/html/document.html`)

  const pages = [
    {filePath: 'index', content: renderTemplate(documentTemplate, {title: getStandardTitle("home"), content: Home()})},
    {filePath: 'post/deno', content: renderTemplate(documentTemplate, {title: getStandardTitle("Deno"), content: Posts.Deno.Post()})},
    {filePath: 'post/persistent_http', content: renderTemplate(documentTemplate, {title: getStandardTitle("Persistent HTTP"), content: Posts.PersistHttp.Post()})},
  ];

  for (const target of getStaticTargets()) {
    await copy(target.src, `${DIST_DIR}${target.uri}`)
  }

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

async function copy(from: string, to: string) {
  console.log(`Copy ${from} to ${to}`)
  await _copy(from, to, {overwrite: true});
}

async function write(path: string, content: string) {
  console.log(`Render ${path}`)
  await Deno.writeTextFile(path, content);
}
