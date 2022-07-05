<template>
	<el-container style="width=100%;">
		<!-- 已有生成/完成的文档，提供文档预览，重新上传，编辑，下载功能 -->
		<div v-if="selectNode.file" class="doc-success">
			<div class="doc-success__info" v-if="!archive">
				<span class="info-alert" >
					<el-icon class="el-icon-warning"></el-icon>&nbsp;
				 	已完成的文档预览，如有错漏请重新上传或重新编辑。
				</span>
			</div>
			<div class="doc-success__opation" >
				<el-button v-if="doc.type !== 1 && !archive" type="warning" size="mini" @click="openEdit">
					重新编辑
				</el-button>
				<cl-upload v-if="!archive"
					active=""
					type="file"
					limit="1"
					limitSize="100"
					listType="text"
					v-model="fileUrl"
					size="300px"
					text="重新上传"
					:showFileList="false"
					:on-success="saveDoc"
				>
					<el-button type="warning" size="mini">
						重新上传
					</el-button>
				</cl-upload>
				<el-button v-if="selectNode.status === 'wait' && !archive" type="success" size="mini" @click="docSuccess">
					确认无误
				</el-button>
				<el-button type="primary" size="mini" @click="download">
					下载
				</el-button>
			</div>
			<div class="doc-success__perview">
				<doc-perview :url="selectNode.file"></doc-perview>
			</div>
		</div>
		<!-- 没有则，提供文档模板数据编辑，保存(生成到节点file字段并存档), 上传功能 -->
		<div class="doc-wait-todo" v-else>
			<div v-if="selectNode.type === 0">
				<span class="info-alert">
					<el-icon class="el-icon-warning"></el-icon>&nbsp;
				 	“ {{ selectNode.name }} ” 目录，请在左侧项目文档结构列表中，右键该目录添加文档等操作。
				</span>

				<doc-menu class="doc-menu" :tree="selectNode.root"></doc-menu>
			</div>
			<!-- 有模板文档的，提供编辑，保存，直接上传功能。 -->
			<div v-else-if="doc.type === 0"
				class="doc-build"
			>
				<div class="doc-build__info">
					<span class="info-alert">
						<el-icon class="el-icon-warning"></el-icon>&nbsp;
						待完成的模板文档，编辑信息并生成文档，或上传已完成的文档。
					</span>
				</div>
				<div class="doc-build__opation">
					<el-button type="primary"
						size="mini"
						@click="openEdit"
					>
						编辑
					</el-button>
					<cl-upload
						active=""
						type="file"
						limit="1"
						limitSize="100"
						listType="text"
						v-model="fileUrl"
						size="300px"
						text="上传"
						:showFileList="false"
						:on-success="saveDoc"
					>
						<el-button type="primary"
							size="mini"
						>
							上传文档
						</el-button>
					</cl-upload>
					<el-button type="primary" size="mini" @click="download">
						下载
					</el-button>
				</div>
				<div class="doc-perview">
					<doc-perview :url="doc.templateFile"></doc-perview>
				</div>
			</div>
			<!-- 没有模板文档的待上传 -->
			<div v-else-if="doc.type === 1" class="doc-needupload">
        <div class="doc-needupload__info">
					<span class="info-alert">
						<el-icon class="el-icon-warning"></el-icon>&nbsp;
						请上传 “ {{selectNode.name}} ” 文档
					</span>
        </div>
				<cl-upload active=""
          type="file"
          limit="1"
					limitSize="100"
          v-model="fileUrl"
          size="300px"
          text="上传"
					:on-success="saveDoc"
        />
			</div>
		</div>

		<cl-dialog title="编辑" v-model="showDialog">
			<data-template
				v-model="selectNode.data"
				:docId="doc.id"
				:projectId="projectObj?.id ?? null"
				:test-mode="testMode"
			></data-template>
			<data-form
				v-model="selectNode.data"
				:hide="true"
				:docId="doc.id"
				:test-mode="testMode"
				@build-doc="handelBuild"
			></data-form>
		</cl-dialog>
	</el-container>
</template>

<script lang="ts">
import { inject, ref } from "vue";
import { useCool } from "/@/cool";
import { isEmpty } from "/@/cool/core/utils";
import { ElMessage } from "element-plus";
import DataForm from "../dataForm/";
import DataTemplate from "../dataTemplate.vue";
import DocPerview from "../perview/";
import DocMenu from './docmenu';

