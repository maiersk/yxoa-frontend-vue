<template>
  <div class="project-doc">
    <div class="pane">
      <project-tabs>
        <template #detail>
          <project-detail></project-detail>
        </template>
        <template #doc>
          <project-doc></project-doc>
        </template>
        <template #user>
          <project-user></project-user>
        </template>
      </project-tabs>
    </div>
  </div>
</template>

<script>
import ProjectTabs from '../components/tabs.vue';
import ProjectDetail from '../components/project/detailview.vue';
import ProjectDoc from '../components/project/docview.vue';
import ProjectUser from '../components/project/userview.vue';

export default {
  components: {
    ProjectTabs,
    ProjectDetail,
    ProjectDoc,
    ProjectUser
  },
  setup() {

    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>