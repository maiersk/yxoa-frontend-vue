<template>
	<div class="transferTreeBox">
		<!-- 左侧项目模板文档结构 -->
		<div class="leftside">
			<h3>项目模板文档结构</h3>

      <tree-box>
        <template #content>
          <el-tree :ref="setRefs('beforeTree')"
						:data="treelist"
						:props="defaultProps"
						show-checkbox
						:filter-node-method="beforeFilterNode"
						:accordion="true"
						node-key="id"
					/>
        </template>
      </tree-box>
		</div>

		<div class="transferBtns">
			<el-button type="primary" @click="towardsRight" size="mini">
				&gt;&gt;
			</el-button>
			<el-button type="primary" @click="towardsLeft" size="mini">
				&lt;&lt;
			</el-button>
		</div>

		<!-- 右侧项目文档结构 -->
		<div class="rightside">
			<h3>项目文档结构</h3>

      <tree-box>
        <template #content>
					<el-tree
						:ref="setRefs('afterTree')"
						:data="afterTreeArr"
						:props="defaultProps"
						show-checkbox
						:filter-node-method="afterFilterNode"
						node-key="id"
					/>
        </template>
      </tree-box>
		</div>
	</div>
</template>

<script lang='ts'>
import { ElTree, ElCheckbox } from "element-plus";
import { nextTick, onMounted, reactive, ref } from "vue";
import { useCool } from "/@/cool";
import TreeBox from "./treeBox.vue";
import { revDeepTree } from '/@/cool/core/utils';

export default {
	props: {
		treelist: [Object, Array]
	},
	components: {
		ElTree,
		ElCheckbox,
    TreeBox
	},
	setup(props: any, { emit }: any) {
		const { refs, setRefs } = useCool();

		const defaultProps = reactive({
			children: "children",
			label: "name"
		});

		const afterTreeArr = ref<any[]>([]);
		const beforeKeyarr = ref<any>([]);
		const afterKeyarr = ref<any>([]);

		onMounted(() => {

		});

		const keyClear = (str: string) => {
			let node = refs.value[str].getNode(props.treelist[0]);

      console.log(node.childNodes);
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
			let currentBeforeKeyarr = refs.value.beforeTree.getCheckedNodes(true);

			let arr = beforeKeyarr.value.filter((item: any) => {
        return !currentBeforeKeyarr.some((ele: any) => ele.id === item.id)
      });

			beforeKeyarr.value = arr;

      beforeKeyarr.value = [...beforeKeyarr.value, ...currentBeforeKeyarr];

			const node = refs.value.beforeTree.getNode(props.treelist[0]);
			console.log(node)
			refs.value.afterTree.append(node.data, node.parent.data);
			// shuttle();
		};

		const towardsLeft = () => {
			afterKeyarr.value = refs.value.afterTree.getCheckedNodes(true);

			let arr = beforeKeyarr.value.filter((item: any) => {
				return !afterKeyarr.some((ele: any) => ele.value === item.value);
			});

			beforeKeyarr.value = arr;

			shuttle();
		};

		const shuttle = async () => {
			let str = "";

			beforeKeyarr.value.forEach((item: any) => {
				if (str) {
					str = `${str},${item.id}`;
				} else {
					str = item.id;
				}
			});

			keyClear("beforeTree");
			keyClear("afterTree");


			await refs.value.beforeTree.setCheckedKeys([]);
			await refs.value.afterTree.setCheckedKeys([]);

			refs.value.beforeTree.filter(str);
			refs.value.afterTree.filter(str);

      console.log(str, beforeKeyarr.value)
			emit("getcascaderlist", beforeKeyarr.value);
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

		return {
			refs,
			setRefs,
			defaultProps,
			beforeKeyarr,
			afterKeyarr,
			keyClear,
			clearClickRecursion,
			towardsRight,
			towardsLeft,
			shuttle,
			beforeFilterNode,
			afterFilterNode,
			afterTreeArr,
		};
	}
};
</script>

<style lang="scss" scoped>
.transferTreeBox {
	display: flex;
	width: 100%;
	justify-content: space-around;

	.leftside, .rightside {
		> h3 {
			padding-bottom: 0.5rem;
		}
	}

	.transferBtns {
		position: relative;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
}
</style>