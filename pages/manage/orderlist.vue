<template>
  <div>
    <el-table 
      border
      align="center"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
      :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign: 'center'}"
      style="width: 100%">
      <el-table-column label="下单日期">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column 
        prop="user" 
        label="会员ID" />
      <el-table-column 
        prop="name" 
        label="商品名" />
      <el-table-column
        prop="count"
        label="商品数量" />
      <el-table-column
        prop="total"
        label="金额" />
      <el-table-column
        prop="status"
        label="状态" />
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 5, 10]" 
      :page-size="pagesize" 
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length" />
  </div>
</template>

<script>
export default {
  layout: 'backend',
  data() {
    return {
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      tableData: []
    };
  },
  async mounted(){
    let {status, data: {orders}}  = await this.$axios.get('/manage/orders')
    console.log(orders)
    this.tableData = orders.map( item =>{
      return {
        date: item.time,
        name: item.name,
        user: item.user,
        count: item.count,
        total: item.total,
        status: item.status===1?'已支付':'未支付'
      }
    })
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage
      console.log(this.currentPage)  //点击第几页
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    formatTen: function(num) { 
      return num > 9 ? (num + "") : ("0" + num)
    },
 
    formatDate: function (date) { 
      var year = date.getFullYear()
      var month = date.getMonth() + 1 
      var day = date.getDate() 
      var hour = date.getHours() 
      var minute = date.getMinutes() 
      var second = date.getSeconds() 
      return year + "-" + formatTen(month) + "-" + formatTen(day) 
    } 
  }
};
</script>