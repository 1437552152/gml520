<template>
  <div class="home">
    <!-- <h5>引入echarts折线图</h5> -->
    <div class="chartStyle" ref="chart"></div>
  </div>
</template>

<script>
import admin from "@/lib/api";
import Qs from "qs";
import Host from "@/lib/env";
export default {
  data() {
    return {};
  },

  methods: {
    initCharts(res) {
      console.log(res);
      //   //   X轴地址
      let XName = [];
      //   //   访客量
      let num = [];
      res.map((item, index) => {
        XName.push(item.address);
        num.push(item.num);
      });
      console.log(XName);
      console.log(num);

      let myChart = this.$echarts.init(this.$refs.chart);
      console.log(this.$refs.chart); // 绘制图表

      myChart.setOption({
        tooltip: {
        //   trigger: "item",
          formatter: "访问次数 : <br/>{b} : {c}"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: XName
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
               {value:num[0], name:XName[0]},
                {value:num[1], name:XName[1]},
                {value:num[2], name:XName[2]},
                {value:num[3], name:XName[3]},
                {value:num[4], name:XName[4]}
              
            ]
          }
        ]
      });
    },
    getData() {
      this.$http
        .post(admin.getLookRecord)
        .then(res => {
          this.initCharts(res.data.data);
        })
        .catch(res => {});
    }
  },
  mounted() {
      
    this.getData();
  }
};
</script>
<style lang="less" scoped>
h5 {
  font-size: 40px;
  color: #2d8cf0;
  text-align: center;
  margin-top: 50px;
}
.chartStyle {
  width: 1000px;
  height: 500px;
  margin: 50px auto;
  margin-top: 100px;
}
</style>
