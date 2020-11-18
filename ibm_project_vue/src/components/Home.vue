<template>
    <div>
        <el-button type="info" @click="logout">
            退出
        </el-button>
    </div>
</template>

<script>
export default {
    methods: {
        //退出功能，先清除 token，然后跳转到 login 页面
        logout() {
            window.sessionStorage.clear();
            this.$router.push("/login")
        }
    }
};
</script>

<style lang="less" scoped>

</style>