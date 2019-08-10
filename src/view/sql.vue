<template>
   <div :class='{wrap:isActive}'>
        <input type="text" v-model='value'>
        <button v-on:click='add(value)'>添加</button>
        <span>总人数:{{lists.length}}</span>
        <table :class='{active:isActive}' border='1' cellspacing="0" cellpadding="0">
            <tr v-for='(item,index) in lists'>
                <td>{{item.name}}</td>
                <td>{{item.state | stateFilter}}</td>
                <td><button v-on:click='del(index)'>删除</button></td>
            </tr>
        </table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value: '',
            lists: [
                { name: '笔记本', state: '0', val: '删除' },
                { name: '手机', state: '0', val: '删除' },
                { name: '书包', state: '1', val: '删除' },
                { name: '钱包', state: '1', val: '删除' }
            ],
            isActive: true
            }
        },
         created(){

  },
  methods:{
     add(name) {
                if (name) {
                    this.lists.unshift({ name: name, state: '0' });
                    this.value = '';
                }
            },
            del (index) {
                this.lists.splice(index, 1);
            } 

  },
   filters: {
            stateFilter: function (type) {
                switch (type) {
                    case '0':
                        return '采购过';
                    case '1':
                        return '未采购';
                    case '2':
                        return '待定';
                    default:
                        return '';
                }
            }
        }

    }
</script>
<style scoped>
 .active {
            border: 1px solid #000;
            width: 80%;
            text-align: center;
        }
        .active td{
            padding: 10px;
        }
</style>