export default {
	name: 'yx-proj-tree-context',
	components: {
		DataForm,
		DataTemplate,
		DocPerview,
		DocMenu,
	},
	props: {
		testMode: {
			type: Boolean,
			default: false
		},
		archive: {
			type: Boolean,
			default: false
		}
	},
	emits: ['treeRefresh'],
	setup(props: any, { emit }: any) {
		const { service } = useCool();
		const doc: any = inject("doc");
		const selectNode: any = inject("select-node");
		const projectObj: any = inject("project");

		const handelBuild = async (form: any) => {
			let projectId;

			if (props.testMode) {
				projectId = form.projectId;

				delete form.projectId;
			} else if (!isEmpty(projectObj)) {
				projectId = projectObj.value.id;
			}

			let id = doc.value.id;
			if (!props.testMode) {
				id = selectNode.value.docId;
			}

			const res = await service.project.doc.generate(id, {
				projectId,
				fields: {
					...form
				},
				node: selectNode.value
			});

			if (!props.testMode) {
				delete selectNode.value.updateTime;
				delete selectNode.value.createTime;
				await service.project.doctree.prjdocupdate(
					Object.assign(selectNode.value, {
						projectId: projectId,
						data: `${selectNode.value.data}`.trim()
					})
				)
			}

			res && ElMessage.success("生成并保存成功");
			emit('treeRefresh');
		};

    const fileUrl = ref<string>("");
		const showDialog = ref<boolean>(false);

		function openEdit() {
			showDialog.value = !showDialog.value;
		}

		function docSuccess () {
			service.project.doctree.success({
				projectId: projectObj.value.id,
				node: selectNode.value
			}).then((res: any) => {
				ElMessage.success('文档已标记完成');
				emit('treeRefresh');
			})
		}

    function saveDoc(res: any, file: any) {
			fileUrl.value = res.data;

			service.project.doctree.save({
				projectId: projectObj.value.id,
				node: selectNode.value,
				fileUrl: fileUrl.value
			}).then((res: any) => {
				ElMessage.success('保存成功，文档标记为待确认');
				emit('treeRefresh');
				fileUrl.value = '';
				showDialog.value = false;
			})
    }

	 	async function download() {
			 const { name, file } = selectNode.value;
			const fileName = name;
			let fileurl: any
			if (!file) {
				fileurl = new URL(doc.value.templateFile).pathname;
			} else {
				fileurl = new URL(file).pathname;
			}

			const fileRes = await fetch(
				"/dev/" + fileurl.split("/").splice(1, fileurl.length).join("/")
			);
			// console.log(fileRes);
			const fileFormat = fileurl.split(".").reverse()[0];
			const blob = await fileRes.blob();
			const objectUrl = await URL.createObjectURL(blob);
			const a = await document.createElement("a");
			a.setAttribute("target", "_blank");
			a.setAttribute("download", `${fileName}.${fileFormat}`);
			a.href = objectUrl;
			a.style.display = "none";

			document.body.appendChild(a);

			a.dispatchEvent(
				new MouseEvent("click", {
					bubbles: true,
					cancelable: true,
					view: window
				})
			);

			document.body.removeChild(a);
		}

		return {
			doc,
			selectNode,
			projectObj,
			handelBuild,
      fileUrl,
			showDialog,
			openEdit,
      saveDoc,
			docSuccess,
			download
		};
	}
};
</script>

<style lang="scss" scoped>

.info-alert {
	padding: 10px;
	background-color: #f4f4f5;
	color: #909399;
	display: flex;
	align-items: center;
}

.doc-success {
	width: 100%;

  &__opation {
		display: flex;
    margin-bottom: 10px;

		button {
			margin-right: 20px;
		}
  }

	&__info {
		margin-bottom: 10px;
	}
}

.doc-wait-todo { width: 100%; }

.doc-needupload {
	width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  &__info {
    // display: flex;
    margin: 10px;
  }

  > button {
    margin: 40px;
  }
}

.doc-build {
	width: 100%;
	height: calc(100% - 10px);
	
	&__info {
		@extend .doc-success__info;
	}
	
	&__opation {
		@extend .doc-success__opation;
	}
}

.doc-menu {
	width: 80%;
	margin: 0 auto;
	margin-top: 10px;
}
</style>