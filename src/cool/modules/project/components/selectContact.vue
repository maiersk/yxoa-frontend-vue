<template>
  <el-select v-model="value" v-bind="props" multiple @change="onChange">
    <el-option v-for="(item, i) in list" :key="i" :value="item.id" :label="item.name" />
  </el-select>
</template>

<script lang="ts">
import { inject, ref, onMounted, watch, defineComponent } from 'vue';
import { isArray } from '/@/cool/utils';

export default defineComponent({
  name: "cl-contacts-select",

  props: {
    modelValue: [String, Number, Array],
    props: Object,
    cloneValue: [String, Number]
  },

  emits: ["update:modelValue"],

  setup(props: any, { emit }) {
    const service = inject<any>("service");

    const list = ref<any[]>([]);
    const value = ref<any>();

    function onChange(val: any) {
      if ((props.props?.multipleLimit ?? 0) === 1) {
        emit("update:modelValue", ...val); 
      } else {
        emit("update:modelValue", val); 
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
      list.value = await service.project.contact.list();
    });

    return {
      list,
      value,
      onChange
    }
  }
})
</script>
