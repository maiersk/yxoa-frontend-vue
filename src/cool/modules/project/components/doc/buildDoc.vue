<template>
	<el-container class="doc-build">
    <main>
      <el-row class="doc-build__body">
        <el-col class="form-data">
          <data-form v-model="doc.data"></data-form>
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
import DataForm from './dataForm/';
import DocPerview from './perview.vue';

export default {
  components: {
    DataForm,
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