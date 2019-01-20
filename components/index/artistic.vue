<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点">全部</dd>
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
        v-for="item in cur"
        :key="item.title">
        <el-card
          :body-style="{ padding: '0px' }"
          shadow="never">
          <img
            :src="item.img"
            class="image">
          <ul class="cbody">
            <li class="title">{{ item.title }}</li>
            <li class="pos"><span>{{ item.pos }}</span></li>
            <li class="price">￥<em>{{ item.price }}</em><span>/起</span></li>
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
        all: [{
          title: 'all000',
          img: 'https://p1.meituan.net/phoenix/27086e2f3f1f1ebbfd81d4d7101c6676699122.jpg@1440w_962h_1e_1c_1l',
          pos: '外滩',
          price: 235
        },{
          title: 'all001',
          img: 'https://p1.meituan.net/phoenix/27086e2f3f1f1ebbfd81d4d7101c6676699122.jpg@1440w_962h_1e_1c_1l',
          pos: '外滩',
          price: 253
        },{
          title: 'all002',
          img: 'https://p1.meituan.net/phoenix/27086e2f3f1f1ebbfd81d4d7101c6676699122.jpg@1440w_962h_1e_1c_1l',
          pos: '外滩',
          price: 532
        }],
        part: [{
          title: 'all000',
          img: 'https://p1.meituan.net/phoenix/27086e2f3f1f1ebbfd81d4d7101c6676699122.jpg@1440w_962h_1e_1c_1l',
          pos: '外滩',
          price: 244
        },{
          title: 'all001',
          img: 'https://p1.meituan.net/phoenix/27086e2f3f1f1ebbfd81d4d7101c6676699122.jpg@1440w_962h_1e_1c_1l',
          pos: '外滩',
          price: 236
        },{
          title: 'all002',
          img: 'https://p1.meituan.net/phoenix/27086e2f3f1f1ebbfd81d4d7101c6676699122.jpg@1440w_962h_1e_1c_1l',
          pos: '外滩',
          price: 275
        }],
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
  methods: {
    over: function(e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      let self = this
      if(tag === 'dd') {
        this.kind = dom.getAttribute('kind')
      }else{
        self.list[self.kind]=[]
      }
    }
  },
}
</script>

<style lang="scss">
  @import "@/assets/css/index/artistic.scss";
</style>