<template lang="html">
	<div>
		<div class="top-nav-container loginnav">
	      <nav class="top-nav">
	          <div class="vertical-center nav-logo active" @click="goindex()">
	          <img src="/static/img/pic.png" class="logo vertical-center-content">
	          <span class="brand vertical-center-content">注册</span>
	        </div>
	      </nav>
	    </div>
	    <div class="content logincontent">
	    	<div class="post-list fade-transition">
	      		<div class="pannebox">
	      			<div class="gologinbox" @click="gologin()"><i class="el-icon-arrow-left "></i>去登录</div>
					<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
				      <el-form-item  prop="username" class="blogsinput">
				        <el-input v-model="ruleForm2.username" placeholder="用户名"></el-input>
				      </el-form-item>
				      <el-form-item label="" prop="password" class="blogsinput">
				        <el-input v-model="ruleForm2.password" type="password" placeholder="密码"></el-input>
				      </el-form-item>
				      <el-form-item label="" prop="passwordag" class="blogsinput">
				        <el-input v-model="ruleForm2.passwordag" type="password" placeholder="确认密码"></el-input>
				      </el-form-item>
				      <el-form-item class="setbuttonArea noleft-form-item">
				        <el-button type="success" @click="submitForm('ruleForm2')"  size="large"
				        style="width:100%">注册</el-button>
				      </el-form-item>
				    </el-form>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	
export default {
	data() {
  	var validatePass2 = (rule, value, callback) => {
	    if (value === '') {
	      callback(new Error('请再次输入密码'));
	    } else if (value !== this.ruleForm2.password) {
	      callback(new Error('两次输入密码不一致!'));
	    } else {
	      callback();
	    }
	}
    return{
      ruleForm2: {
          username:"",
          password:"",
          passwordag:""
      },
      rules2: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 2, max:25, message: '长度在2-25之间', trigger: 'blur' }
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max:15, message: '长度在6-15之间', trigger: 'blur' }
          ],
          passwordag:[
          	{ validator: validatePass2, trigger: 'blur' }
          ]
      }
    }
  },
  mounted: function () {
    this.$store.commit('TITLE', {title: '注册'})
  },
  methods:{
    submitForm(formName) {
        let _this=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params={username:_this.ruleForm2.username,password:_this.ruleForm2.password}
            let payload = {'data': params, 'router': this.$router, 'store': this.$store}
            _this.$store.dispatch('register', payload)
          } else {
            console.log('error submit!!')
            return false
          }
        })
    },
    gologin(){
    	this.$router.push({name:'Login'})
    }
    
  }
}
</script>