<template>
  <div class="m-menu">
    <dl 
      class="nav"
      @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd 
        v-for="(item, idx) in $store.state.home.menu" 
        :key="idx"
        @mouseenter="enter">
        <i :class="item.type"/>{{ item.name }}<span class="arrow"/>
      </dd>
    </dl>
    <!--注意这里不能用v-show 页面刚加载时kind为空，curdetail返回的也是空对象没有child属性 会报错-->
    <div 
      class="detail" 
      v-if="kind"
      @mouseenter="sover"
      @mouseleave="sout">
      <!--template 上不能写 :key-->
      <template v-for="(item,idx) in curdetail.child">
        <h4 :key="idx">{{ item.title }}</h4>
        <span
          v-for="v in item.child"
          :key="v.name"><a 
            :href="v.link"
            target="_blank">{{ v.name }}</a></span>
      </template>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 鼠标hover时的种类
      kind: '',
      menu: [{
        type: 'food',
        name: '美食',
        // 右侧弹窗内的子项数组
        child: [{
          title: '美食',
          child: ['代金券','甜品','火锅','自助餐']
        }]
      },{
        type: 'takeout',
        name: '外卖',
        child: [{
          title: '外卖',
          child: [{
            name: '美团外卖',
            link: 'http://waimai.meituan.com/new/waimaiIndex'
          },{
            name: '饿了吗',
            link: 'http://waimai.meituan.com/new/waimaiIndex'
          }]
        }]
      },{
        type: 'hotel',
        name: '酒店',
        child: [{
          title: '酒店星级',
          child: ['经济型','舒适/三星','高档/四星','豪华/五星']
        }]
      }]
    }
  },
  computed: {
    curdetail: function() {
      // 根据判断当前鼠标hover的kind和每个菜单项的type将应该显示的菜单项过滤出来
      return this.$store.state.home.menu.filter((item) => item.type === this.kind)[0]
    }
  },
    methods:{
      mouseleave:function(){
        let self=this;
        self._timer=setTimeout(function(){
          self.kind=''
        },150)
    },
    enter:function(e){
      this.kind=e.target.querySelector('i').className
    },
    sover:function(){
      // 如果鼠标进入了右侧弹窗，要及时清除掉nav块里的定时器，因为它会将kind置为空，导致右侧的弹窗消失
      clearTimeout(this._timer)
    },
    sout:function(){
      // 鼠标移出右侧弹窗 将kind置为空让这个弹窗消失
      this.kind=''
    }
  }
}
</script>
