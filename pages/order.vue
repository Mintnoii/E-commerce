<template>
  <div class="page-order">
    <el-row>
      <el-col
        :span="4"
        class="navbar">
        <h3>味心生活</h3>
        <dl>
          <dt>我的订单</dt>
          <dd @click="currenttab='orders'">
            <i class="el-icon-tickets"/>
            订单列表
            <i class="el-icon-arrow-right arrow"/>
          </dd>
        </dl>
        <!-- <dl>
          <dt>我的收藏</dt>
          <dd>
            <i class="el-icon-star-off"/>
            收藏列表
            <i class="el-icon-arrow-right arrow"/>
          </dd>
        </dl> -->
        <dl>
          <dt>个人信息</dt>
          <dd @click="currenttab='account'">
            <i class="el-icon-setting"/>
            账户设置
            <i class="el-icon-arrow-right arrow"/>
          </dd>
        </dl>
      </el-col>
      <el-col 
        :span="19" 
        class="table">
        <el-tabs 
          v-model="activeName" 
          v-if="currenttab==='orders'"
          @tab-click="handleClick">
          <el-tab-pane 
            label="全部订单" 
            name="all">
            <List 
              @updatecur="changecur"
              :cur="cur"/>
          </el-tab-pane>

          <el-tab-pane 
            label="待付款" 
            name="unpay">
            <List 
              @updatecur="changecur"
              :cur="cur"/>
          </el-tab-pane>
          <el-tab-pane 
            label="已付款" 
            name="payed">
            <List
              @updatecur="changecur" 
              :cur="cur"/>
          </el-tab-pane>
        </el-tabs>
        <account v-show="currenttab==='account'"/>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import List from "@/components/order/list.vue";
import Account from '@/components/order/account.vue'
export default {
  name: "Order",
  components: {
    List,
    Account
  },
  data() {
    return {
      activeName: "all",
      currenttab: 'orders',
      list: [],
      cur: []
    };
  },
  watch: {
    activeName: function(val) {
      this.cur = this.list.filter(item => {
        if (val === "unpay") {
          return item.status === 0
        } else if(val === "payed"){
          return item.status === 1
        }else if (val === "all") {
          return true;
        } else {
          return false;
        }
      })
    },
    list: function() {
      let val = this.name
      this.cur = this.list.filter(item => {
        if (val === "unpay") {
          return item.status === 0
        } else if(val === "payed"){
          return item.status === 1
        }else if (val === "all") {
          return true;
        } else {
          return false;
        }
      })
    }
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    },
    changecur(item) {
      console.log(item)
      var foundIndex = this.list.findIndex(x => x.id == item.id)
      this.list[foundIndex] = item
      console.log(this.list)
    }
  },
  async asyncData(ctx) {
    let {
      status,
      data: { code, list }
    } = await ctx.$axios.post("/order/getOrders");
    if (status === 200 && code === 0 && list.length) {
      return {
        // 前端有一个数据结构 后端也是有数据结构，必须进行前后端映射
        list: list.map(item => {
          return {
            img: item.imgs.length ? item.imgs[0].url : "/logo.png",
            id: item._id,
            name: item.name,
            count: item.count,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? "待付款" : "已付款"
          };
        }),
        cur: list.map(item => {
          return {
            img: item.imgs.length ? item.imgs[0].url : "/logo.png",
            id: item._id,
            name: item.name,
            count: item.count,
            total: item.total,
            status: item.status,
            statusTxt: item.status === 0 ? "待付款" : "已付款"
          };
        })
      };
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/order/index.scss";
</style>
