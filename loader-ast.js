// AST
const parser = require("@babel/parser")
const traverse = require("@babel/traverse").default
const generator = require('@babel/generator').default

module.exports =  function(source) {
  // 生成ast
  let ast = parser.parse(source, {
    sourceType: 'module', // 支持 es6 module
  })
  let add = parser.parse('window.Slardar && Slardar(123)').program.body[0]
  // 遍历asr
  traverse(ast, {
    CallExpression(path) {
      // 对语法树中特定的节点进行操作 参考@babel/types （特定节点类型）
      // console.log('CallExpression', path)
    },
    FunctionDeclaration: function(path) {
      // 对语法树中特定的节点进行操作 参考@babel/types （特定节点类型）
      // FunctionDeclaration 特定节点
      // console.log('FunctionDeclaration',path)
    },
    // .....
    enter(path) {
      // 替换变量a的值
      if (path.node.type === 'VariableDeclarator') {
        if(path.node.id.name === 'a') {
          path.node.init.value = 'aaa'
        }
      }
      // catch中添加方法
      if (path.node.type === 'CatchClause') {
        path.node.body.body.unshift(add)
      }
    },
    exit(path) {
      // 退出节点
      // console.log(`  exit ${path.type}(${path.key})`)
    }
  })
  const newcode = generator(ast,{}).code
  console.log(newcode)

  return source;
};