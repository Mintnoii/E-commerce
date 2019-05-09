<template>
  <div>
    <el-table 
      border
      align="center"
      :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" 
      :header-cell-style="{background:'#eef1f6',color:'#606266',textAlign: 'center'}"
      style="width: 100%">
      <el-table-column 
        prop="id" 
        label="ID" />
      <el-table-column 
        prop="name" 
        label="店铺名称" />
      <el-table-column
        prop="city"
        label="所在城市" />
      <el-table-column
        prop="address"
        label="店铺地址" />
      <el-table-column
        prop="concat"
        label="联系方式" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-edit"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            icon="el-icon-delete"
            type="danger"
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
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="48%"
      :before-close="handleClose">
      <el-form 
        :model="shopData"
        ref="shopData" 
        label-width="105px" 
        size="small">
        <el-form-item 
          label="店铺名称 :" 
          prop="name">
          <el-input 
            type="text" 
            v-model="shopData.name"/>
        </el-form-item>
        <el-form-item 
          label="所在城市 :" 
          prop="city">
          <el-input 
            type="text" 
            v-model="shopData.city"/>
        </el-form-item>
        <el-form-item 
          label="所在街道 :" 
          prop="address">
          <el-input 
            type="text" 
            v-model="shopData.address"/>
        </el-form-item>
        <el-form-item 
          label="联系方式 :" 
          prop="concat">
          <el-input 
            type="textarea" 
            v-model="shopData.concat"/>
        </el-form-item>
      </el-form>
      <span 
        slot="footer" 
        class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button 
          type="primary"
          @click="updateShop(shopData)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  layout: 'backend',
  data() {
    return {
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      tableData: [],
      dialogVisible: false,
      shopData: {}
    };
  },
  async mounted(){
    let {status, data: {shops}}  = await this.$axios.get('/manage/shops')
    console.log(shops)
    this.tableData = shops.map( item =>{
      return {
        id: item.id,
        name: item.name,
        city: item.cityname,
        address: item.address,
        concat: item.tel
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
      this.dialogVisible = true
      this.shopData = row
      console.log(index, row);
    },
    updateShop(shopData) {
      this.$axios.post('/manage/updateshop',{ 
        id: shopData.id,
        name: shopData.name,
        address: shopData.address,
        concat: shopData.concat,
        city: shopData.city
      }).then(({status,data})=>{
        if(status===200){
          if(data&&data.code===0){
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
          }
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let {code} = this.$axios.post('/manage/delshop',{ 
          id: row.id
        }).then(({status,data})=>{
          if(status===200){
            if(data&&data.code===0){
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.tableData.splice(index, 1)
            }
          }
        })
      }).catch(() => {
        this.$message({
          type: 'warning',
          message: '已取消删除'
        })
      })
    }
  }
};
</script>