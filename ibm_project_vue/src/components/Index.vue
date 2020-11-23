<template>
  <div class="page-index"> 
    <div class="page-find">
     <!--表格-->
    <el-table
    :data="tableData"
    height="450"
    :header-cell-style="{color:'#000'}"
    style="width: 100%" class="query-table"  >
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
             <el-button type="primary" @click="del() , dialogVisible = false " >是</el-button>
         </span>
        </el-dialog>
          <!--修改信息-->
        <el-button
          size="mini"
          style="margin-left:10px"
          @click="handleEdit(scope.$index, scope.row) , dialogEdit = true">修改信息
          </el-button>
      </template>
    </el-table-column>
  </el-table>
    <!--添加信息-->
  <el-button type="info" round size="mini" @click="dialog = true" class="button_add">添加员工信息</el-button>
 <!--员工添加抽屉-->
  <el-drawer
  title="添加员工信息"
  :before-close="handleClose"
  :visible.sync="dialog"
  direction="ltr"
  custom-class="demo-drawer"
  ref="drawer"
  :show-close="false">
     <div class="add-form">
    <el-form ref="formRef" :model="form" label-width="70px" :rules="rules" class="demo-form" label-position="left">
        <!--ID-->
        <el-form-item label="ID" class="in" prop="id" >  
          <el-input v-model="form.id" style="width:270px" placeholder="请输入员工ID"></el-input>
        </el-form-item>
        <!--名字-->
        <el-form-item label="名字" class="in" prop="name">
          <el-input v-model="form.name" style="width:270px" placeholder="请输入员工名字"></el-input>
        </el-form-item>
        <!--工资-->
        <el-form-item label="工资" class="in" prop="salary">
          <el-input v-model="form.salary" style="width:270px" placeholder="请输入员工工资"></el-input>
        </el-form-item>
        <!--年龄-->
        <el-form-item label="年龄" class="in" prop="age">
          <el-input v-model="form.age" style="width:270px" placeholder="请输入员工年龄"></el-input>
        </el-form-item>
       
    </el-form>

    <div class="demo-drawer__footer">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="onAdd" >添加</el-button>
    </div>
  </div>

<!--员工修改抽屉-->
</el-drawer>
  <el-drawer
  title="修改员工信息"
  :before-close="handleClose2"
  :visible.sync="dialogEdit"
  direction="rtl"
  custom-class="demo-drawer"
  ref="drawer2"
  :show-close="false">
     <div class="add-form2">
    <el-form ref="formRef2" :model="form2" label-width="70px" :rules="rules" class="demo-form" label-position="left">
        <!--ID-->
        <el-form-item label="ID" class="in" prop="id" >  
          <el-input v-model="form2.id" style="width:270px" placeholder="请输入员工ID"></el-input>
        </el-form-item>
        <!--名字-->
        <el-form-item label="名字" class="in" prop="name">
          <el-input v-model="form2.name" style="width:270px" placeholder="请输入员工名字"></el-input>
        </el-form-item>
        <!--工资-->
        <el-form-item label="工资" class="in" prop="salary">
          <el-input v-model="form2.salary" style="width:270px" placeholder="请输入员工工资"></el-input>
        </el-form-item>
        <!--年龄-->
        <el-form-item label="年龄" class="in" prop="age">
          <el-input v-model="form2.age" style="width:270px" placeholder="请输入员工年龄"></el-input>
        </el-form-item>
       
    </el-form>

    <div class="demo-drawer__footer">
      <el-button @click="cancelForm2">取 消</el-button>
      <el-button type="primary" @click="onEdit" >修改</el-button>
    </div>
  </div>
</el-drawer>
</div>

</div>
  
</template>

