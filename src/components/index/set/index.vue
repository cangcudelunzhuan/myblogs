<template lang="html">
  <div class="logincontent">

    <div class="pannebox">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
        <el-form-item label="" prop="oldpassword" class="blogsinput">
          <el-input v-model="ruleForm2.oldpassword" placeholder="输入旧密码"></el-input>
        </el-form-item>
        <el-form-item  prop="password" class="blogsinput">
          <el-input v-model="ruleForm2.password" type="password" placeholder="输入新密码"></el-input>
        </el-form-item>
        <el-form-item  prop="passwordag" class="blogsinput">
          <el-input v-model="ruleForm2.passwordag" type="password" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item class="setbuttonArea noleft-form-item">
          <el-button type="success" @click="submitForm('ruleForm2')">确认修改</el-button>
        </el-form-item>
      </el-form>
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
      name:"",
      ruleForm2: {
          oldpassword:"",
          password:"",
          passwordag:""
      },
      rules2: {
          oldpassword: [
            { required: true, message: '请输入旧密码', trigger: 'blur' },
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
  computed: {
    activeNav(){
      return this.$store.getters.activeNav
    }
  },
  mounted: function () {
    this.$store.commit('TITLE', {title: '账号设置'})
    this.name=this.$store.getters.userInfo.name
    this.$store.commit('ACTIVENAV', {activeNav: "set"})
  },
  methods:{
    submitForm(formName) {
        let _this=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params={
              name:_this.name,
              oldpassword:_this.ruleForm2.oldpassword,
              password:_this.ruleForm2.password
            }
            let payload = {'data': params, 'router': this.$router, 'store': this.$store}
            _this.$store.dispatch('updatePassword', payload)
          } else {
            console.log('error submit!!')
            return false
          }
        })
    },
    
  }
}
</script>