<template>
  <el-container class="layout-default">
    <el-container class="content">
      <el-aside width="200px">
        <el-menu
          default-active="home"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleMenuSelect"
        > 
          <nuxt-link to="/manage/">
            <el-menu-item index="home">
              <i class="el-icon-menu"/>
              <span slot="title">系统首页</span>
            </el-menu-item>
          </nuxt-link>
          <el-submenu index="数据列表">
            <template slot="title">
              <i class="el-icon-document"/>
              <span>数据列表</span>
            </template>
            <el-menu-item-group>
              <template slot="title">用户</template>
              <nuxt-link to="/manage/userlist"><el-menu-item index="用户列表">用户列表</el-menu-item></nuxt-link>
              <nuxt-link to="/manage/orderlist"><el-menu-item index="订单列表">订单列表</el-menu-item></nuxt-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">商家</template>
              <nuxt-link to="/manage/shoplist"><el-menu-item index="商家列表">商家列表</el-menu-item></nuxt-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <nuxt-link to="/manage/adminlist"><el-menu-item index="管理员列表">管理员列表</el-menu-item></nuxt-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="添加数据">
            <template slot="title">
              <i class="el-icon-edit-outline"/>
              <span>添加数据</span>
            </template>
            <el-menu-item-group>
              <nuxt-link to="/manage/addshop"><el-menu-item index="添加商铺">添加商铺</el-menu-item></nuxt-link>
              <nuxt-link to="/manage/addadmin" >
                <el-menu-item index="添加管理员">添加管理员
                </el-menu-item>
              </nuxt-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="系统说明">
            <template slot="title">
              <i class="el-icon-info"/>
              <span>系统说明</span>
            </template>
            <el-menu-item-group>
              <nuxt-link to="/manage/system"><el-menu-item index="系统说明">系统说明</el-menu-item></nuxt-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <el-breadcrumb 
          class="breadcrumb" 
          separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/manage' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item 
            v-for="(list,index) in breads" 
            :key="index">{{ list }}</el-breadcrumb-item>
          <span class="user">
            <i class="el-icon-s-custom"/>
            欢迎您，{{ user }}
          </span>
        </el-breadcrumb>
        <div class="maincontent">
          <nuxt/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data(){
    return {
      user: '',
      role: '',
      breads: []
    }
  },
  computed: {
    issuper(){
      return this.role === 'super'?false:true
    }
  },
  async mounted(){
    let {
      status,
      data: { user, role }
    } = await this.$axios.get("/users/getUser");
    if (status === 200) {
      this.user=user
      this.role = role
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleMenuSelect(index,indexPath){
      this.breads=indexPath;
      console.log(this.breads)
    }
  }
};
</script>
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}
.layout-default {
  min-height: 100vh;
}
.el-aside {
  background-color: #535c64;
  color: #333;
  text-align: center;
}
.el-menu {
  text-align: left;
}
.el-main {
  color: #333;
  text-align: center;
}
.breadcrumb {
  height: 60px;
  background: #eff2f7;
  padding-left: 20px;
  line-height: 60px;
}
.user{
  float: right;
  margin-right: 30px;
}
.maincontent {
  margin: 20px;
}
</style>
