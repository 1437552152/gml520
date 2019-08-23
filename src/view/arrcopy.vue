<!--
 * @Description: 
 * @version: 
 * @Company: 烽火通信
 * @Author: yeyifu
 * @Date: 2019-07-25 15:53:12
 * @LastEditors: yeyifu
 * @LastEditTime: 2019-07-25 18:37:56
 -->

<template>
  <div></div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 浅拷贝(对数组进行操作,如果原数组和改变之后的数组相同,则为浅拷贝,如果不同,则为深拷贝)
    arrcopy() {
      let arr1 = [1, 2, 3, 4];
      let arr2 = arr1;
      console.log(arr1, arr2);
      arr1[1] = 5;
      console.log(arr1, arr2); //数组修改,直接影响arr2的值
      arr1.pop();
      console.log(arr1, arr2);
      // debugger;
    },
    //for 循环实现数组的深拷贝
    copyArr(arr) {
      let res = [];
      for (let i = 0; i < arr.length; i++) {
        res.push(arr[i]);
      }
      return res;
    },
    deepcopy() {
      let arr = [1, 2, 3, 4, 5];
      let arr3 = this.copyArr(arr);
      console.log(arr, arr3);
      arr.pop();
      console.log(arr, arr3);
      // debugger;
    },
    //slice 方法实现数组的深拷贝
    slice() {
      let arr5 = [1, 2, 3, 4, 5];
      let arr6 = arr5.slice(0);
      arr5[2] = 5;
      console.log(arr5, arr6);
    },
    //concat 方法实现数组的深拷贝
    concat() {
      let arr7 = [1, 2, 3, 4, 5];
      let arr8 = arr7.concat();
      arr7[2] = 5;
      console.log(arr7, arr8);
    },
    //ES6扩展运算符实现数组的深拷贝
    three() {
      let arr9 = [1, 2, 3, 4, 5];
      let [...arr10] = arr9;
      arr9[2] = 5;
      console.log(arr9, arr10);
    },
    //for循环实现对象的深拷贝
    copyObj(obj) {
      let res = {};
      for (let key in obj) {
        res[key] = obj[key];
      }
      return res;
    },
    object() {
      let obj = {
        name: "FungLeo",
        sex: "man",
        old: "18"
      };
      let obj2 = this.copyObj(obj);
      console.log("obj2==>", obj2);
    },
    //转换成json再转换成对象实现对象的深拷贝(这种方式真正的深拷贝,不管经过多少层级,都是深拷贝)
    json() {
      let obj = {
        name: "FungLeo",
        sex: "man",
        old: "18"
      };
      let obj2 = JSON.parse(JSON.stringify(obj));
      obj.old = "22";
      console.log(obj, obj2);
      // debugger;
    },
    //  扩展运算符实现对象的深拷贝
    jsontree() {
      let obj = {
        name: "FungLeo",
        sex: "man",
        old: "18"
      };
      let { ...obj2 } = obj;
      obj.old = "22";
      console.log(obj, obj2);
      // debugger;
    },
    // 解构的方式,第二层的拷贝,导致结果一样,变成浅拷贝
    jiegou() {
      let obj1 = {
        a: {
          b: 5
        }
      };
      let { ...obj2 } = obj1;
      obj1.a.b = 6;
      console.log(obj1, obj2);
      // debugger;
    },

    // 转换成json对象(真正的深拷贝)
    stringify() {
      let obj = {
        a: {
          b: {
            c: {
              d: {
                e: 5
              }
            }
          }
        }
      };
      let obj2 = JSON.parse(JSON.stringify(obj));
      obj.a.b.c.d.e = 6;
      console.log(obj, obj2);
      // debugger;
    },
    getS() {
      let obj = {
        a: {
          a1: {
            a2: 1
          }
        },
        b: {
          b1: {
            b2: 2
          }
        }
      };
      let obj2 = JSON.parse(JSON.stringify(obj));
      obj.a.a1.a2 = 3;
      obj.b.b1.b2 = 4;
      // 拷贝之后原数组变成3,4
      console.log(obj, obj2);
      // debugger;
    }
  },
  created() {
    this.arrcopy();
    this.deepcopy();
    this.slice();
    this.concat();
    this.three();
    this.object();
    this.json();
    this.jsontree();
    this.jiegou();
    this.stringify();
    this.getS();

    push((array, ...items) => {
      array.push(...items);
    });
    add((x, y) => {
      return x + y;
    });
    let numbers = [4, 38];
    add(...numbers); // 42
    console.log(add);
  },
  mounted() {}
};
</script>
<style  scoped  lang="less">
@import "../styles/contact/index.less";
</style>