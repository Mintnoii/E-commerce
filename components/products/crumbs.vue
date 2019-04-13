<template>
  <div class="m-crumbs">
    <!--面包屑组件-->
    <el-breadcrumb separator=">">
      <!--直接从vuex中获取数据(去掉城市中的‘市’)，不用再发送异步请求-->
      <el-breadcrumb-item :to="{ path: '/' }">{{ $store.state.geo.position.city.replace('市','') }}味心</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">{{ $store.state.geo.position.city.replace('市','') }}{{ decodeURIComponent(keyword) }}</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    // 从外部传递进来关键词
    keyword: {
      type: String,
      default: ''
    }
  }
}
</script>
