<template>
	<div class="yx-adv-search">
		<cl-adv-btn />
		<cl-adv-search :items="items" :op-list="opList" />
	</div>
</template>

<script lang="ts">
import { AdvSearchItem } from "@cool-vue/crud/types";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: 'cl-yx-adv-search',
	setup() {
		const items = ref<AdvSearchItem[]>([
			{
				label: "项目名称",
				prop: "name",
				component: {
					name: "el-input",
				}
			},
      {
        label: '建设单位',
        prop: 'builderName',
				component: {
					name: "el-input",
				}
      },
      {
        label: '监理单位',
        prop: 'supervisionName',
				component: {
					name: "el-input",
				}
      },
      {
        label: '承建单位',
        prop: 'undertookName',
				component: {
					name: "el-input",
				}
      },
      {
        label: '年份搜索',
        prop: 'year',
        component: {
          name: "el-date-picker",
          type: "year",
          'value-format': "YYYY",
          placeholder: "选择年"
        }
      },
      {
        label: '月份搜索',
        prop: 'month',
        component: {
          name: "el-date-picker",
          type: "month",
          'value-format': "MM",
          placeholder: "选择月"
        }
      },
		]);

		const opList = ref<string[]>(["search", "reset", "clear", "close"]);

		return {
			items,
			opList
		};
	}
});
</script>

<style lang="scss" scoped></style>
