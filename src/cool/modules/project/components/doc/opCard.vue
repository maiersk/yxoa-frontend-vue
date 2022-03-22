<template>
  <el-card class="operator-card">
    <template #header>
      <span>
        <slot name="title">标题</slot>
      </span>
      <div class="operator">
        <slot name="operator"></slot>
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
  }
}
</script>

<style lang="scss">
	.operator-card {
		margin: 0;
		padding: 0;
	}
	.operator-card::before,
	.operator-card::after {
		display: table;
		content: "";
	}
	.operator-card::after {
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