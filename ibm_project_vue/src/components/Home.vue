<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/icon_project.png" alt="" />
        <span>员工信息管理系统</span>
      </div>
      <el-button type="info" @click="logout"> 退出 </el-button>
    </el-header>

    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '170px'">
          <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b" unique-opened :collapse="isCollapse" :collapse-transition="false" :router="true">

          <!-- 一级菜单 -->
          <el-menu-item index="home" >
            <i class="el-icon-document"></i>
            <span slot="title">查看员工信息</span>
          </el-menu-item>

          <el-menu-item index="add" >
            <i class="el-icon-setting"></i>
            <span slot="title">增加员工信息</span>
          </el-menu-item>

          <el-menu-item index="3" >
            <i class="el-icon-setting"></i>
            <span slot="title">修改员工信息</span>
          </el-menu-item>
            

       
            <!-- 二级菜单 -->
            <!-- <el-menu-item index="1-4-1"> -->

                <!-- 二级菜单模板区域 -->
                <!-- <template slot="title"> -->
                    <!-- <i class="el-icon-location"></i> -->
                    <!-- <span>选项一</span> -->
                <!-- </template> -->

            <!-- </el-menu-item> -->
            
          
        </el-menu>
        <div class="toggle-button" @click="toggleCollapse">||</div>
      </el-aside>

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
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
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

.el-aside {
  background-color: #5e616b;
  .el-menu {
      border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
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