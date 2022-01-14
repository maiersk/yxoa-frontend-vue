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
import { inject } from 'vue';
import DataTable from './dataTable.vue';
import DocPerview from './perview.vue';

export default {
  components: {
    DataTable,
    DocPerview
  },
  setup(props: any, ctx: any) {
    const doc = inject('docObj');

    return {
      doc
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