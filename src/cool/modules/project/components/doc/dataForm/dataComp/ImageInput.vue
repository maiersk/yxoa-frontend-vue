<template>
	<el-upload
		action="/dev/admin/base/comm/upload"
		:headers="headers"
		:show-file-list="false"
		:on-success="handleSuccess"
		:before-upload="beforeUpload"
	>
		<div class="img_uploader">
			<img v-if="imageUrl" :src="imageUrl" class="img_perview" />
			<i v-else class="el-icon-plus uploader-icon"></i>
		</div>
	</el-upload>
</template>

<script lang='ts'>
import { ElUpload } from "element-plus";
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useCool } from "/@/cool/core";

export default defineComponent({
	name: "cl-df-imginput",
	emits: ["update:modelValue"],
	components: {
		ElUpload
	},
  props: {
    modelValue: {
      type: String,
      default: ""
    }
  },
	setup(props, { emit }) {
		const { store } = useCool();

		const token = computed(() => store.getters.token);

		const imageUrl = ref<string>("");
		const headers = reactive<any>({
			Authorization: token
		});

		onMounted(() => {
			imageUrl.value = props.modelValue;
		})

		const handleSuccess = (res: any, file: any) => {
			const url = res.data;
			emit("update:modelValue", url);
		};

		const beforeUpload = () => {};

		return {
			imageUrl,
			headers,
			handleSuccess,
			beforeUpload
		};
	}
});
</script>

<style lang="scss" scoped>
	.img_uploader {
		border: 1px dashed #ccc;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
		padding: 2px;
	}

	.img_uploader:hover {
		border-color: #409EFF;
	}

	.uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.img_perview {
		width: 178px !important;
		height: 178px !important;
		display: block;
	}
</style>