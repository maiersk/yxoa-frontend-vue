<template>
  <el-select v-model="value" v-bind="props" multiple @change="onChange">
    <el-option v-for="(item, i) in list" :key="i" :value="item.id" :label="item.name" />
  </el-select>
</template>

<script lang="ts">
import { inject, ref, onMounted, watch, defineComponent } from 'vue';
import { isArray } from '/@/core/utils';

export default defineComponent({
  name: "cl-category-select",

  props: {
    modelValue: [String, Number, Array],
    props: Object
  },

  emits: ["update:modelValue"],

  setup(props: any, { emit }) {
    const service = inject<any>("service");
    const list = ref<any[]>([]);
    const value = ref<any>();

    function onChange(val: any) {
      emit("update:modelValue", val);
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
      list.value = await service.worklog.category.list();
      console.log(list.value)
    });

    return {
      list,
      value,
      onChange
    }
  }
})
</script>
