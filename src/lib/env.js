const { NODE_ENV } = process.env;

console.log("111",NODE_ENV)

const Host =
NODE_ENV === 'production' ? 'http://47.107.180.202:8081/admin/' : 'http://47.107.180.202:8081/admin/';
// NODE_ENV === 'production' ? 'http://47.107.180.202:8081/user/' : 'http://47.107.180.202:8081/user/';

export default Host;