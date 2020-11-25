// 简单粗暴字符串
module.exports =  function(source) {
  console.log(source)
  source += `let a = '123'`
  return source;
};