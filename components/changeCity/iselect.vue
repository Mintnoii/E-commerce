<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.id"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <!--通过disable属性和省份选择关联起来-->
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <!-- elementUI input输入框的远程搜索-->
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data(){
    return {
      province:[],
      pvalue:'',
      city:[],
      cvalue:'',
      input:'',
      // 全国的城市列表数据
      cities:[]
    }
  },
  watch:{
    // 监听province 并改变省份数据内的城市数据
    pvalue:async function(newPvalue){
      let self=this;
      let {status,data:{city}}=await self.$axios.get(`/geo/province/${newPvalue}`)
      if(status===200){
        self.city=city.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
        // 切换省份后 清空上一次选择的城市数据
        self.cvalue=''
      }
    }
  },
  // 页面加载时异步请求到所有省份的数据
  mounted:async function(){
    let self=this;
    let {status,data:{province}}=await self.$axios.get('/geo/province')
    console.log(province)
    if(status===200){
      self.province=province.map(item=>{
        return {
          id: item.id,
          value:item.name,
          label:item.name
        }
      })
    }
  },
  methods:{
    // 利用loadsh的方法做延时处理
    querySearchAsync:_.debounce(async function(query,cb){
      let self=this;
      // 如果已经有了所有城市的数据
      if(self.cities.length){
        // 简单的过滤搜索
        cb(self.cities.filter(item => item.value.indexOf(query)>-1))
      }else{
        let {status,data:{city}}=await self.$axios.get('/geo/city')
        if(status===200){
          self.cities=city.map(item=>{return {
            value:item.name
          }})
          // 再回调里做过滤处理
          cb(self.cities.filter(item => item.value.indexOf(query)>-1))
        }else{
          cb([])
        }
      }
    },200),
    handleSelect:function(item){
      // window.location.href 页面跳转
      console.log(item.value);
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
