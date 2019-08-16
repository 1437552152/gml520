
// 1
// var a='111';
// export default a;

// 2
// export const a='111';

// 3
// var a='111';
// var b='222';
// export {a,b}

// 特殊
var a='111';
var b='222';
export {a as x,b as y};

// 4
// var a='111';
// var b='222';
// export default {a,b}