const { NODE_ENV } = process.env;

console.log("111",NODE_ENV)

const Host =
NODE_ENV === 'production' ? 'http:localhost:8080/' : 'http://47.107.180.202:8081/user/';

export default Host;