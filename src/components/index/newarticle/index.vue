<template>
	<div class="">
			<input type="hidden" name="" v-model="activeNav">
			<el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		      <el-form-item prop="title" class="blogsinput">
		        <el-input v-model="ruleForm2.title" placeholder="文章标题"></el-input>
		      </el-form-item>
		       <el-form-item label="标签" prop="" class=" artlabel">
	              <el-tag type="success"
	                :key="tag" v-for="tag in dynamicTags"
	                :closable="true"
	                :close-transition="false"
	                @close="handleClose(tag)">{{tag}}
	              </el-tag>
	              <el-input
	                class="input-new-tag"
	                v-if="inputVisible"
	                v-model="inputValue"
	                ref="saveTagInput"
	                size="mini"
	                @keyup.enter.native="handleInputConfirm"
	                @blur="handleInputConfirm">
	              </el-input>
	              <el-button v-else class="button-new-tag" size="mini" @click="showInput">+ 添加</el-button>
	          </el-form-item>
	          <el-form-item  prop="gist" class="blogsinput">
		        <el-input v-model="ruleForm2.gist" type="text" placeholder="文章摘要"></el-input>
		      </el-form-item>
		      <el-form-item  prop="content" class="blogsinput">
		         <vue-editor v-model="ruleForm2.content" 
		         useCustomImageHandler
      			@imageAdded="handleImageAdded"
		         placeholder="开始写你的文章....">
		     </vue-editor>
		      </el-form-item>
		      <el-form-item>
		        <el-button type="success" @click="submitForm('ruleForm2')">确认发布</el-button>
		      </el-form-item>
		    </el-form>
		    
	</div>
</template>
<script type="text/javascript">
import { VueEditor } from 'vue2-editor'
import axios from 'axios'
export default {
	components: {
	  VueEditor
	},
	data() {
  	var validcontentred = (rule, value, callback) => {
  		var value=value.replace(/(^\s*)|(\s*$)/g, "").replace("<p><br></p>","")
        if (value === '') {
          callback(
          	new Error('还没写文章呢~~')
          )
        } else {
          callback();
        }
    };
    return{
		auther:"",
		dynamicTags: [],
		inputVisible: false,
		inputValue: '',
		ruleForm2: {
		  title:"",
		  content:"",
		  gist:""
		},
		rules2: {
		  title:[
		  	{ required: true, message: '请输入标题', trigger: 'blur' },
		  ],
		  content:[
		  	 { validator: validcontentred, trigger: 'change' }
		  ],
		  gist:[
		  	{ required: true, message: '必填', trigger: 'blur' },
		  ],
		}
    }
  },
  watch:{
  	'ruleForm2.content'(val){
  		if(val){
	        var val=val.replace(/(^\s*)|(\s*$)/g, "").replace("<p><br></p>","").replace("<p>","").replace("</p>","")
	        this.$refs.ruleForm2.validateField('content');
	      }	
  	}
  },
  computed: {
    activeNav(){
    	return this.$store.getters.activeNav
    }
  },
  mounted: function () {
    this.$store.commit('TITLE', {title: '发布'})
    this.auther=this.$store.getters.userInfo.name
    this.$store.commit('ACTIVENAV', {activeNav: "newarticle"}) 
  },
  methods:{
    submitForm(formName) {
        let _this=this
        this.$refs[formName].validate((valid) => {
          if (valid) {
          	let params = {
          		title:_this.ruleForm2.title, 
          		labels:  _this.dynamicTags,
          		content: _this.ruleForm2.content,
          		gist:_this.ruleForm2.gist,
          		auther:_this.auther,
          		date:new Date().getTime()
          	}
            let payload = {'data': params, 'router': this.$router, 'store': this.$store}
            _this.$store.dispatch('release', payload)
            _this.$store.dispatch('uptags', payload)
          } else {
            console.log('error submit!!')
            return false
          }
        })
    },
    handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue
      let dynamicTags=this.dynamicTags
      for(var i=0 ; i<dynamicTags.length;i++){
      	if(inputValue==dynamicTags[i]){
      		return false
      	}
      }
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },


    handleImageAdded: function(file, Editor, cursorLocation) {
        // An example of using FormData
        // NOTE: Your key could be different such as:
        // formData.append('file', file)

        var formData = new FormData();
        formData.append('image', file)

        axios({
          url: 'pro/images',
          method: 'POST',
          data: formData
        })
        .then((result) => {
          let url = result.data.url // Get url from response
          Editor.insertEmbed(cursorLocation, 'image', url);
        })
        .catch((err) => {
          console.log(err);
        })
    }
    
  }
}
</script>