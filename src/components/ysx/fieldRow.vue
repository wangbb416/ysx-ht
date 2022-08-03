<template>
  <div :class="fieldStyle || 'field-row'">
    <div v-for="(item, index) in fieldList" :key="index" class="item">
      <div class="label">{{ item.label }}：</div>
      <div :class="['value', item.long]">
        <slot :name="item.slot">{{ item.value }}</slot>
      </div>
      <div v-if="item.operate" @click="clickEvent(item.clickEvent,item.data)" class="clickEvent">
        {{ item.operateTitle }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "",
  props: {
    fieldList: Array,
    fieldStyle: String,
  },
  data() {
    return {}
  },
  methods: {

    clickEvent(type, data) {
      switch (type) {
        case'jumpNewpage':
          window.open(data, '_blank');
          break;
        default:
          break;
      }

    }

  }
}
</script>

<style lang="less" scoped>
.field-row, .block {
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
  line-height: 25px;
}

.block {
  display: block;
}

.item {
  width: 500px;
  display: flex;
}

.label, .value {
  min-width: 200px;
}

.label {
  text-align: right;
}

.clickEvent {
  cursor: pointer;

}
</style>
