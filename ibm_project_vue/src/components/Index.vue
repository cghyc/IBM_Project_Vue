<template>
  <div class="page-index">
    
    <!--表格对话框-->
    <el-dialog :visible.sync="dialogFun" width="650px" >
      <div
        id="myChart"
        :style="{ width: '500px', height: '400px', margin: '0 auto' }"
      ></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFun = false">取 消</el-button>
      </span>
    </el-dialog> 
    <div class="page-find">
     <!--表格-->
    <el-table
    :data="tableData"
    height="500"
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
             :show-close="false"
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

  
  <el-pagination class="pag"
    background
    layout="prev, pager, next"
    :current-page="currentPage"
    :page-size="pageSize"
    @current-change="handleCurrentPage"
    :total="1000">
  </el-pagination>


    <!--添加信息-->
  <el-button type="info" round size="mini" @click="dialog = true" class="button_add">添加员工信息</el-button>
<!--表格按钮-->
<div class="button_tj">
      <el-button @click="dialogFun1" type="info" round size="mini">工资份额</el-button>
      <el-button @click="dialogFun2" type="info" round size="mini">年龄分布</el-button>
      </div>


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
          <el-input v-model="form2.id" style="width:270px" placeholder="请输入员工ID" :disabled="true"></el-input>
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
        dialogFun: false,
        dialogEdit:false,
        loading2:false,

        currentPage:1,
        pageSize:8,

        form3: {
          page: 1,
          size: 8
        },

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
              { pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: '请输入一个大于0的数字' }
          ],
          age:[
              { required: true, message: '请输入员工年龄', trigger: 'blur' },
              { pattern: /^[1-9]\d*$/, message: '请输入一个大于0的数字' }
          ]
       }


      }      
    },

    created() {
      // this.getUsersList();
       this.onePage();
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
            if(ret.data) this.getUsersList()+this.$message.success('删除成功！');
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
                if (!valid) return this.$message.error('请正确填写信息!');
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

      handleCurrentPage(current){
        this.form3.page=current;
        this.$http.post('/getEmpByPage',this.form3).then(res=>{
          console.log(res.data)
          this.tableData=res.data.rows
          // console.log(res.page)
        })
        // console.log(current)
      },
      onePage(){
        this.form.page=1;
        this.$http.post('/getEmpByPage',this.form3).then(res=>{
          console.log(res.data)
          this.tableData=res.data.rows
          // console.log(res.page)
        })
        // console.log(current)
      },


       //饼图按钮
    dialogFun1() {
      this.dialogFun = true;
      setTimeout(() => {
        this.drawLine1();
      }, 500);
    },
    dialogFun2() {
      this.dialogFun = true;
      setTimeout(() => {
        this.drawLine2();
      }, 500);
    },
    // 图表数据--------------------------------------------------------------------------
    drawLine1() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
       var low=0;
       var low1=0;
       var mid=0;
       var high=0;
       var high1=0;
       var count=0;
       var count1=0;
       var count2=0;
       var count3=0;
       var count4=0;
       for(var i=0;i<this.tableData.length;i++)
       {
         if(this.tableData[i].salary<2000){
           count++
         }else if(this.tableData[i].salary>=2000&this.tableData[i].salary<5000){
           count1++
         }else if(this.tableData[i].salary>=5000&this.tableData[i].salary<8000){
           count2++
         }else if(this.tableData[i].salary>=8000&this.tableData[i].salary<10000){
            count3++
         }
           else{
           count4++
         }
       } 
       low = low + count;
       low1 = low1 + count1;
       mid = mid + count2;
       high = high + count3;
       high1 = high1 + count4;
      myChart.setOption({
        title: {
          text: "员工工资比重",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            top:"10%",
            radius: "75%",
            center: ["50%", "50%"],
            data: [
              {value: low , name: '0-2000'},
              {value: low1 , name: '2000-5000'},
              {value: mid , name: '5000-8000'},
              {value: high , name: '8000-10000'},
              {value: high1 , name: '>10000'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },
    drawLine2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
       var low=0;
       var low1=0;
       var mid=0;
       var high=0;
       var high1=0;
       var count=0;
       var count1=0;
       var count2=0;
       var count3=0;
       var count4=0;
       for(var i=0;i<this.tableData.length;i++)
       {
         if(this.tableData[i].age<20){
           count++
         }else if(this.tableData[i].age>=20&this.tableData[i].age<35){
           count1++
         }else if(this.tableData[i].age>=35&this.tableData[i].age<45){
           count2++
         }else if(this.tableData[i].age>=45&this.tableData[i].age<55){
            count3++
         }
           else{
           count4++
         }
       } 
       low = low + count;
       low1 = low1 + count1;
       mid = mid + count2;
       high = high + count3;
       high1 = high1 + count4;
      myChart.setOption({
        title: {
          text: "年龄分布",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        series: [
          {
            name: "访问来源",
            type: "pie",
            top:"10%",
            radius: "75%",
            center: ["50%", "50%"],
            data: [
              {value: low , name: '0-20'},
              {value: low1 , name: '20-35'},
              {value: mid , name: '35-45'},
              {value: high , name: '45-55'},
              {value: high1 , name: '>55'}
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    },

    }
  }
</script>

<style lang="less" scoped>

.page-find{
    position:absolute;
    top:17%;
    left: 21%;
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

.el-pagination{
  text-align: center;
}

.button_add {
  margin-top: 25px;
}

.button_tj{
  position:absolute;
  left: 82%;
  bottom: 1%;
}

.add-form {
  margin-left: 25px;
}

.demo-drawer__footer{
  float: right;
  margin-right: 45px;
}
</style>