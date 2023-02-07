#!/usr/bin/env -S deno run --allow-write --allow-read
// Based on and inspired by https://github.com/matthewharwood/deno-preact

import {
    ensureDir,
    copy,
} from "fs";
import {renderTemplate} from '~/util.ts';
import {Home} from "~/pages/Home/mod.ts";


const DIST_DIR = `${Deno.cwd()}/docs`;
const STATIC = `${Deno.cwd()}/static`;
await ensureDir(DIST_DIR);
await copy(STATIC, `${DIST_DIR}/static`, {overwrite: true});

const documentTemplate = await Deno.readTextFile(`${Deno.cwd()}/src/html/document.html`)

const getStandardTitle = (pageTitle: string) => `${pageTitle} - 2nd Thought`

const pages = [
    {filePath: 'index', content: renderTemplate(documentTemplate, {title: getStandardTitle("home"), content: Home()})},
];

for await (const p of pages) {
    if (p.filePath === 'index') {
        await Deno.writeTextFile(`${DIST_DIR}/index.html`, p.content);
    } else {
        const deepDistDir = `${DIST_DIR}/${p.filePath}`;
        await ensureDir(deepDistDir);
        await Deno.writeTextFile(`${deepDistDir}/index.html`, p.content);
    }
}


