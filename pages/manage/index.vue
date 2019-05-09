<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card shadow="hover">
          <el-button 
            type="primary" 
            class="icons"
            icon="el-icon-user" 
            circle/>
          <div class="info">
            <p>{{ usercount }}</p>
            <p>用户数</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <el-button 
            type="warning" 
            class="icons"
            icon="el-icon-shopping-cart-full" 
            circle/>
          <div class="info">
            <p>{{ orderscount }}</p>
            <p>订单数</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          <el-button 
            type="success" 
            class="icons"
            icon="el-icon-truck" 
            circle/>
          <div class="info">
            <p>{{ shopscount }}</p>
            <p>商家数</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  layout: 'backend',
  data(){
    return {
      login: false,
      usercount: 0,
      orderscount: 0,
      shopscount: 0
    }
  },
/*   async asyncData({ctx, redirect }) {
    let {
      status,
      data: { user, role }
    } = await ctx.$axios.get("/users/getUser");
    console.log(status, user)
    if (user === "") {
      return redirect('/login')
    }
  }, */
  async mounted(){
    let {data: {users}} = await this.$axios.get('/manage/users')
    this.usercount = users.length
    let {data: {orders}}  = await this.$axios.get('/manage/orders')
    this.orderscount = orders.length
    let {data: {shops}}  = await this.$axios.get('/manage/shops')
    this.shopscount = shops.length
  }
}
</script>
<style lang="css" scoped>
  .icons{
    font-size: 45px;
  }
  .info {
    display: inline-block;
    margin-left: 15px;
    height: 72px;
    font-size: 16px;
    font-weight: bold;
  }
</style>