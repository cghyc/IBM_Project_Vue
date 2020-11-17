<template>
  <div class="page-index"> 
    
    <div class="page-find">

    <el-table
    :data="tableData"
    height="450"
    :header-cell-style="{background:'rgb(131, 214, 247)',color:'#000'}"
    style="width: 100%" class="query-table">
        
    <el-table-column
      label="ID"
      width="180">
      <template slot-scope="scope">
        <span >{{ scope.row.ID }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="姓名"
      width="180">
      <template slot-scope="scope">
         <span>{{ scope.row.name }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="工资"
      width="180">
      <template slot-scope="scope">
         <span>{{ scope.row.wages }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="年龄"
      width="180">
      <template slot-scope="scope">
         <span>{{ scope.row.age }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row) , dialogVisible=true">删除信息</el-button>

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

        <el-button
          size="mini"
          style="margin-left:10px"
          @click="handleEdit(scope.$index, scope.row)">修改信息</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>


</div>
  
</template>

<script>
  export default {
    data() {
      return {

         dialogVisible: false,

        tableData: [{
          ID: '1234',
          name: '王小虎',
          wages: '10000',
          age: '18'
        },{
          ID: '1234',
          name: '王小虎',
          wages: '10000',
          age: '18'
        },{
          ID: '1234',
          name: '王小虎',
          wages: '10000',
          age: '18'
        },{
          ID: '1234',
          name: '王小虎',
          wages: '10000',
          age: '18'
        },{
          ID: '1234',
          name: '王小虎',
          wages: '10000',
          age: '18'
        },{
          ID: '1234',
          name: '王小虎',
          wages: '10000',
          age: '18'
        },]
      }

      
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style>
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
</style>