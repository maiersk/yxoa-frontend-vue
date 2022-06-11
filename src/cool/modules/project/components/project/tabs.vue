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
    <el-tab-pane label="各方联系人" name="contact">
      <component :is="isContact"><slot name="contact"></slot></component>
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
import TabsContact from './tabs-contacts.vue';


export default {
  name: 'yx-proj-tabs',
  components: {
    ElTabs,
    TabsDetail,
    TabsDoc,
    TabsUser,
    TabsContact
  },
  setup() {
    const activename = ref(null);
    const isDetail = shallowRef(null);
    const isEquipment = shallowRef(null);
    const isDoc = shallowRef(null);
    const isPointTab = shallowRef(null);
    const isUser = shallowRef(null);
    const isContact = shallowRef(null);

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
        case 'contact' :
          isContact.value = TabsContact
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
      isContact,
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
