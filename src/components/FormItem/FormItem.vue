<script lang="ts" name="FormItem" setup>
import { isChildComponent } from '@/utils'
import {
  ElButton,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElMessage,
  ElScrollbar,
  FormInstance,
  FormRules
} from 'element-plus'
import { ColumnProps } from '../ProTable/types'

interface FormItemProps {
  formColumns?: Partial<ColumnProps>[] // 渲染的表单项
  apiRequest?: (params?: any) => Promise<any> // 提交数据的请求接口 （新增和修改）
  refreshTable?: (params?: any) => Promise<any> // 重新获取表格数据
  model?: any // 表单显示的数据
  rules?: FormRules // 表单项的验证规则
  isUseSlot: boolean // 表单项是否有使用插槽的情况
  isAdd: boolean
  readonly: boolean
  formTitle: string
}

// PS 这里需要注意一点,传过来的值可选的是必传的,要有默认值, 必传的是可选的, 不需要默认值, 逻辑刚好互反
const formItemData = ref<FormItemProps>({
  isUseSlot: false,
  isAdd: false,
  readonly: false,
  formTitle: '标题'
})

const formItemParams = (params: FormItemProps): void => {
  formItemData.value = params
  visibleDrawer.value = true
}

const formRef = ref<FormInstance>()
const visibleDrawer = ref<boolean>(false)
// 关闭抽屉
const close = () => {
  formRef.value!.resetFields()
  visibleDrawer.value = false
}

const emits = defineEmits(['submit'])

const submit = async () => {
  await formRef.value!.validate(async (valid) => {
    if (!valid) return
    if (!formItemData.value.isUseSlot) {
      try {
        const res = await formItemData.value.apiRequest!(formItemData.value.model)
        if (res?.code === 200) {
          ElMessage.success(res?.msg)
          formItemData.value.refreshTable!()
          visibleDrawer.value = false
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      emits('submit', formItemData.value.model)
    }
  })
}

defineExpose({
  formItemParams,
  close
})
</script>

<template>
  <div class="form_item">
    <el-drawer
      v-model="visibleDrawer"
      :destroy-on-close="true"
      :title="`${formItemData.readonly ? '查看' : formItemData.isAdd ? '新增' : '修改'}${
        formItemData.formTitle
      }`"
      @close="close"
    >
      <template #default>
        <el-scrollbar class="scroll_form">
          <el-form
            ref="formRef"
            :model="formItemData.model"
            :rules="formItemData.rules"
            label-position="top"
            status-icon
            class="main_form flex jsb wrap"
          >
            <template v-for="item in formItemData.formColumns" :key="item.prop">
              <slot :name="`${item.prop!}Item`" :row="item">
                <el-form-item :label="item.label" :prop="item.prop">
                  <slot :name="item.prop!" :row="item">
                    <component
                      :is="`el-${item.type}`"
                      v-bind="item.attrs"
                      v-model="formItemData.model[item.prop!]"
                      :disabled="formItemData.readonly"
                    >
                      <template v-if="item?.children?.length">
                        <template v-for="(child, i) in item.children" :key="i">
                          <template v-if="item.type === 'select'">
                            <component
                              v-bind="child.attrs"
                              :is="`el-${isChildComponent(item.type)}`"
                              :disabled="formItemData.readonly"
                              :label="child.label"
                              :value="child.value"
                            />
                          </template>
                          <template
                            v-if="item.type === 'radio-group' || item.type === 'checkbox-group'"
                          >
                            <component
                              v-bind="child.attrs"
                              :is="`el-${isChildComponent(item.type!)}`"
                              :label="child.value"
                              :disabled="formItemData.readonly"
                              >{{ child.label }}</component
                            >
                          </template>
                        </template>
                      </template>
                    </component>
                  </slot>
                </el-form-item>
              </slot>
            </template>
          </el-form>
        </el-scrollbar>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="close">取消</el-button>
          <el-button v-if="!formItemData.readonly" type="primary" @click="submit">提交</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style lang="scss" scoped>
.form_item {
  :deep(.el-drawer) {
    min-width: 500px;
  }

  :deep(.el-drawer__header) {
    border-bottom: 1px solid var(--el-border-color-light);
    padding: 14px 18px;
    margin-bottom: 0;

    h4 {
      margin: 0;
    }
  }

  :deep(.el-drawer__body) {
    padding: 0;
  }

  :deep(.el-input__wrapper) {
    width: calc(100% - 22px);
  }

  :deep(.el-select-v2) {
    width: 100%;
  }

  :deep(.el-select) {
    width: 100%;
  }

  .scroll_form {
    height: 100%;
    padding: 0 18px;

    :deep(.el-form) {
      padding-top: 18px;
    }
  }

  :deep(.el-form-item) {
    width: 100%;
  }

  :deep(.el-drawer__footer) {
    border-top: 1px solid var(--el-border-color-light);
    padding: 12px 18px;
  }

  @media screen and (max-width: 1440px) {
    :deep(.el-form-item) {
      width: 100%;
    }
  }
}
</style>
