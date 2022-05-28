import { useCool } from '/@/cool';
import { defineComponent, h, reactive, toRefs, watch, ref, toRaw, resolveComponent, onMounted } from 'vue'
import DataCard from '../dataCard.vue';
import { ElButton, ElForm, ElFormItem, ElMessage } from 'element-plus';
import _ from "lodash";

export default defineComponent({
  name: "dataForm",
  components: {
    DataCard,
    ElForm,
    ElFormItem,
    ElButton
  },
  props: {
    docId: {
      type: Number,
      default: -1
    },
    testMode: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: String,
      defalut: "{}"
    }
  },
  emits: ["update:modelValue", "buildDoc"],
  setup(props: any, { emit }: any) {
    const { refs, setRefs, service } = useCool();
  
    const data = reactive<any>({
      showOperator: false,
      vnodes: []
    });

    const form = reactive<any>({});
    const json = reactive<any>({});
    const loading = ref<boolean>(true);
    const jsonError = ref<boolean>(false);
    
    watch(
      () => form,
      (val: any) => {
        emit("update:modelValue", JSON.stringify(json.value));
      },
      { deep: true }
    )

    const initJson = () => {
      try {
        data.vnodes = [];
        if (props.modelValue === "{}") {
          ElMessage.warning("请填写数据模板");
          return;
        }

        json.value = JSON.parse(props.modelValue);

        if (json?.value?.template ?? false) {
          Object.keys(json.value.template).forEach((k) => {
            const template = json.value.template[k];
            if (template.value !== undefined || template.value !== null) {
              form[k] = ref<any>(json.value.template[k].value);
            }
          })
        };

        if (props.testMode) {
          form['projectId'] = ref<any>(null);
        }

        loading.value = false
        jsonError.value = false
      } catch (err) {
        // ElMessage.error("错误的JSON数据")
        jsonError.value = true
      }
    }

    const handelRefresh = function() {
      refs.value['ruleForm'].$forceUpdate()
      initJson()
      refs.value['ruleForm'].resetFields()
    }

    const handelBuild = () => {
      refs.value['ruleForm'].validate((valid: boolean) => {
        if (valid) {
          emit('buildDoc', form)
        } else {
          ElMessage.error('请完成表单')
          return false;
        }
      });
    };

    onMounted(() => {
      initJson();
    })

    return {
      refs,
      form,
      json,
      loading,
      jsonError,
      setRefs,
      ...toRefs(data),
      handelRefresh,
      handelBuild,
    }
  },
  render(ctx: any) {
    // 渲染表单组件项
    const renderFormItem = () => {
      if (ctx.json.value?.template ?? false) {
        const children = Object.keys(ctx.json.value.template).map((k) => {
          const e = ctx.json.value.template[k]

          // 使用组件名获取组件对象
          const renderEl: any = toRaw(resolveComponent(e.component.name))        

          // 读取模板内保存的值
          ctx.form[k] = e.value !== "" ? `${e.value}` : ctx.form[k]

          return (
            <el-col span={24}>
              {
                e.component && h(
                  <el-form-item></el-form-item>,
                  {
                    rules: e.rules,
                    label: e.label,
                    prop: k,
                  },
                  {
                    default: () => {
                      return (
                        h(renderEl,
                          {
                            ...e.component.props,
                            modelValue: ctx.form[k],
                            "onUpdate:modelValue": function(val: any) {
                              ctx.form[k] = val;
                              e.value = val;
                            }
                          }    
                        )
                      )
                    }
                  }
                )
              }
            </el-col>
          )
        })

        return (
          <el-row gutter={10} v-loading={ctx.loading}>
            { children }
          </el-row>
        )
      }
    }

    const errDom = () => {
      if (ctx.jsonError) {
        return <span style={'color:red;'}>数据缺失/错误</span>
      }
    }

    const selectProject = () => {
      if (ctx.testMode) {
        const el: any = toRaw(resolveComponent('cl-project-select')) 

        return (
          <el-form-item label="选择项目" prop="projectId" rules={[
            { required: true, message: "请选择项目数据源", trigger: 'blur' },
            // { type: 'number', message: "请选择项目数据源", trigger: ['blur', 'change'] }
          ]} >
            {
              h(el, {
                  multipleLimit: 1,
                  modelValue: ctx.form.projectId,
                  "onUpdate:modelValue": function(val: any) {
                    ctx.form.projectId = val;
                  }
                },
                {
                  default: () => {
                    return []
                  }
                }
              )
            }
          </el-form-item>
        )
      }
    }

    const saveOrBuild = () => {
      let btnstr = '保存';
      if (ctx.testMode) {
        btnstr = '测试生成';
      };
      return (
        <el-form-item>
          <el-button type="primary" onClick={ctx.handelBuild} >
            { btnstr }
          </el-button>
        </el-form-item>
      )
    }

    const FormItems = (
      <div>
        { selectProject() }
        { renderFormItem() }
        <el-form-item>
          { errDom() }
        </el-form-item>
        { saveOrBuild() }
      </div>
    )

    return (
      <data-card onRefresh={ctx.handelRefresh}>
        {
          h(
            ElForm,
            {
              ref: ctx.setRefs("ruleForm"),
              class: "data-form",
              model: ctx.form,
              "labelPosition": "right",
              "labelWidth": "80px",
            },
            {
              default: () => {
                return FormItems
              }
            }
          )
        }
      </data-card>
    )
  }
})