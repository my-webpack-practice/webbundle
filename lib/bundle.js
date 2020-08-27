const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
const rootPath = process.cwd();

const _isBlank = (t) => {
  if (!t) {
    // 排除 null undefined 0 ''
    return true;
  }
  if (typeof t === 'object') {
    return Object.keys(t).length === 0;
  }
  return false;
};

class Bundle {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run() {
    const modules = [];
    const entryModule = this.parse(this.entry);
    modules.push(entryModule);

    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const deps = module.deps;
      if (!_isBlank(deps)) {
        for (const key in deps) {
          if (!this.modules.includes(deps[key])) {
            modules.push(this.parse(deps[key]));
          }
        }
      }
    }

    // console.log(this.modules);
    // console.log(modules);

    // 将数组转换成对象
    let obj = {};
    modules.forEach((m) => {
      obj[m.file] = {
        deps: m.deps,
        code: m.code,
      };
    });

    this.assembly(obj);
  }

  /**
   * 文件解析
   * @param {string} filePath 文件路径
   * @returns
   * {
   *    file: './xxx/xxx.js', // 文件路径
   *    deps: {'./a.js': './src/a.js', './xx.js': './src/xx.js',},  // 依赖
   *    code: 'var a = "xxx"' // babel转换之后的源码
   * }
   */
  parse(filePath) {
    console.log('[entry]', filePath);
    this.modules.push(filePath);
    const deps = {};
    const code = fs.readFileSync(path.resolve(rootPath, filePath), 'utf-8');
    const ast = parser.parse(code, {
      sourceType: 'module',
    });

    traverse(ast, {
      ImportDeclaration({ node }) {
        let depName = node.source.value;
        depName = path.extname(depName) ? depName : depName + '.js';
        // './' windows平台不兼容，需要额外处理。
        deps[depName] = './' + path.join(path.dirname(filePath), depName);
      },
    });
    const { code: tCode } = babel.transformFromAstSync(ast, null, {
      presets: ['@babel/env'],
    });
    const obj = {
      file: filePath,
      deps,
      code: tCode,
    };
    // console.log(obj);
    return obj;
  }

  assembly(obj) {
    let p = this.output.path;
    if (!p) {
      p = path.join(rootPath, 'bundle');
    }
    const output = path.join(p, this.output.filename);
    // 如果输出目录不存在
    if (!fs.existsSync(path.dirname(output))) {
      // 创建目录
      fs.mkdirSync(path.dirname(output));
    }
    const content = `(function(){
      console.log('test');
    })(${JSON.stringify(obj)})`;

    fs.writeFileSync(output, content, 'utf-8');
  }
}

module.exports = Bundle;
