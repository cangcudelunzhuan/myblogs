<template lang="html">
  <div>
    <div class="top-nav-container loginnav">
      <nav class="top-nav">
          <div class="vertical-center nav-logo active" @click="goindex()">
          <img src="/static/img/pic.png" class="logo vertical-center-content">
          <span class="brand vertical-center-content">登录</span>
        </div>
      </nav>
    </div>

    <div class="content logincontent">
      <div class="post-list fade-transition">
        <div class="pannebox">
          <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item prop="username" class="blogsinput">
              <el-input v-model="ruleForm2.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item  prop="password" class="blogsinput">
              <el-input v-model="ruleForm2.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item class="setbuttonArea noleft-form-item">
              <el-button type="primary" icon="edit" @click="goregister()">注册</el-button>
              <el-button type="success" @click="submitForm('ruleForm2')">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  data() {
    return{
      ruleForm2: {
          username:"",
          password:"",
      },
      rules2: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max:25, message: '长度在2-25之间', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
      }
    }
  },
  mounted: function () {
    this.$store.commit('TITLE', {title: '登录'})
  },
  methods:{
    submitForm(formName) {
        let _this=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {username:_this.ruleForm2.username, password:  _this.ruleForm2.password}
            let payload = {'data': params, 'router': this.$router, 'store': this.$store}
            _this.$store.dispatch('getUser', payload)
          } else {
            console.log('error submit!!')
            return false
          }
        })
    },
    goregister(){
      this.$router.push({name:'Register'})
    }
  }
}
</script>

<style lang="css">
</style>
