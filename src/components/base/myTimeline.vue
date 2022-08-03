<template>

  <div class="block">
    <el-timeline>
      <!--      :timestamp="getFormatTime(item[0].time_chage_stamp,'dateDay')"-->

      <el-timeline-item v-for="(item, index) in timelineData" :key="index"
                        :timestamp="checkTime(item[0].time_chage_stamp) == '今天'?'今天':(checkTime(item[0].time_chage_stamp) == '昨天'?'昨天':getFormatTime(item[0].time_chage_stamp,'dateDay'))"
                        placement="top">
        <el-card v-for="(s_item, s_index) in item" :key="s_index">

          <!--健康码-->
          <div v-if="s_item.type_attributes == 'codeChage'">
            <h4>
              {{ getFormatTime(s_item.time_chage_stamp) }}
              {{ s_item.userName == 'Auto' ? '系统' : '人工' }}: {{ s_item.preState }} 变更为 {{ s_item.modifiedState }}</h4>
            <h4 v-if="s_item.smsContent"><span>短信内容:</span> <span>{{ s_item.sendSmsTime }}</span></h4>
            <p v-if="s_item.smsContent">{{ s_item.smsContent }}</p>
          </div>

          <!--进出港-->
          <div v-if="s_item.type_attributes == 'inOutPort'">
            <h4>
              {{ getFormatTime(s_item.time_chage_stamp) }}
              {{ s_item.actionState == '1' ? '出港' : '入港' }}:
              {{ s_item.portName }}
            </h4>
          </div>

          <!--纳污记录-->
          <div v-if="s_item.type_attributes == 'declareTask'">
            <h4>
              {{ getFormatTime(s_item.time_chage_stamp) }}
              纳污:
              {{ s_item.receiveShip }}
            </h4>
            <p>
              {{ datafiltering(s_item.wasteType, WasteType).label || '' }}
              {{ s_item.weight }}kg
            </p>
          </div>

        </el-card>


      </el-timeline-item>

    </el-timeline>
  </div>

</template>

<script>
import {WasteType, datafiltering} from "@/utils/enum";
import {getFormatTime, checkTime} from "@/utils/methods";

export default {
  name: "myTimeline",
  props: {
    timelineData: {
      type: Array
    }
  },
  data() {
    return {
      getFormatTime,
      datafiltering,
      WasteType,
      checkTime,
    };
  },
  methods: {}
}
</script>

<style scoped>

</style>
