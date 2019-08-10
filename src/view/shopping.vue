<template>
  <div>
    <div class="page-shopping-cart">
      <h4 class="cart-title">购物清单</h4>
      <!-- 标题 -->
      <div class="cart-product-title clearfix">
        <div class="td-check fl">
          <!-- 当切换到check-true类名时就调用全选函数 -->
          <input
            type="checkbox"
            v-model="checked"
            class="check-span fl check-all"
            @click="checkAll"
          />
          <!-- 选择框 -->
          全选
        </div>
        <div class="td-product fl">商品</div>
        <div class="td-num fl">数量</div>
        <div class="td-price fl">单价(元)</div>
        <div class="td-total fl">金额(元)</div>
        <div class="td-do fl">操作</div>
      </div>
      <!-- 内容 -->
      <div class="cart-product clearfix">
        <table>
          <tbody>
            <tr v-for="(item,index) in productList">
              <!-- 选中商品 -->
              <td class="td-check">
                <input type="checkbox" v-model="checkList" :value="item.id" class="check-span" />
              </td>
              <!-- 商品信息 -->
              <td class="td-product">
                <img :src="item.imgPic" width="98" height="98" alt />
                <div class="product-info">
                  <h6></h6>
                  <p>
                    品牌:
                    <span v-for="part in item.gifts" v-text="part.partName"></span>
                  </p>
                </div>
                <div class="clearfix"></div>
              </td>
              <!-- 商品数量 -->
              <td class="td-num">
                <div class="product-num">
                  <a
                    href="javascript:;"
                    class="num-reduce num-do fl"
                    @click="changeMoney(item,-1)"
                  >-</a>
                  <input type="text" class="num-input" value="0" v-model="item.amount" />
                  <a href="javascript:;" class="num-add num-do fr" @click="changeMoney(item,1)">+</a>
                </div>
              </td>
              <!-- 商品单价 -->
              <td class="td-price">
                <p class="red-text">
                  <span class="price-text">{{item.price | fomatMoney}}</span>
                </p>
              </td>
              <!-- 商品总价 -->
              <td class="td-total">
                <p class="red-text">
                  <span class="price-text">{{item.price*item.amount | money('元')}}</span>
                </p>
              </td>
              <!-- 删除商品 -->
              <td class="td-do">
                <a href="javascript:;" class="product-delete" @click="del(index)">删除</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 最后一行统计 -->
      <div class="cart-product-info">
        <a href="javascript:;" class="delete-product">
          <label class="delt" @click="delAll()">删除所选商品</label>
        </a>
        <a href="#" class="keep-shopping">
          <label class="delt">继续购物</label>
        </a>
        <a href="javascript:;" class="fr btn-buy">去结算</a>
        <a href="javascript:;" class="fr product-total">
          <span></span>
        </a>
        <!-- 结算总价 -->
        <a href="javascript:;" class="fr check-num">
          <span></span>件商品总计（不含运费）:
          <span>{{totalMoney}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import shopList from "@/data/list.json";
export default {
  data() {
    return {
      totalMoney: 0,
      shopList: shopList,
      productList: [],
      // checkAllFlag: false,
      delFlag: false,
      checked: false,
      checkList: []
    };
  },
  // 过滤器处理特殊字符串
  filters: {
    fomatMoney(value) {
      return "￥" + value.toFixed(2);
    },
    Money(value, type) {
      return "￥" + value.toFixed(2) + type;
    }
  },
  methods: {
    // 获取数据
    getProduct(params) {
      this.productList = shopList.result.list;
      console.log(this.productList);
    },
    // 数量加减
    changeMoney(product, way) {
      if (way > 0) {
        product.amount++;
      } else {
        product.amount--;
        if (product.amount < 2) {
          product.amount = 1;
        }
      }
      this.calcTotalPrice();
    },
    // 全选
    checkAll() {
      var _this = this;
      console.log(_this.checkList);
      console.log(_this.checked);
      this.$nextTick(function() {
        // DOM 现在更新了
        console.log(_this.checked);
      });
      if (_this.checked) {
        //实现反选
        _this.checkList = [];
      } else {
        //实现全选
        _this.checkList = [];
        this.productList.forEach((item, index) => {
          _this.checkList.push(item.id);
          console.log(item.id);
          this.calcTotalPrice();
        });
      }
    },
    // 计算总价
    calcTotalPrice() {
      var _this = this;
      this.totalMoney = 0;
      this.productList.forEach(function(item, index) {
        if (_this.checked) {
          console.log(_this.checked);
          _this.totalMoney += item.price * item.amount;
        }
      });
    },
    // 删除商品
    del(index) {
      this.productList.splice(index, 1);
    },
    delAll() {
      this.productList.splice(0, this.productList.length);
    }
    //
  },
  created() {
    this.getProduct();
  },
  watch: {
    checkList: {
      handler(val, oldVal) {
        if (val.length === this.shopList.result.list.length) {
          console.log(val.length);
          this.checked = true;
        } else {
          this.checked = false;
        }
        this.calcTotalPrice();
      },
      deep: true
    }
  }
};
</script>
<style  scoped  lang="less">
@import "../styles/shopping/demo.less";
</style>
