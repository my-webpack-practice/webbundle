#!/usr/bin/env node
const path = require('path');
const rootPath = process.cwd();
const config = require(path.resolve(rootPath, 'webbundle.config'));
const Bundle = require('../lib/bundle');
const bd = new Bundle(config);

bd.run();
