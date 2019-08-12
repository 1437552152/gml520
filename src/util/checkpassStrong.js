 export default function checkStrong(sValue) {
   let modes;
   //正则表达式验证符合要求的
   if (sValue.length <1) {
     modes = 0;
   }
   // 含数字非纯数字
   else if (/\d/.test(sValue)) {
     modes = 1;
   }
   // 含小写字母非纯
   else if (/[a-z]/.test(sValue)) {
     modes = 2;
   }
   // 含大写字母
   else if (/[A-Z]/.test(sValue)) {
     modes = 3;
   }
   // 含特殊字符
   else {
     modes = 4;
   }
   return modes;
 }
