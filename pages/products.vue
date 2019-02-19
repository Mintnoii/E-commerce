<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword"/>
      <categroy
        :types="types"
        :areas="areas"/>
      <list :list="list"/>
    </el-col>
    <el-col :span="5">
      <!--没有经纬度则不显示该组件-->
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"/>
    </el-col>
  </el-row>

</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
// 组件名和html标签进行区分
import Amap from '@/components/public/map.vue'
export default {
  components:{
    Crumbs,
    Categroy,
    List,
    Amap
  },
  data(){
    return {
      // 子组件中要用到的数据
      list:[],
      types:[],
      areas:[],
      keyword:'',
      point:[]
    }
  },
  async asyncData(ctx){
    // 通过ctx.query获取请求的keyword
    let keyword = ctx.query.keyword 
    // 注意这里的字符是否进行编码 encodeURIComponent
    let city = ctx.store.state.geo.position.city
    let {status,data:{count,pois}} = await ctx.$axios.get('/search/resultsByKeywords',{
      params:{
        keyword,
        city
      }
    })
    let { status: status2, data: { areas, types } } = await ctx.$axios.get('/categroy/crumbs', {
      params: {
        city
      }
    })
    if(status===200&&count>0&&status2===200){
      return {
        // 先过滤掉没有图片的数据项，然后将剩下的数据项映射到list数组(传递给list数组)中
        list: pois.filter(item=>item.photos.length).map(item=>{
          return {
            type: item.type,
            img: item.photos[0].url,
            name: item.name,
            comment: Math.floor(Math.random()*10000), // 伪造评论数
            rate: Number(item.biz_ext.rating), // 数据类型转换
            price: Number(item.biz_ext.cost),
            scene: item.tag,
            tel: item.tel,
            status: '可订明日',
            location: item.location,
            module: item.type.split(';')[0] // 只取出第一个类型
          }
        }),
        keyword, // skill: query里的keyword传递到asyData里，然后再赋值给data里的keyword
        areas: areas.filter(item=>item.type!=='').slice(0,5), // 数据过滤与截取
        types: types.filter(item=>item.type!=='').slice(0,5),
        point: (pois.find(item=>item.location).location||'').split(',') // 找到第一个包含经纬度数据的item然后取到location，最后把字符串通过逗号分割成数组
      }
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
