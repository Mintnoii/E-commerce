<template>
  <div>
    <el-table 
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
      :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign: 'center'}"
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
        label="手机"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
            :disabled="issuper"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
      role: '',
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      tableData: []
    };
  },
 computed: {
    issuper(){
      return this.role === 'super'?false:true
    }
  },
  async mounted(){
    console.log(this.admin)
    let {
      status,
      data: { role }
    } = await this.$axios.get("/users/getUser");
    if (status === 200) {
      this.role = role;
    }
    let {status2, data: {admins}} = await this.$axios.get('/manage/admins')
    this.tableData = admins.map( item =>{
      return {
        date: "2016-05-01",
        name: item.username,
        phone: item.phone,
        email: item.email
      }
    })
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
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>