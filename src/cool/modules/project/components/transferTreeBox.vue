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
					ref="afterTree"
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

export default {
	props: {
		cascaderData: [Object, Array]
	},
	setup(props: any, { emit }: any) {
    const instance = getCurrentInstance()
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
      const refs = instance.refs ?? {};
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
      const refs = instance?.refs ?? []
			let currentBeforeKeyarr = refs.beforeTree.getCheckedNode(true);

			let arr = beforeKeyarr.filter(
        (item: any) => !currentBeforeKeyarr.some((ele: any) => ele.value === item.value)
			);

			beforeKeyarr.value = arr;

			shuttle();
		};

    const towardsLeft = () => {
      const refs = instance?.refs ?? []
      afterKeyarr.value = refs.afterTree.getCheckedNodes(true);

      let arr = beforeKeyarr.filter((item: any) => {
        return !afterKeyarr.some((ele: any) => ele.value === item.value)
      });

      beforeKeyarr.value = arr;

      shuttle();
    }

		const shuttle = async () => {
      const refs = instance?.refs ?? []

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

			await refs.beforeTree.setCheckedKey([]);
			await refs.afterTree.setCheckedKey([]);

			refs.beforeTree.filter(str);
			refs.afterTree.filter(str);

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
      const refs = instance?.refs ?? []
			refs.beforeTree.setCheckedNodes(props.cascaderData);

			towardsRight();
		};

		// 点击取消全选
		const clickCancelAllSelect = () => {
      const refs = instance?.refs ?? []
			refs.afterTree.setCheckedNodes(props.cascaderData);

			towardsLeft();
		};

		return {
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