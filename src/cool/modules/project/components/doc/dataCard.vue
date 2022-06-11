<template>
  <op-card class="data-card">
    <template #title>
      <span>
        数据填写
      </span>
    </template>
    <template #operator>
      <el-button type="text" @click="refreshHandel">刷新表单</el-button>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </op-card>
</template>

<script lang="ts">
import OpCard from './opCard.vue';

export default {
  name: 'yx-proj-doc-datacard',
  components: {
    OpCard,
  },
  emits: ['refresh'],
  setup(props: any, { emit }: any) {
    const refreshHandel = () => {
      emit('refresh');
    }

    return {
      refreshHandel
    }
  }
}
</script>

<style lang="scss" scoped>

</style>