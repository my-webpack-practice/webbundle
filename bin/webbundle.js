#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const rootPath = process.cwd();
const config = require(path.resolve(rootPath, 'webbundle.config'));

// const { entry, output } = config;
const entryPath = path.resolve(rootPath, config.entry);

console.log('[entry]', entryPath);

const entryCode = fs.readFileSync(entryPath, 'utf-8');
const entryCodeAst = parser.parse(entryCode, {
  sourceType: 'module',
});

console.log('[traverse]', traverse);

console.log(entryCode);
console.log('\n\n');
console.log(traverse(entryCodeAst));
console.log('\n\n');
// console.log(entryCodeAst.program.body);
