<template> 
  <el-col :span="12">
    <el-form 
      :model="ruleForm2" 
      status-icon 
      :rules="rules2" 
      ref="ruleForm2" 
      label-width="100px" 
      class="demo-ruleForm">
      <el-form-item 
        label="昵称"
        prop="nickname">
        <el-input v-model.number="ruleForm2.nickname"/>
      </el-form-item>
      <el-form-item 
        label="密码" 
        prop="pass">
        <el-input 
          type="password" 
          v-model="ruleForm2.pass" 
          auto-complete="off"/>
      </el-form-item>
      <el-form-item 
        label="确认密码" 
        prop="checkPass">
        <el-input 
          type="password" 
          v-model="ruleForm2.checkPass" 
          auto-complete="off"/>
      </el-form-item>
      <el-form-item 
        label="手机号" 
        prop="checkPhone">
        <el-input 
          type="number" 
          v-model="ruleForm2.checkPhone" 
          auto-complete="off"/>
      </el-form-item>
      <el-form-item
        prop="checkEmail"
        label="邮箱"
        :rules="[
          { message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]"
      >
        <el-input v-model="ruleForm2.checkEmail"/>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
  export default {
    layout: 'backend',
    data() {
      var checkNickname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'))
        }
        setTimeout(() => {
          if (!/^[A-Za-z0-9]+$/.test(value)) {
            callback(new Error('昵称只能为字母和数字'));
          }else {
              callback();
            }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var checkPhone = (rule, value, callback) => {
        if (!/^1[3|4|5|7|8][0-9]\d{8}$/.test(value)) {
          return callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          nickname: '',
          checkPhone: '',
          checkEmail: ''
        },
        rules2: {
          pass: [
            { required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: 'blur' }
          ],
          nickname: [
            { required: true, validator: checkNickname, trigger: 'blur' }
          ],
          checkPhone: [
            { validator: checkPhone, trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
             this.$notify({
                title: '添加成功',
                message: `您已成功添加管理员${this.ruleForm2.nickname}`,
                type: 'success'
              })
          } else {
            this.$message.error('添加失败，error submit !!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>