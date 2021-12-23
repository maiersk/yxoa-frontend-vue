<template>
	<el-tabs v-model="activename" @tab-click="handleClick">
		<el-tab-pane label="详细" name="detail"><slot name="detail"></slot></el-tab-pane>
		<el-tab-pane label="文档" name="doc"><slot name="doc"></slot></el-tab-pane>
		<el-tab-pane label="参与人" name="user"><slot name="user"></slot></el-tab-pane>
	</el-tabs>
</template>

<script>
import { ElTabs } from 'element-plus';
import { ref } from 'vue-demi';

export default {
  components: {
    ElTabs
  },
  setup() {
    const activename = ref<string>('detail');

    const handleClick = function () {

    }

    return {
      activename,
      handleClick
    }
  }
};
</script>

<style>
</style>
