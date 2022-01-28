<template>
  <el-card class="data-card">
    <template #header>
      <span>
        数据填写
      </span>
      <div class="operator">
        <el-button type="text" @click="refreshHandel">刷新表单</el-button>
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-card>
</template>

<script lang="ts">
import { ElCard, ElButton } from 'element-plus';

export default {
  components: {
    ElCard,
    ElButton
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
	.data-card {
		margin: 0;
		padding: 0;
	}
	.data-card::before,
	.data-card::after {
		display: table;
		content: "";
	}
	.data-card::after {
		clear: both;
	}

  .operator {
		float: right;
    > button {
			min-height: 0;
      padding: 0;
    }
  }
</style>