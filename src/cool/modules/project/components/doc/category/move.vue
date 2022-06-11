<template>
  <cl-form :ref="setRefs('form')">
    <template #slot-move>
      <el-tree
        :data="list"
        :props="{label: 'name'}"
        node-key="id"
        highlight-current
        @node-click="(e) => { selectCategory = e }"
      ></el-tree>
    </template>
  </cl-form>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useCool } from '/@/cool';
import { deepTree } from '/@/cool/utils';
import { ElMessage, ElMessageBox } from 'element-plus';

export default {
  name: 'yx-proj-category-move',
  setup(props, { emit }) {
    const { refs, setRefs, service } = useCool();

    const list = ref<any[]>([]);

    const selectCategory = ref<any>();

		// 刷新列表
		async function refresh() {
			return await service.project.doccategory.list().then(deepTree);
		}

    async function toMove(ids: any[]) {
      list.value = await refresh();
      
      refs.value.form.open({
        props: {
          title: "分类转移",
          width: "600px",
          labelWidth: "80px"
        },
        items: [
          {
            label: "选择分类",
            prop: "category",
            component: {
              name: "slot-move"
            }
          }
        ],
        on: {
          submit: (data: any, { done, close }: any) => {
            if (!selectCategory.value) {
              ElMessage.warning("请选择分类");
              return done();
            }

            const { name, id } = selectCategory.value;

            ElMessageBox.confirm(`是否将文档转移到分类 ${name} 下`,{
              type: "warning",
            }).then(() => {
              service.project.doc.move({
                category: id,
                docIds: ids
              }).then((res: any) => {
                ElMessage.success("转移成功");
                emit("success", res);
                close();
              }).catch((err: any) => {
                console.log(err);
                ElMessage.error(err);
                emit("error", err);
                done();
              });
            }).catch(() => null);
          }
        }
      })
    }

    return {
      list,
      refs,
      setRefs,
      toMove,
      refresh,
      selectCategory
    }
  }
}
</script>

<style>

</style>