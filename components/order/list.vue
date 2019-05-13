<template>
  <div class="m-order">
    <ul>
      <li v-if="cur.length">
        <el-row
          v-for="(item,idx) in cur"
          :key="idx"
        >
          <el-col :span="4">
            <img :src="item.img">
          </el-col>

          <el-col :span="10">
            <h4>{{ item.name }}</h4>
            <p>数量:{{ item.count }}</p>
          </el-col>

          <el-col :span="4">
            总价：￥{{ item.total }}
          </el-col>
          <el-col :span="6">
            <el-button
              v-if="item.status === 0"
              type="warning"
              @click="pay(item)"
              round>
              {{ item.statusTxt }}
            </el-button>
            <el-button
              v-else
              type="success"
              icon="el-icon-check" 
              round>
              {{ item.statusTxt }}
            </el-button>
          </el-col>

        </el-row>

      </li>
      <li
        v-else
        class="empty"
      >

        没有订单
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
      name: "List",
      props:{
          cur:{
            type:Array,
            default:()=>{
              return []
            }
          }
      },
      methods: {
        async pay(item){
          // console.log(item)
          let res = await this.$axios.post('/order/updateOrder',{id: item.id})
          this.$message({
            message: '订单支付成功',
            type: 'success'
          })
          item.status = 1
          item.statusTxt = '已付款'
          this.$emit('updatecur' , item)
        }
      }
    }
</script>

<style scoped>

</style>
