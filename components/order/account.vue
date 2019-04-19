<template>
  <div class="account">
    <h1>个人信息</h1>
    <span>账户设置</span>
    <hr>
    <div class="section">
      <span>昵称</span>
      <span>{{ name }}</span>
    </div>
    <hr>
    <div class="section">
      <span>手机</span>
      <span>{{ phone }}</span>
    </div>
    <hr>
    <div class="section">
      <span>邮箱</span>
      <span>{{ email }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name:'Account',
  data(){
    return {
      name: '',
      phone: '',
      email: ''
    }
  },
  async mounted(){
    const {status,data:{user,phone,email}} = await this.$axios.get('/users/getUser')
    this.name = user
    this.phone = phone
    this.email = email
  }
}
</script>
<style scoped>
.account{
  min-height: 450px;
}
h1 {
  color: black;
  margin-bottom: 10px;
  font-weight: bold;
}
span {
  display: inline-block;
  color: gray;
  margin-bottom: 10px;
}
.section {
  height: 80px;
  flex: 1;
  line-height: 80px;
  flex-direction: row;
  display: flex;
  text-align: center;
}
</style>