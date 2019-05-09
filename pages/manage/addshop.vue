<template>
  <el-col :span="12">
    <el-form 
      ref="form" 
      :model="form" 
      label-width="80px">
      <el-form-item label="店铺名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="所在城市">
        <el-input v-model="form.city"/>
      </el-form-item>
      <el-form-item label="街道地址">
        <el-input v-model="form.address"/>
      </el-form-item>
      <el-form-item label="联系方式">
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
      <el-form-item label="店铺性质">
        <el-radio-group v-model="form.type">
          <el-radio label="美食/餐厅"/>
          <el-radio label="电影/娱乐"/>
          <el-radio label="生活服务"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-checkbox-group v-model="form.tag">
          <el-checkbox 
            label="线上品牌商赞助"
            name="type"/>
          <el-checkbox 
            label="线下场地免费" 
            name="type"/>
          <el-checkbox 
            label="优惠活动" 
            name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="店铺备注">
        <el-input 
          type="textarea" 
          v-model="form.desc"/>
      </el-form-item>
      <el-form-item>
        <el-button 
          type="primary" 
          @click="onSubmit">立即创建</el-button>
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
          date: '',
          tag: [],
          type: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        this.$axios.post('/manage/addshop',{ 
          name: this.form.name,
          city: this.form.city,
          address: this.form.address,
          concat: this.form.concat,
          date: this.form.date,
          tag: this.form.tag,
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
        console.log('submit!');
      }
    }
  }
</script>