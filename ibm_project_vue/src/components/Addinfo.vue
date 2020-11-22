<template>
  <div class="add-body">
    <div class="add-title">
        <h2>添加员工信息</h2>
    </div>
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
        <!--添加按钮-->
        <el-form-item>
           <el-button class="add_btn" type="primary" @click="onAdd('ID')">添加</el-button>
        </el-form-item>
    </el-form>
      </div>
    
    </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          id: '',
          name: '',
          salary: '',
          age: ''
        },
      
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
              { pattern: /^[1-9]\d*$/, message: '请输入数字' }
          ],
          age:[
              { required: true, message: '请输入员工年龄', trigger: 'blur' },
              { pattern: /^[1-9]\d*$/, message: '请输入数字' }
          ]
       }

      }

    },
    methods: {
      onAdd() {
        // this.$refs.formRef.validate(async(valid)=>{
        //   if(!valid) return;
        //   const {data:res} = await this.$http.post('/addEmploy',this.form)
          let url="/addEmploy";
          this.$http.post(url,this.form).then(res=>{
            console.log("response...",res)
            this.$message.success("添加成功>-<")
          }).catch(err=>{console.log("error...",err); this.$message.error('添加失败！')});
          
      }
    }
  }
</script>

<style lang="less" scoped>
.add-body{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50% ,-50%);
    .add-title{
    text-align: center;        /*文字水平居中对齐*/
    line-height: auto;        /*设置文字行距等于div的高度*/
    overflow:hidden;
    }
  
}
.add_btn{
     position: absolute;
     right: 0;
    }

</style>