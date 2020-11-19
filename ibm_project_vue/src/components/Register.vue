<template>
  <div class="register_container">
    <div class="register_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/icon_set.png" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" label-width="0px" class="register_form">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="registerForm.username"  prefix-icon="iconfont icon-user" placeholder="请输入用户名">
          </el-input>
        </el-form-item>
        <!-- 真实姓名 -->
        <el-form-item prop="realname">
          <el-input v-model="registerForm.realname"  prefix-icon="iconfont icon-user" placeholder="请输入真实姓名">
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input v-model="registerForm.password" prefix-icon="iconfont icon-lock" placeholder="请输入密码" type="password">
          </el-input>
        </el-form-item>
        <!-- 性别 -->
        <el-form-item prop="sex">
            <el-radio-group v-model="registerForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>


        <el-form class="login-form" status-icon :rules="loginRules" ref="loginForm" :model="loginForm" label-width="0">
			    <!-- 随机验证码 输入框 -->
			      <el-form-item prop="verifycode">
				      <el-input v-model="loginForm.verifycode" placeholder="请输入验证码" class="identifyinput"></el-input>
			      </el-form-item>
		    	<!-- 随机验证码 -->
			    <el-form-item>
				    <div class="identifybox">
					    <div @click="refreshCode">
					    	<s-identify :identifyCode="identifyCode"></s-identify>
					    </div>
					      <!-- 刷新验证码 -->
					    <el-button @click="refreshCode" type='text' class="textbtn">看不清，换一张</el-button>
				    </div>
			    </el-form-item>
		    </el-form>

        <!-- 按钮 -->
        <el-form-item label-width="0px" class="btns">
          <el-button type="primary" @click="res">注册</el-button>
          <el-button type="info" @click="exit">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import SIdentify from './RandomCode.vue'

export default {
    name: 'userlogin',

    data() {

        // 自定义验证规则：验证码验证规则
			const validateVerifycode = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入验证码'))
				} else if (value !== this.identifyCode) {
					console.log('validateVerifycode:', value)
					callback(new Error('验证码不正确'))
				} else {
					callback()
                }
            }
                
        return {
            //这是登录表单的数据绑定对象
            registerForm: {
                username:'admin',
                realname:'张三',
                password:'123456',
                sex:'男',
            },

            //这是表单的验证规则对象
            registerFormRules: {
                username: [
                    { required: true, message: '请输入登录用户名', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                ],
                realname: [
                    { required: true, message: '请输入真实性名', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' },
                    { min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
                ],

            },

            loginForm: {
					verifycode: ''
				},
			identifyCodes: '1234567890',
			identifyCode: '',
			loginRules: { 
					verifycode: [
						{ required: true, trigger: 'blur', validator: validateVerifycode },
					]
			}
			

        } 
    },
    components: {
			// 注册绘制随机验证码的组件
			SIdentify
		},
	created() {},


    methods: {
        //点击登录按钮事件,验证表单；回调函数返回结果
        // login() {
        //     this.$refs.registerFormRef.validate(async(valid)=>{
        //         //验证表单输入是否合法
        //         if (!valid) return;
        //         //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
        //         const {data:res} = await this.$http.post('login',this.registerForm);
        //         //验证登录
        //         if(res.meta.status !== 200) return this.$message.error('登录失败！');
        //         this.$message.success('登录成功>_<');
        //         //1.将登录成功之后的token，保存到客户端的 sessionStorage 中
        //         //  1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //         //  1.2 token 只在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        //         window.sessionStorage.setItem("token",res.data.token);
        //         //2.通过编程式导航跳转到后台主页面，路由地址是 /home
        //         this.$router.push("/home");
        //     }) 
        // },
        res() {
          //  this.$refs.registerFormRef.validate(async(valid)=>{
        //         //验证表单输入是否合法
        //         if (!valid) return;
        //         //通过Axios发送post请求，并将返回结果从promise使用 async await 过滤
        //         const {data:res} = await this.$http.post('login',this.registerForm);
        //         //验证登录
        //         if(res.meta.status !== 200) return this.$message.error('登录失败！');
        //         this.$message.success('登录成功>_<');
        //         //1.将登录成功之后的token，保存到客户端的 sessionStorage 中
        //         //  1.1项目中除了登录之外的其他API接口，必须在登录之后才能访问
        //         //  1.2 token 只在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        //         window.sessionStorage.setItem("token",res.data.token);
        //         //2.通过编程式导航跳转到后台主页面，路由地址是 /home
        //         this.$router.push("/home");
        //     }) 
        },

        exit() {
            this.$router.push("/login");
        },


        // 生成随机数
			randomNum(min, max) {
				return Math.floor(Math.random() * (max - min) + min)
			},
			// 切换验证码
			refreshCode() {
				this.identifyCode = ''
				this.makeCode(this.identifyCodes, 4)
			},
			// 生成四位随机验证码
			makeCode(o, l) {
				for (let i = 0; i < l; i++) {
					this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
				}
				console.log(this.identifyCode)
		}

    },

    
    
};
</script>

<style lang="less" scoped>
.register_container {
  background-color: #2b4b6b;
  height: 100%;
}
.register_box {
  width: 450px;
  height: 600px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.register_form {
  position: absolute;
  left: 15%;
  right: 15%;
  top: 20%;

  .btns {
    position: absolute;
    left: 40%;
    transform: translate(-30%);
  }
}
</style>