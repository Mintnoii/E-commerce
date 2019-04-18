<template>
  <div>
    <el-table 
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期" 
        width="180" />
      <el-table-column 
        prop="name" 
        label="姓名" 
        width="180" />

      <el-table-column
        prop="email"
        label="邮箱" 
        width="180" />
      <el-table-column
        prop="phone"
        label="手机" 
        width="180" />
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
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  async mounted(){
    let {status, data: {orders}} = await this.$axios.get('/manage/orders')
    console.log(data.orders)
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    }
  }
};
</script>