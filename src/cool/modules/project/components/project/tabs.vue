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
    <el-tab-pane label="设备" name="equipment">
      <component :is="isEquipment"><slot name="equipment"></slot></component>
    </el-tab-pane>
    <el-tab-pane label="文档" name="doc">
      <component :is="isDoc"><slot name="doc"></slot></component>
    </el-tab-pane>
    <el-tab-pane label="施工" name="pointtab">
      <component :is="isPointTab"><slot name="pointtab"></slot></component>
    </el-tab-pane>
    <el-tab-pane label="参与人" name="user">
      <component :is="isUser"><slot name="user"></slot></component>
    </el-tab-pane>
	</el-tabs>
</template>

<script>
import { ElTabs } from 'element-plus';
import { shallowRef, onMounted, ref, watch } from 'vue';
import TabsDetail from './tabs-detail.vue';
import TabsEquipment from './tabs-equipment.vue';
import TabsDoc from './tabs-doc.vue';
import TabsPointTab from './tabs-pointtab.vue';
import TabsUser from './tabs-user.vue';


export default {
  components: {
    ElTabs,
    TabsDetail,
    TabsDoc,
    TabsUser
  },
  setup() {
    const activename = ref(null);
    const isDetail = shallowRef(null);
    const isEquipment = shallowRef(null);
    const isDoc = shallowRef(null);
    const isPointTab = shallowRef(null);
    const isUser = shallowRef(null);

    const handleClick = function () {
      switch (activename.value) {
        case 'detail' :
          isDetail.value = TabsDetail
          break
        case 'equipment' :
          isEquipment.value = TabsEquipment
          break
        case 'doc' :
          isDoc.value = TabsDoc
          break
        case 'pointtab' :
          isPointTab.value = TabsPointTab
          break
        case 'user' :
          isUser.value = TabsUser
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
      isPointTab,
      isEquipment,
      isUser,
      handleClick
    }
  }
};
</script>

<style lang="scss">
.project-tabs {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  flex: 1;

  .el-tabs__content {
    width: 100%;
    height: 100%;
    position: relative;
    flex: 1;
    overflow: auto;
    box-sizing: border-box;
  }

  .el-tabs__header {
    padding: 0 1rem;
    background-color: white;
  }

  .el-tab-pane {
    height: 100%;
  }
}
</style>
