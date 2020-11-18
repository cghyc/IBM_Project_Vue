<template>
  <div class="add-body">
    <div class="add-title">
        <h2>添加员工信息：</h2>
    </div>
    <div class="add-form">
    <el-form ref="form" :model="form" label-width="70px" :rules="rules" class="demo-form">
        <!--ID-->
        <el-form-item label="ID" class="in" prop="ID">  
          <el-input v-model="form.ID" style="width:270px" placeholder="请输入员工ID"></el-input>
        </el-form-item>
        <!--名字-->
        <el-form-item label="名字" class="in" prop="name">
          <el-input v-model="form.name" style="width:270px" placeholder="请输入员工名字"></el-input>
        </el-form-item>
        <!--工资-->
        <el-form-item label="工资" class="in" prop="wages">
          <el-input v-model="form.wages" style="width:270px" placeholder="请输入员工工资"></el-input>
        </el-form-item>
        <!--年龄-->
        <el-form-item label="年龄" class="in" prop="age">
          <el-input v-model="form.age" style="width:270px" placeholder="请输入员工年龄"></el-input>
        </el-form-item>
        <!--添加按钮-->
        <el-form-item>
           <el-button type="primary" @click="onAdd('ID')">添加</el-button>
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
          ID: '',
          name: '',
          wages: '',
          age: ''
        },
      
       rules:{
          ID: [
            { required: true, message: '请输入员工ID', trigger: 'blur' },
            { min: 3, message: '输入字符最小长度为3', trigger: 'blur' }
          ],
          name:[
                 { required: true, message: '请输入员工姓名', trigger: 'blur' }
              
          ],
          wages:[
              { required: true, message: '请输入员工工资', trigger: 'blur' }
          ],
          age:[
              { required: true, message: '请输入员工年龄', trigger: 'blur' }
          ]
       }

      }

    },
    methods: {
      onAdd() {
        this.$refs.form.validate(async(valid)=>{
           if (valid)
           {
               this.$message('添加成功！');
               this.$router.replace("/index");
           }
           else{
               this.$message('添加失败！');
               console.log('error submit!!');
               return false;
           }
                //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
                // const {data:res} = await this.$http.post('add',this.form);
                // if(res.meta.status !== 200) return this.$message.error('提交失败！');
                // this.$message.success('提交成功！');
                //2.通过编程式导航跳转到后台主页面，路由地址是 /index
            
        })
      }
    }
  }
</script>

<style lang="less" scoped>
.add-body{
    position: relative;
     width: 100%;
     height: 100%;

}
.add-title{
    position: absolute;
    top:50px;
    left: 500px;
}
.add-form{
    position: absolute;
    top:150px;
    left: 550px;
    background-color: #bfa;
    width: 400px;
    padding-top:30px;

}

</style>