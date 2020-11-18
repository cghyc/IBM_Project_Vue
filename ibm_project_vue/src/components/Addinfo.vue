<template>
  <div class="add-body">
    <div class="add-title">
        <h2>添加员工信息：</h2>
    </div>
    <div class="add-form">
    <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="ID" class="in">
          <el-input v-model="form.ID" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="名字" class="in">
          <el-input v-model="form.name" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="工资" class="in">
          <el-input v-model="form.wages" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item label="年龄" class="in">
          <el-input v-model="form.age" style="width:300px"></el-input>
        </el-form-item>
        <el-form-item>
           <el-button type="primary" @click="onAdd">添加</el-button>
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
        }
      }
    },
    methods: {
      onAdd() {
        this.$router.replace('/index')
      }
    }
  }
</script>

<style lang="less" scoped>
.add-body{
    position: relative;
     width: 100%;
     height: 100%;
    background-color: #7bb9f8;
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
    width: 360px;
    padding: 30px 20px;
}

</style>