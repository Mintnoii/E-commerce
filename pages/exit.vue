<template>
  <div class=""/>
</template>

<script>
export default {
  layout: 'blank',
  // 利用中间件来实现退出功能，路由到达退出页面后会自动执行这个动作
  middleware: async (ctx) => {
    let {status,data}=await ctx.$axios.get('/users/exit')
    if(status===200&&data&&data.code===0){
      window.location.href='/'
    }
  }
}
</script>
