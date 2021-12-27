<template>
  <div class="project-doc">
    <div class="pane">
      <project-tabs>
        <template #detail>
          <tabs-detail></tabs-detail>
        </template>
        <template #doc>
          <tabs-doc></tabs-doc>
        </template>
        <template #user>
          <tabs-user></tabs-user>
        </template>
      </project-tabs>
    </div>
  </div>
</template>

<script>
import ProjectTabs from '../components/tabs.vue';
import TabsDetail from '../components/project/tabs-detail.vue';
import TabsDoc from '../components/project/tabs-doc.vue';
import TabsUser from '../components/project/tabs-user.vue';

export default {
  components: {
    ProjectTabs,
    TabsDetail,
    TabsDoc,
    TabsUser
  },
  setup() {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>