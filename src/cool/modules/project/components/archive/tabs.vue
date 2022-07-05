<template>
	<el-tabs
    class="project-tabs"
    :lazy="true"
    v-model="activename"
    @tab-click="handleClick"
  >
    <el-tab-pane label="概要" name="detail">
      <component :is="isDetail"><slot name="detail"></slot></component>
    </el-tab-pane>
    <el-tab-pane label="文档" name="doc">
      <component :is="isDoc"><slot name="doc"></slot></component>
    </el-tab-pane>
	</el-tabs>
</template>

<script>
import { ElTabs } from 'element-plus';
import { shallowRef, onMounted, ref, watch } from 'vue';
import TabsDetail from './tabs-detail.vue';
import TabsDoc from './tabs-doc.vue';

export default {
  name: 'yx-proj-tabs',
  components: {
    ElTabs,
    TabsDetail,
    TabsDoc,
  },
  setup() {
    const activename = ref(null);
    const isDetail = shallowRef(null);
    const isDoc = shallowRef(null);

    const handleClick = function () {
      switch (activename.value) {
        case 'detail' :
          isDetail.value = TabsDetail
          break
        case 'doc' :
          isDoc.value = TabsDoc
          break
      }
    }

    onMounted(() => {
      activename.value = 'detail';
      handleClick()
    })

    watch(() => activename.value, () => {
      handleClick()
    })

    return {
      activename,
      isDetail,
      isDoc,
      handleClick
    }
  }
};
</script>

<style lang="scss">
.project-tabs {
  .el-tabs__header {
    padding: 0 1rem;
    background-color: white;
  }

}
</style>
