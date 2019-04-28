<template>
  <el-col :span="12">
    <el-form 
      ref="form" 
      :model="form" 
      label-width="80px">
      <el-form-item label="商家名称">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="商家地址">
        <el-input v-model="form.region"/>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-col :span="11">
          <el-date-picker 
            type="date" 
            placeholder="选择日期" 
            v-model="form.date1"/>
        </el-col>
        <el-col 
          class="line" 
          :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker 
            placeholder="选择时间" 
            v-model="form.date2"/>
        </el-col>
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery"/>
      </el-form-item>
      <el-form-item label="商家性质">
        <el-checkbox-group v-model="form.type">
          <el-checkbox 
            label="美食/餐厅"
            name="type"/>
          <el-checkbox 
            label="生活服务" 
            name="type"/>
          <el-checkbox 
            label="电影/娱乐" 
            name="type"/>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="线上品牌商赞助"/>
          <el-radio label="线下场地免费"/>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="商家备注">
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
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>