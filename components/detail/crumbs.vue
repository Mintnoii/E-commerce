<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }">味心</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">{{ type }}</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">{{ decodeURIComponent(keyword) }}</a></el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type:String,
      default:''
    },
    type: {
      type:String,
      default:''
    }
  }
}
</script>
