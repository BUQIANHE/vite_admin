<script lang="ts" name="Password" setup>
import { updatePassword } from '@/api/public'
import { FormInstance } from 'element-plus'

const pwdFormRef = ref<FormInstance>()
const visibleModule = ref<boolean>(false)

interface PwdProps {
  userId: number
  userName: string
  password: string
  checkPassword: string
}
const model = reactive<PwdProps>({
  userId: 0,
  userName: '',
  password: '',
  checkPassword: ''
})

interface FormProps {
  [x: string]: any
}
const formParams = (params: FormProps) => {
  model.userId = +params.userId
  model.userName = params.userName
  visibleModule.value = true
}

const pwdReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/
const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请填写新密码'))
  } else if (!pwdReg.test(value)) {
    callback(
      new Error('请填写6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种')
    )
  } else {
    if (model.checkPassword !== '') {
      if (!pwdFormRef.value) return
      pwdFormRef.value.validateField('checkPassword', () => null)
    }
    callback()
  }
}

const validateCheckPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请重新填写新密码'))
  } else if (value !== model.password) {
    callback(new Error('两次密码不一样！'))
  } else {
    callback()
  }
}
const rules = reactive({
  password: [{ validator: validatePassword, trigger: 'blur' }],
  checkPassword: [{ validator: validateCheckPassword, trigger: 'blur' }]
})

const submit = () => {
  pwdFormRef.value?.validate(async (valid) => {
    if (!valid) return
    try {
      const params = {
        userId: model.userId,
        password: model.password
      }
      const res = await updatePassword(params)
      if (res.code === 200) {
        ElMessage.success('密码修改成功')
        close()
      }
    } catch (err) {
      console.log(err)
    }
  })
}

const close = () => {
  pwdFormRef.value!.resetFields()
  visibleModule.value = false
}

defineExpose({
  formParams
})
</script>

<template>
  <el-dialog v-model="visibleModule" title="修改密码" width="25%" draggable>
    <el-form ref="pwdFormRef" :model="model" :rules="rules" label-position="top" status-icon>
      <el-form-item label="用户账号" prop="userName">
        <el-input v-model="model.userName" disabled autocomplete="off" />
      </el-form-item>
      <el-form-item label="新密码" prop="password">
        <el-input v-model="model.password" show-password autocomplete="off" />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPassword">
        <el-input v-model="model.checkPassword" show-password autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
