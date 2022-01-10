<template>
	<el-tabs
    class="project-tabs"
    type="border-card"
    v-model="activename"
    @tab-click="handleClick"
  >
    <el-tab-pane label="详细" name="detail"><slot name="detail"></slot></el-tab-pane>
    <el-tab-pane label="文档" name="doc"><slot name="doc"></slot></el-tab-pane>
    <el-tab-pane label="参与人" name="user"><slot name="user"></slot></el-tab-pane>
	</el-tabs>
</template>

<script>
import { ElTabs } from 'element-plus';

export default {
  components: {
    ElTabs
  },
  setup() {
    const activename = 'detail';

    const handleClick = function () {

    }

    return {
      activename,
      handleClick
    }
  }
};
</script>

<style lang="scss">
.project-tabs {
  min-height: calc(100% - 2px);

  .el-tabs__content {
    min-height: 100vh;
  }
}
</style>
