<!--生态环保-环保三色码-详情-->
<template>
  <div>
    <MyBread :titleList="titleList"></MyBread>

    <myTimeline :timelineData="timelineData"></myTimeline>
  </div>
</template>

<script>
import MyTable from "@/components/base/myTable";
import MyPagination from "@/components/base/myPagination";
import MyBread from "@/components/base/myBread";
import MySearch from "@/components/base/mySearch";
import MyDialog from "@/components/base/myDialog";
import MyForm from "@/components/base/myForm";
import myTimeline from "@/components/base/myTimeline";

import {
  threecolorDetail,
  declarationTask,
  inboundOutbound
} from "@/api/ecofriendly";
import { getFormatTime } from "@/utils/methods";

export default {
  name: "environmental-credit-points-detail",
  components: {
    MyTable,
    MyPagination,
    MyBread,
    MySearch,
    MyDialog,
    MyForm,
    myTimeline
  },
  data() {
    return {
      titleList: [
        { name: "生态环保", path: "" },
        { name: "环保三色码", path: "/ysx/environmental-three-color" },
        { name: "详情", path: "" }
      ],
      timelineData: [],
      lineData: {},
      pageNum: 1,
      pageSize: 999999
    };
  },
  created() {
    this.lineData = this.$route.query;
    // console.log(this.lineData);
    this.getthreecolorDetail();
  },
  methods: {
    getthreecolorDetail() {
      const data1 = threecolorDetail({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        companyName: this.lineData.companyName
      }); //健康码
      const data2 = inboundOutbound({
        page: this.pageNum,
        size: this.pageSize,
        name: this.lineData.companyName
      }); //进出港
      const data3 = declarationTask({
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        shipName: this.lineData.companyName
      }); //接收任务联单
      Promise.all([data1, data2, data3]).then(res => {
        let temp_list = [];

        function detailList(obj) {
          if (obj.data && obj.data.length) {
            obj.data.map(item => {
              item.type_attributes = obj.type;
              item.day_key = "";
              item.time_chage_stamp = "";
              try {
                item.time_chage_stamp = item[obj.time]
                  ? new Date(item[obj.time]).getTime()
                  : new Date().getTime();
                item.day_key = getFormatTime(item.time_chage_stamp, "dateDay");
              } catch (error) {
                item.time_chage_stamp = item[obj.time]
                  ? new Date(item[obj.time].replace(/\-/g, "/")).getTime()
                  : new Date().getTime();
                item.day_key = getFormatTime(item.time_chage_stamp, "dateDay");
              }
              // console.log(item.time_chage_stamp, item.day_key);
            });
            temp_list = temp_list.concat(obj.data);
          }
        }

        //健康码
        detailList({
          data: res[0].records,
          type: "codeChage",
          time: "createTime"
        });
        //进出港
        detailList({
          data: res[1].content,
          type: "inOutPort",
          time: "actionTime"
        });
        //接收任务联单
        detailList({
          data: res[2].records,
          type: "declareTask",
          time: "workEndTime"
        });
        // 排序
        temp_list.sort((x, y) => {
          return y.time_chage_stamp - x.time_chage_stamp;
        });

        this.$nextTick(() => {
          let hash = {};
          // 处理成{日期： [数据]}
          temp_list.map(item => {
            // console.log("===== ", item.day_key, item.time_chage_stamp)
            if (!Object.keys(hash).includes(item.day_key)) {
              hash[item.day_key] = [];
            }
            hash[item.day_key].push(item);
          });

          this.timelineData = Object.values(hash);

          // let temp_day_list = temp_list.reduce((prev, cur) => {
          //   hash[cur.day_key] ? "" : hash[cur.day_key] = true && prev.push(cur);
          //   return prev;
          // }, []);
          // console.log("temp_day_list", temp_day_list)
          // temp_day_list.map(val => {
          //   let temp_day_arr = []
          //   temp_list.map(item => {
          //     if (getFormatTime(item.time_chage_stamp, 'dateDay') == getFormatTime(val.time_chage_stamp, 'dateDay')) {
          //       temp_day_arr.push(item)
          //     }
          //   });
          //   all_list.push(temp_day_arr)
          // })
          // this.timelineData = all_list;
          // console.log("++++++++++++++++", this.timelineData);
        });
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
