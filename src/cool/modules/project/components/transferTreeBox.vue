<template>
	<div class="transferTreeBox">
		<!-- 左侧待选内容 -->
		<div class="SelectBox">
			<div class="boxTitle" @click="clickAllSelect">全选 &gt;</div>
			<div class="boxCenter">
				<el-tree
					ref="beforeTree"
					:data="props.cascaderData"
					:props="defaultProps"
					show-checkbox
					:filter-node-method="beforeFilterNode"
					:accordion="true"
					node-key="nodeCode"
				/>
			</div>
		</div>

		<div class="transferBtn">
			<div class="pickBtn" @click="towardsRight">&gt;&gt;</div>
			<div class="pickBtn" @click="towardsLeft">&lt;&lt;</div>
		</div>

		<div class="SelectBox">
			<div class="boxTitle" @click="clickCancelAllSelect">&lt; 取消全选</div>

			<div class="boxCenter">
				<el-tree
					:ref="setRefs('afterTree')"
					:data="props.cascaderData"
					:props="defaultProps"
					show-checkbox
					:filter-node-method="afterFilterNode"
					node-key="nodeCode"
				/>
			</div>
		</div>
	</div>
</template>

<script lang='ts'>
import { getCurrentInstance, onMounted, reactive, ref } from 'vue';
import { useCool } from '/@/cool/core';

export default {
	props: {
		cascaderData: [Object, Array]
	},
	setup(props: any, { emit }: any) {
		const { refs, setRefs } = useCool();

		const defaultProps = reactive({
			children: "children",
			label: "label"
		});
		const beforeKeyarr = reactive<any>([]);
		const afterKeyarr = reactive<any>([]);
		const afterTree = ref<any>(null);

		onMounted(() => {
			afterTree.value.filter();
		});

		const keyClear = (str: string) => {
      let node = refs[str].getNode(props.cascaderData[0].nodeCode).parent;

			clearClickRecursion(node.childNodes);
		};

		const clearClickRecursion = (data: any) => {
			data.forEach((val: any) => {
				val.checked = false;
				if (val.childNodes && val.childNodes.length > 0) {
					clearClickRecursion(val.childNodes);
				}
			});
		};

		const towardsRight = () => {
			let currentBeforeKeyarr = refs.value.beforeTree.getCheckedNode(true);

			let arr = beforeKeyarr.filter(
        (item: any) => !currentBeforeKeyarr.some((ele: any) => ele.value === item.value)
			);

			beforeKeyarr.value = arr;

			shuttle();
		};

    const towardsLeft = () => {
      afterKeyarr.value = refs.value.afterTree.getCheckedNodes(true);

      let arr = beforeKeyarr.filter((item: any) => {
        return !afterKeyarr.some((ele: any) => ele.value === item.value)
      });

      beforeKeyarr.value = arr;

      shuttle();
    }

		const shuttle = async () => {

			let str = "";

			beforeKeyarr.forEach((item: any) => {
				if (str) {
					str = `${str},${item.value}`;
				} else {
					str = item.value;
				}
			});

			keyClear("beforeTree");
			keyClear("afterTree");

			await refs.value.beforeTree.setCheckedKey([]);
			await refs.value.afterTree.setCheckedKey([]);

			refs.value.beforeTree.filter(str);
			refs.value.afterTree.filter(str);

			emit("getcascaderlist", beforeKeyarr);
		};

		const beforeFilterNode = (value: any, data: any) => {
			if (!value) {
				return true;
			}

			return value.indexOf(data.value) < 0;
		};

		const afterFilterNode = (value: any, data: any) => {
			if (!value) {
				return false;
			}

			return value.indexOf(data.value) !== -1;
		};

		// 点击全选
		const clickAllSelect = () => {
			refs.value.beforeTree.setCheckedNodes(props.cascaderData);

			towardsRight();
		};

		// 点击取消全选
		const clickCancelAllSelect = () => {
			refs.value.afterTree.setCheckedNodes(props.cascaderData);

			towardsLeft();
		};

		return {
			refs,
			setRefs,
			defaultProps,
			beforeKeyarr,
      afterKeyarr,
			afterTree,
      keyClear,
      clearClickRecursion,
      towardsRight,
      towardsLeft,
      shuttle,
      beforeFilterNode,
      afterFilterNode,
      clickAllSelect,
      clickCancelAllSelect
		};
	}
};
</script>

<style>
</style>