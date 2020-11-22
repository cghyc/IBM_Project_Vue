<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header style="height:80px">
      <div>
        <img src="../assets/icon_project.png" alt="" />
        <span>员工信息管理系统</span>
      </div>
      <el-button type="text"  @click="logout"> 退出 </el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
     <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //是否折叠
      isCollapse: false
    }
  },

  methods: {
    //退出功能，先清除 token，然后跳转到 login 页面
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    //点击按钮，切换菜单栏最下化
    toggleCollapse() {
      this.isCollapse = ! this.isCollapse 
    },
  },
};
</script>

<style lang="less" scoped>

.home-container {
  height: 100%;
  background: url(../assets/bg_1_meitu_1.png) no-repeat;
  background-size: 100% ;
}


.el-header {

  margin-left: 8%;
  margin-right: 7.5%;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: rgb(26, 22, 22);
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-header img {
  height: 50px;
  width: 50px;
}



.iconfont {
    margin-right: 10px;
}

.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    cursor: pointer;

}

</style>