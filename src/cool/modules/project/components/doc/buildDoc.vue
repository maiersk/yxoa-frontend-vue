<template>
	<el-container class="doc-build">
    <main>
      <el-row class="doc-build__body">
        <el-col class="form-data">
          <data-table v-model="doc.data"></data-table>
        </el-col>
        <el-col class="doc-perview">
          <doc-perview></doc-perview>
        </el-col>
      </el-row>
    </main>
	</el-container>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import DataTable from './dataTable.vue';
import DocPerview from './perview.vue';
import { useCool } from '/@/cool/core';

export default {
  components: {
    DataTable,
    DocPerview
  },
  props: {
    docId: {
      type: Number,
      default: 0
    }
  },
  setup(props: any, ctx: any) {
    const { service } = useCool();
    const doc = ref<Object>({ data: '{}' })

    onMounted(async () => {
      doc.value = await service.project.doc.info({ id: props.docId })
    })

    return {
      doc,
      onMounted
    }
  }
};
</script>

<style lang="scss" scoped>
.doc-build {
  > main {
    width: 100%;
  }
}
.doc-build__body {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  .form-data {
    flex-shrink: 2;
    margin-right: 20px;
  }

  .doc-perview {
    flex-shrink: 1;
  }
}

</style>