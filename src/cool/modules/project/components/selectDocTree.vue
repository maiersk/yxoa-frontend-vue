<template>
  <el-tree
    :ref="setRefs('selectTree')"
    node-key="id"
    v-loading="loading"
    :data="list"
    :props="{
      label: 'name'
    }"
    :onChange="onChange"
    :modelValue="value"
    :expand-on-click-node="false"
    show-checkbox
    highlight-current
  >
  </el-tree>
</template>

<script lang="ts">
import { inject, ref, onMounted, watch, defineComponent } from 'vue';
import { deepTree, isArray, revDeepTree } from '/@/cool/utils';
import { useCool } from "/@/cool";

export default defineComponent({
  name: "cl-doctree-select",

  props: {
    modelValue: [String, Number, Array],
    props: Object
  },

  emits: ["update:modelValue"],

  setup(props: any, { emit }) {
    const { refs, setRefs } = useCool();
    const service = inject<any>("service");

    const loading = ref<boolean>(false);
    const list = ref<any[]>([]);
    const value = ref<any>();

    function onChange(val: any) {
      const treeRef = refs.value.selectTree;
      const value = treeRef.getCheckedNodes();
      value.map((node: any) => {
        delete node.data;
        delete node.createTime;
        delete node.updateTime;
      });
      emit("update:modelValue", value);
    }

		// 解析值
		watch(
			() => props.modelValue,
			(val: any) => {
				value.value = (isArray(val) ? val : [val]).filter(Boolean);
			},
			{
				immediate: true
			}
		);

    onMounted(async () => {
      list.value = deepTree(await service.project.doctree.list());
    });

    return {
      refs,
      setRefs,
      loading,
      list,
      value,
      onChange
    }
  }
})
</script>
