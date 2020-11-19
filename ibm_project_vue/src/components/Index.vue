<template>
  <div class="page-index"> 
    
    <div class="page-find">
     <!---->
    <el-table
    :data="tableData"
    height="450"
    :header-cell-style="{background:'rgb(131, 214, 247)',color:'#000'}"
    style="width: 100%" class="query-table">
      <!--ID-->  
    <el-table-column
      prop="id"
      label="ID"
      width="180">
    </el-table-column>
     <!--名字-->
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
     <!--工资-->
    <el-table-column
      prop="salary"
      label="工资"
      width="180" >
    </el-table-column>
     <!--年龄-->
    <el-table-column
      prop="age"
      label="年龄"
      width="180">
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row) , dialogVisible=true">删除信息</el-button>
          <!--删除信息-->
          <el-dialog
             :visible.sync="dialogVisible"
             width="30%"
             :before-close="handleDelete">
             <span class="di-text">删除信息不可恢复，请确认是否删除</span>
             <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">否</el-button>
             <el-button type="primary" @click="dialogVisible = false">是</el-button>
         </span>
        </el-dialog>
          <!--修改信息-->
        <el-button
          size="mini"
          style="margin-left:10px"
          @click="handleEdit(scope.$index, scope.row)">修改信息</el-button>
      </template>
    </el-table-column>
  </el-table>
    <!--添加信息-->
  <el-button type="primary" class="add-info" @click="onAddInfo">添加员工信息</el-button>

</div>


</div>
  
</template>

<script>
  export default {
    data() {
      return {

         dialogVisible: false,

        tableData: [],
        
      }      
    },

    created() {
      this.getUsersList()
    },

    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      onAddInfo(){
        this.$router.replace('/add')
      },

      async getUsersList() {
        this.$http.get('/getAllEmployee').then(res=>{
          this.tableData=res.data
        })
        // const {data: res} = await this.$http.get('/getAllEmployee')
        // console.log(res)
        
      }

    }
  }
</script>

<style lang="less" scoped>

.page-find{
    position: relative;
    top:150px;
    left: 300px;
    width:1000px;
}

.di-text{
    display: block;
    text-align: center;
}
.add-info{
  position:absolute;
  top: 500px;
  left: 400px;
}
</style>