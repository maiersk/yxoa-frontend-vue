<template>
  <el-select v-model="value" v-bind="props" multiple @change="onChange">
    <el-option v-for="(item, i) in list" :key="i" :value="item.id" :label="item.name" />
  </el-select>
</template>

<script lang="ts">
import { inject, ref, onMounted, watch, defineComponent } from 'vue';
import { isEmpty } from '/@/cool/core/utils';
import { isArray } from '/@/cool/utils';

export default defineComponent({
  name: "cl-doc-select",

  props: {
    modelValue: [String, Number, Array],
    props: Object,
    cloneValue: [String, Number]
  },

  emits: ["update:modelValue"],

  setup(props: any, { emit }) {
    const service = inject<any>("service");
    const form = inject<any>("form");

    const list = ref<any[]>([]);
    const value = ref<any>();

    function onChange(idxs: any) {
      if (!isEmpty(idxs)) {
        const item: any = list.value.filter((item) => {
          if (item.id === idxs[0]) {
            return item;
          }
        });

        // 该组件使用在cl-form时，可以传入方法把值传出
        if (!isEmpty(form) && !isEmpty(item[0])) {
          const clonelist = props.cloneValue.split(',')
          clonelist.map((value: string) => {
            form[value] = item[0][value] ?? '';
          })
        }
  
        emit("update:modelValue", idxs);
      }
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
      list.value = await service.project.doc.list();
    });

    return {
      list,
      value,
      onChange
    }
  }
})
</script>
