<template>
  <div>
    <!-- <Button type="primary" @click="reflash">刷新</Button> -->
    <!-- 修改 -->
    <Modal v-model="UPModal" title="修改产品类型" @on-ok="okUP" @on-cancel="cancel">
      <Form :model="formItem" :label-width="100">
        <FormItem label="产品标题">
          <Input v-model="formItem.title" placeholder="请填写产品标题..." />
        </FormItem>
        <FormItem label="类型排序">
          <Input v-model="formItem.orderBy" />
        </FormItem>
        <FormItem label="上传图片" prop="img">
          <div class="acc_sc">
            <img id="aliImg" :src="img" style="width: 200px;height:170px;"/>
            <Upload
              ref="upload"
              name="picUrl"
              :show-upload-list="false"
              :on-success="aliHandleSuccess"
              :action="uploadUrl"
              enctype="multipart/form-data"
            >
              <Button
                type="primary"
                icon="ios-cloud-upload-outline"
                style="opacity: 0;width: 200px;height: 170px;margin-top: -200px;"
              >上传图片</Button>
            </Upload>
          </div>
        </FormItem>
      </Form>
    </Modal>
    <!-- 新增 -->
    <Modal v-model="addModal" title="添加产品类型" @on-ok="ok" @on-cancel="cancel">
      <Form :model="formItem" :label-width="100">
        <FormItem label="产品标题">
          <Input v-model="formItem.title" placeholder="请填写产品标题..." />
        </FormItem>
        <FormItem label="类型排序">
          <Input v-model="formItem.orderBy" />
        </FormItem>
        <FormItem label="上传图片" prop="img">
          <div class="acc_sc">
            <img id="aliImg" :src="img" style="width: 200px;height:170px;" />
            <Upload
              ref="upload"
              name="picUrl"
              :show-upload-list="false"
              :on-success="aliHandleSuccess"
              :action="uploadUrl"
              enctype="multipart/form-data"
            >
              <Button
                type="primary"
                icon="ios-cloud-upload-outline"
                style="opacity: 0;width: 200px;height: 170px;margin-top: -200px;"
              >上传图片</Button>
            </Upload>
          </div>
        </FormItem>
      </Form>
    </Modal>
    <!-- 刷新 -->
    <Button type="primary" @click="reflash">刷新</Button>
    <!-- 新增 -->
    <Button type="primary" @click="add" style="float:right">增加</Button>
    <!-- 表格 -->
    <div class="clearfix"></div>
    <Row class="margin-top-10">
      <Table :columns="tableTitle" :data="tableData" />
    </Row>
    <!-- 分页 -->
    <Row class="pageWrapper">
      <Page :total="total" :current="current" show-total :page-size="10" @on-change="changePage"></Page>
    </Row>
  </div>
</template>
<script>
import admin from "@/lib/api";
import Qs from "qs";
import Host from "@/lib/env";

