<template>
  <div>
    <Button type="info" @click="add">新增</Button>
    <Table border ref="selection" stripe height="400" :columns="columns1" :data="data1"></Table>
    <!-- 查看 -->
    <Modal v-model="modal1" title="查看信息" @on-ok="ok" @on-cancel="cancel">
      <p>{{this.data1.roleId}}</p>
        <p>{{this.data1.roleName}}</p>
      <p>{{this.data1.remark}}</p>
    </Modal>
  </div>
</template>
<script>
import admin from "@/lib/api";
import Qs from "qs";
export default {
  data() {
    return {
      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },

        {
          title: "ID",
          key: "roleId",
          align: "center",
          render: (h, data1) => {
            return h("div", [h("strong", data1.row.roleId)]);
          },
          // sortable: true
          filters: [
            {
              label: "Greater than 2",
              value: 1
            },
            {
              label: "Less than 1",
              value: 2
            }
          ],
          filterMultiple: false,
          filterMethod(value, row) {
            if (value === 1) {
              return row.age >= 2;
            } else if (value === 2) {
              return row.age < 2;
            }
          }
        },
        {
          title: "角色名称",
          key: "roleName",
          align: "center",
          render: (h, data1) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", data1.row.roleName)
            ]);
          }
        },
        {
          title: "备注",
          key: "remark",
          align: "center",
          render: (h, data1) => {
            return h("div", [h("strong", data1.row.remark)]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 260,
          align: "center",
          render: (h, data1) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.update();
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.view();
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.delete();
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      data1: [],
      modal1:false
      //   params: {
      //     pageNo: 1,
      //     pageSize: 10
      //   }
    };
  },

  methods: {
    // add(index) {
    //   this.$Modal.info({
    //     title: "新增信息",
    //     content: `ID: <input v-model="this.data1[index].roleId"><br>角色名称: <input v-model="this.data1[index].roleName"><br>备注: <input v-model="this.data1[index].remark">`
    //   });
    //   this.gettableList()
    // },

    // update(index) {
    //   this.$Modal.info({
    //     title: "修改信息",
    //     content: `ID: <input v-model="this.data1[index].roleId"><br>角色名称: <input v-model="this.data1[index].roleName"><br>备注: <input v-model="this.data1[index].remark">`
    //   });
    // },

    view() {
     this.modal1 = true;
     console.log(this.data1.roleId);
    },
    ok() {
      // this.$Message.info("Clicked ok");
    },
    cancel() {
      // this.$Message.info("Clicked cancel");
    },

    // delete(index) {
    //   this.data1.splice(index, 1);
    //   this.$Modal.confirm({
    //     //  title: '确定删除吗',
    //     content: "<p>是否删除该信息</p>",
    //     onOk: () => {
    //       this.$Message.info("删除成功");
    //     },
    //     onCancel: () => {
    //       this.$Message.info("取消删除");
    //     }
    //   });
    // },
    // 用户列表请求
    gettableList() {
      console.log("admin==>", admin.news);
      // 后台列表请求
      this.$http
        .post(admin.useRolelist)
        .then(res => {
          console.log(res);
          this.data1 = res.data.data;
          console.log(this.data1);
        })
        .catch(res => {
          //   this.$Message.error(res.data.msg);
        });
    },
    // 新增接口
    addtable() {
      console.log("admin==>", admin.news);
      // 后台列表请求
      this.$http
        .post(admin.useRolelist)
        .then(res => {})
        .catch(res => {});
    },
    // 修改接口
    updatetable() {
      console.log("admin==>", admin.news);
      // 后台列表请求
      this.$http
        .post(admin.useRolelist)
        .then(res => {})
        .catch(res => {});
    }
  },
  created() {
    this.gettableList();
  }
};
</script>