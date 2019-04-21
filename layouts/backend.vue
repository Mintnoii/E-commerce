<template>
  <el-container class="layout-default">
    <el-header height="80px">
      <h1>我是头部</h1>
      <User/>
    </el-header>
    <el-container class="content">
      <el-aside width="200px">
        <el-menu
          default-active="用户列表"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          @select="handleMenuSelect"
        >
          <el-submenu index="数据管理">
            <template slot="title">
              <i class="el-icon-document"/>
              <span>数据管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">用户</template>
              <nuxt-link to="/manage/userlist"><el-menu-item index="用户列表">用户列表</el-menu-item></nuxt-link>
              <nuxt-link to="/manage/orderlist"><el-menu-item index="订单列表">订单列表</el-menu-item></nuxt-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <template slot="title">管理员</template>
              <nuxt-link to="/manage/adminlist"><el-menu-item index="管理员列表">管理员列表</el-menu-item></nuxt-link>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"/>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item 
            index="3" 
            disabled>
            <i class="el-icon-document"/>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"/>
            <span slot="title">导航四</span>
          </el-menu-item>
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
        </el-breadcrumb>
        <div class="maincontent">
          <nuxt/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import User from '@/components/public/header/user.vue'
export default {
  components:{
    User
  },
  data(){
    return {
      breads: []
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
.maincontent {
  margin: 20px;
}
</style>
