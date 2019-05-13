<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>味心生活</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点">附近景点</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人">丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影">电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="(item, index) in cur"
        :key="item.title + index">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <a :href="'/products?keyword='+item.title">
            <img
              :src="item.img"
              class="image">
          </a>
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span><span class="address">{{ item.address }}</span></li>
          </ul>
        </el-card>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  data: () => {
    return {
      kind: 'all',
      list: {
        all: [],
        part: [],
        spa: [],
        movie: [],
        travel: []
      }
    }
  },
  computed: {
    cur: function () {
      return this.list[this.kind]
    }
  },
  // 页面加载完成后就要请求一次数据 keyword默认为 景点
  async mounted(){
    let self=this;
    let city = self.$store.state.geo.position.city
    let {status,data:{code,count,datas}}=await self.$axios.get('/search/resultsByKeywords',{
      params:{
        keyword:'景点',
        city: city
      }
    })
    if(status===200&&count>0){
      let r= datas.filter(item=>item.photos.length).map(item=>{
        return {
          title:item.name,
          pos:item.type.split(';')[0],
          price:item.biz_ext.cost||'暂无',
          img:item.photos[0].url,
          address: item.address||'',
          url:'//abc.com'
        }
      })
      self.list[self.kind]=r.slice(0,9)
    }else{
      self.list[self.kind]=[]
    }
  },
  methods: {
    over: async function(e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      let self = this
      if(tag === 'dd') {
        this.kind = dom.getAttribute('kind')
        let keyword = dom.getAttribute('keyword')
        let {status,data:{count,datas}} = await self.$axios.get('/search/resultsByKeywords',{
          params:{
            keyword,
            city:self.$store.state.geo.position.city
          }
        })
        if(status === 200 && count > 0){
          console.log(datas)
          // 通过map与后端数据进行映射
          let r = datas.filter(item=>item.photos.length).map(item=>{
            return {
              title:item.name,
              pos:item.type.split(';')[0],
              price:item.biz_ext.cost||'暂无',
              img:item.photos[0].url,
              address: item.address||'',
              url:'//abc.com'
            }
          })
          self.list[self.kind]=r.slice(0,9)
        }else{
          self.list[self.kind]=[]
        }
      }
    }
  },
}
</script>

<style lang="scss">
  @import "@/assets/css/index/artistic.scss";
</style>