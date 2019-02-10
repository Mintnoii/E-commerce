<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item">
        <!--通过hash的方式实现跳转到指定城市区域-->
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section">
      <!--通过指定id来实现跳转-->
      <dt :id="'city-'+item.title">{{ item.title }}</dt>
      <dd>
        <span
          v-for="c in item.city"
          :key="c">{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
// 把后端中文字段处理成拼音的库
import pyjs from 'js-pinyin'
export default {
  data(){
    return {
      // 字母导航列表
      list:'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block:[] // ['title', 'city']
    }
  },
  async mounted(){
    let self=this;
    let blocks=[]
    let {status,data:{city}}=await self.$axios.get('/geo/city');
    if(status===200){
      let p
      let c
      let d={} // 每个拼音字母对应的数组
      city.forEach(item=>{
        // 取得每个城市的拼音首字母再转换成小写
        p=pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0,1)
        // 得到这个小写首字母的code值
        c=p.charCodeAt(0)
        // 从a(97)到z(122)
        if(c>96&&c<123){
          if(!d[p]){
            // d[p]临时变量：如果没有这个字母相关的城市列表 那么声明这样一个数组
            d[p]=[]
          }
          // 如果有的这个字母相关数组的话就把当前城市放进去
          d[p].push(item.name)
        }
      })
      // 遍历d对象 将其变成一个数组
      for(let [k,v] of Object.entries(d)){
        // 遵从block的数据格式
        blocks.push({
          title:k.toUpperCase(), // d 中存储的字母
          city:v // d[p]的数组结果
        })
      }
      // 从a到z排序
      blocks.sort((a,b)=>a.title.charCodeAt(0)-b.title.charCodeAt(0))
      self.block=blocks
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/categroy.scss";
</style>