export default {
  data() {
    return {
      tableTitle: [
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "产品类型图标",
          key: "img",
          align: "center",
          render: (h, params) => {
            const pic = params.row.img;
            let text = "";
            return h("div", [
              h("img", {
                attrs: {
                  src: pic
                },
                style: {
                  width: "100px",
                  height: "70px"
                }
              }),
              h("span", {}, text)
            ]);
          }
        },
        {
          title: "排序",
          key: "orderBy",
          align: "center",
          render: (h, params) => {
            let tmpStr = "";
            if (params.row.orderBy > 1) {
              tmpStr = "未通过";
            } else if (params.row.orderBy == 1) {
              tmpStr = "已通过";
            } else {
              tmpStr = "正在审核";
            }
            return h(         
              "span",
              {
                style: {
                  color:
                    params.row.orderBy > 1
                      ? "#ed3f14"
                      : params.row.orderBy == 1
                      ? "#19be6b"
                      : "#2d8cf0"
                }
              },
              tmpStr
            );
          }
        },
        {
          title: "创建时间",
          key: "time",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 240,
          key: "id",
          render: (h, params) => {
            const id = params.row.id;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  class: {
                    // disabled: authStatus === 0 ? false : true
                  },
                  on: {
                    click: () => {
                      this.godelete(id);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "20px"
                  },
                  class: {
                    // disabled: authStatus === 0 ? false : true
                  },
                  on: {
                    click: () => {
                      this.id = id;
                      this.goupdate(id);
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      tableData: [],
      UPModal: false,
      addModal: false,
      formItem: {
        title: "",
        orderBy: ""
      },
      img: require("../images/talkingdata.png"),
      id: "",
      total: 1,
      currentPageIdx: 1,
      current: 1,
      uploadUrl: Host + "upload"
    };
  },

  methods: {
    // 产品类型请求,展示数据
    gettableList(pageNo = "1", pageSize = "10") {
      console.log("admin==>", admin.productConfig);
      this.$http
        .post(admin.productConfig, {
          pageNo: 1,
          pageSize: 10
        })
        .then(res => {
          console.log(res);
          this.tableData = res.data.data;
          this.total = res.data.total;
          this.current = res.data.currentPage;
          this.$Spin.hide();
          console.log(this.tableData);
        })
        .catch(res => {});
    },
    // 修改接口,数据回显
    showtable(id) {
      console.log("admin==>", admin.detail);
      // 后台列表请求
      this.$http
        .post(admin.detail, {
          id: id
        })
        .then(res => {
          console.log(res);
          this.img = res.data.data[0].img;
          this.formItem.title = res.data.data[0].title;
          this.formItem.orderBy = res.data.data[0].orderBy;
        })
        .catch(res => {});
    },

    // 修改
    goupdate(id) {
      this.UPModal = true;
      this.showtable(id);
    },
    // 取消按钮
    cancel() {
      this.UPModal = false;
    },
    // 点击确定时
    ok() {
      let params = [];
      params["img"] = this.img || "";
      params["title"] = this.formItem.title;
      params["orderBy"] = this.formItem.orderBy;
      // 后台列表请求
      this.$http
        .post(admin.add, params)
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success(res.data.msg);
            this.gettableList({ pageNo: this.currentPageIdx, pageSize: 10 });
          } else {
            this.$Message.error(res.data.msg);
            this.gettableList({ pageNo: this.currentPageIdx, pageSize: 10 });
          }
        })
        .catch(res => {});
    },
    // 确定按钮,
    okUP() {
      let params = [];
      params["img"] = this.img || "";
      params["title"] = this.formItem.title;
      params["orderBy"] = this.formItem.orderBy;
      params["id"] = this.id;
      console.log("admin==>", admin.update);
      // 后台列表请求
      this.$http
        .post(admin.update, params)
        .then(res => {
          console.log(res);
          if (res.data.status == 200) {
            this.$Message.success(res.data.msg);
            this.gettableList({ pageNo: this.currentPageIdx, pageSize: 10 });
          } else {
            this.$Message.error(res.data.msg);
            this.gettableList({ pageNo: this.currentPageIdx, pageSize: 10 });
          }
        })
        .catch(res => {});
    },
    // 删除按钮
    godelete(id) {
      this.$http
        .post(admin.delete, {
          id: id
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 0) {
            this.$Message.success(res.data.msg);
            this.gettableList({ pageNo: this.currentPageIdx, pageSize: 10 });
          } else {
            this.$Message.error(res.data.msg);
            this.gettableList({ pageNo: this.currentPageIdx, pageSize: 10 });
          }
        })
        .catch(res => {});
    },
    // 当前页
    changePage(pageIndex) {
      this.currentPageIdx = pageIndex;
      let obj = {
        pageNo: pageIndex,
        pageSize: 10
      };
      this.getData(obj);
    },
    // 刷新数据
    reflash() {
      this.$Spin.show({
        render: h => {
          return h("div", [
            h("Icon", {
              class: "demo-spin-icon-load",
              props: {
                type: "ios-loading",
                size: 18
              }
            }),
            h("div", "Loading")
          ]);
        }
      });
      this.gettableList({ pageNo: this.currentPageIdx, pageSize: 10 });
    },
    // 新增按钮,先清空数据,再填写
    add() {
      this.addModal = true;
      this.img = require("../images/talkingdata.png");
      this.formItem.title = "";
      this.formItem.orderBy = "";
    },
    aliHandleSuccess(res, file) {
      console.log(res);
      this.img = Host + res.ret_code;
    }
  },
  created() {
    this.gettableList({ pageNo: this.currentPageIdx, pageSize: 10 });
  }
};
</script>