<script>

  export default {
    data() {
      return {
        dialogVisible: false,
        dialogFromVisible: false,
        tableData: [],
        id:'',
        table: false,
        dialog: false,
        loading: false,

        dialogEdit:false,
        loading2:false,

        form2: {
          id: '',
          name: '',
          salary: '',
          age: ''
        },
       
      
          form: {
          id: '',
          name: '',
          salary: '',
          age: ''
        },
      

        formLabelWidth: '80px',
        timer: null,

         rules:{
          id: [
            { required: true, message: '请输入员工ID', trigger: 'blur' },
            { pattern: /^[1-9]\d*$/, message: '请输入数字' }
          ],
          name:[
                 { required: true, message: '请输入员工姓名', trigger: 'blur' }
              
          ],
          salary:[
              { required: true, message: '请输入员工工资', trigger: 'blur' },
              { pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入数字' }
          ],
          age:[
              { required: true, message: '请输入员工年龄', trigger: 'blur' },
              { pattern: /^[1-9]\d*$/, message: '请输入数字' }
          ]
       }


      }      
    },

    created() {
      this.getUsersList()   
    },

    methods: {
      handleEdit(index, row) {
        // console.log(index, row);
        this.form2=row
        // console.log(this.form2.id);
        
      },


      handleDelete(index, row) {
        // console.log(index, row);
        console.log(row.id);
        this.id = row.id;
      },
      async getUsersList() {
        this.$http.get('/getAllEmployee').then(res=>{
          this.tableData=res.data
        })
      },
      //员工信息删除方法
      del() {
        console.log(this.id);
        this.$http.get('/delEmpById/'+this.id).then(ret=>{
            console.log(ret.data)
            if(ret.data) this.getUsersList();
                else return this.$message.error('删除失败！');
        })

      },


      handleClose() {
        if (this.loading) {
        return;
      }          
      },
      cancelForm() {
        this.loading = false;
        this.dialog = false;
        clearTimeout(this.timer);
     },
     //添加员工信息方法
      onAdd() { 
          // let url="/addEmploy";
          // this.$http.post(url,this.form).then(res=>{
          //   console.log("response...",res)
          //   this.$message.success("添加成功>-<")
            
          // }).catch(err=>{console.log("error...",err); this.$message.error('添加失败！')});
         this.$refs.formRef.validate(async(valid)=>{
            if (!valid) return this.$message.error('请正确填写！');
            const {data:res} = await this.$http.post('/addEmploy',this.form);
            if (!res) return this.$message.error('添加失败！');
            this.$message.success('添加成功>-<');
            this.getUsersList();
            this.cancelForm();
            this.$refs.formRef.resetFields();
          })  
          
      },
      //员工信息修改方法
      onEdit(){
         console.log(this.form2);
         this.$refs.formRef2.validate(async(valid)=>{
                //验证表单输入是否合法
                if (!valid) return;
                //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
                const {data:res} = await this.$http.post('/updateEmp',this.form2);
                 if (!res) return this.$message.error('修改失败！');
            this.$message.success('修改成功>-<');
            this.getUsersList();
            this.cancelForm2();
                
            }) 
        // this.$http.get('/updateEmp',{
        //   params:  {
        //     id:this.id
        //   }   
        // }).then(ret=>{
        //     console.log(ret.data)
        //     if(ret.data) return this.$router.push("/home");
        //         else return this.$message.error('删除失败！');
        // })
      },

      
      handleClose2() {
        if (this.loading2) {
        return;
      }          
      },
      cancelForm2() {
        this.loading2 = false;
        this.dialogEdit = false;
        clearTimeout(this.timer);
     },



    }
  }
</script>

<style lang="less" scoped>

.page-find{
    position: relative;
    top:12%;
    left: 15%;
    width:950px;
    
}
/deep/ .el-table thead,.el-table{ color: black; }
/*最外层透明*/
/deep/ .el-table, /deep/ .el-table__expanded-cell{
  background-color: transparent;
  color: #000;
}
/* 表格内背景颜色 */
/deep/ .el-table th,
/deep/ .el-table tr,
/deep/ .el-table td {
  background-color: transparent;
}
/* 删除表格下最底层的横线 */
.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
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

.button_add {
  margin-top: 25px;
}

.add-form {
  margin-left: 25px;
}

.demo-drawer__footer{
  float: right;
  margin-right: 45px;
}
</style>