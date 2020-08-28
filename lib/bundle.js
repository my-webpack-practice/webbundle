const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');
// const UglifyJS = require('uglify-js');
const { minify } = require('terser');
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

    console.log(this.modules);
    // console.log(modules);

    // 将数组转换成对象
    let modulesMap = {};
    modules.forEach((m) => {
      modulesMap[m.file] = m.code;
      // modulesMap[m.file] = {
      //   deps: m.deps,
      //   code: m.code,
      // };
    });

    this.assembly(modulesMap);
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

    function resolvePath(requirePath) {
      if (path.extname(requirePath)) {
        // 带后缀引入，如：import './src/xxxx.js'
        return path.join(path.dirname(filePath), requirePath);
      } else {
        // 不带后缀引入，如：import './src/xxxx'，有两种情况：
        // import './src/xxxx.js' 或 import './src/xxxx/index.js'
        let originPath = path.join(path.dirname(filePath), requirePath + '.js');
        let indexPath = path.join(path.dirname(filePath), requirePath, 'index.js');
        if (fs.existsSync(originPath)) {
          return originPath;
        } else if (fs.existsSync(indexPath)) {
          return indexPath;
        } else {
          throw new Error(`模块引入错误：${requirePath}`);
        }
      }
    }

    traverse(ast, {
      ImportDeclaration({ node }) {
        const requireName = node.source.value;
        // './' windows平台不兼容，需要额外处理。
        deps[requireName] = resolvePath(requireName);
        node.source.value = resolvePath(requireName);
      },
    });
    const { code: tCode } = babel.transformFromAstSync(ast, null, {
      presets: ['@babel/env'],
    });
    const mod = {
      file: filePath,
      deps,
      code: tCode,
    };
    return mod;
  }

  async assembly(modulesMap) {
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

    const content = `
(function(modules){
  
  function require(moduleId) {
    var exports = {};
    eval(modules[moduleId]);
    return exports;
  }
  
  // 执行入口文件
  eval(modules['${this.entry}']);

})(${JSON.stringify(modulesMap)})
`;
    const { code } = await minify(content);
    // console.log(code);
    fs.writeFileSync(output, code, 'utf-8');
  }
}

module.exports = Bundle;
