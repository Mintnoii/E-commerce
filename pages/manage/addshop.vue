<template>
  <el-col :span="12">
    <el-form 
      ref="form" 
      :model="form" 
      label-width="120px">
      <el-form-item 
        label="店铺名称"
        prop="name"
        :rules="[
          { required: true, message: '请输入店铺名称', trigger: 'blur' }
      ]">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item 
        label="所在城市"
        prop="city"
        :rules="[
          { required: true, message: '请输入所在城市', trigger: 'blur' }
      ]">
        <el-input v-model="form.city"/>
      </el-form-item>
      <el-form-item 
        label="街道地址"
        prop="address"
        :rules="[
          { required: true, message: '请输入店铺所在街道', trigger: 'blur' }
      ]">
        <el-input v-model="form.address"/>
      </el-form-item>
      <el-form-item 
        label="联系方式"
        prop="concat"
        :rules="[
          { required: true, message: '请输入手机号/电话等联系方式', trigger: 'blur' }
      ]">
        <el-input 
          type="Number"
          pattern="[0-9]*"
          v-model="form.concat"/>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker 
          type="date" 
          placeholder="选择日期" 
          v-model="form.date"/>
      </el-form-item>
      <el-form-item 
        label="店铺性质"
        prop="type"
        :rules="[
          { required: true, message: '必须选择店铺性质', trigger: 'blur' }
      ]">
        <el-radio-group v-model="form.type">
          <el-radio label="风景名胜"/>
          <el-radio label="美食餐厅"/>
          <el-radio label="电影娱乐"/>
          <el-radio label="生活服务"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item 
        label="商品类别"
        prop="tag"
        :rules="[
          { required: true, message: '请编辑商品类别', trigger: 'blur' }
      ]">
        <el-input v-model="form.tag"/>
      </el-form-item>
      <el-form-item 
        label="优惠价格"
        prop="cost"
        :rules="[
          { required: true, message: '请输入商品的价格', trigger: 'blur' }
      ]">
        <el-input 
          type="Number"
          pattern="[0-9]*"
          v-model="form.cost"/>
      </el-form-item>
      <el-form-item 
        label="图片地址1"
        prop="pic1"
        :rules="[
          { required: true, message: '至少填入两个店铺/商品图片地址', trigger: 'blur' }
      ]">
        <el-input v-model="form.pic1"/>
      </el-form-item>
      <el-form-item 
        label="图片地址2"
        prop="pic2"
        :rules="[
          { required: true, message: '至少填入两个店铺/商品图片地址', trigger: 'blur' }
      ]">
        <el-input v-model="form.pic2"/>
      </el-form-item>
      <el-form-item label="店铺备注">
        <el-input 
          type="textarea" 
          v-model="form.desc"/>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          @click="onSubmit('form')">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
  export default {
    layout: 'backend',
    data() {
      return {
        form: {
          name: '',
          city: '',
          address: '',
          concat: '',
          pic1: '',
          pic2: '',
          cost: 0,
          date: '',
          tag: '',
          type: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$axios.post('/manage/addshop',{ 
              name: this.form.name,
              city: this.form.city,
              photos: [{
                "url": this.form.pic1
              },{
                "url": this.form.pic2
              }],
              address: this.form.address,
              concat: this.form.concat,
              date: this.form.date,
              cost: this.form.cost,
              tag: [this.form.tag],
              type: this.form.type,
              desc: this.form.desc
            }).then(({status,data})=>{
              if(status===200){
                if(data&&data.code===0){
                  this.dialogVisible = false
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  })
                  this.form = {}
                }
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>