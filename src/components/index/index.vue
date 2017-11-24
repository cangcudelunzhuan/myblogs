<template lang="html">
  <div class="">
    <div class="top-nav-container">
    	<nav class="top-nav">
    		<div class="vertical-center nav-logo active" @click="goindex()">
				<img src="/static/img/pic.png" class="logo vertical-center-content">
				<span class="brand vertical-center-content">{{userName}}</span>
			</div>
			<div class="navright">
		    	<el-menu :default-active="activeNav" class="el-menu-demo" mode="horizontal" @select="handleSelect">
				  <el-menu-item index="list">文章</el-menu-item>
				  <el-menu-item index="newarticle">发布</el-menu-item>
				  <el-menu-item index="tag">标签</el-menu-item>
				  <el-menu-item index="search">找文章</el-menu-item>
				  <el-menu-item index="set">修改密码</el-menu-item>
				</el-menu>
				<div @click="loginout" class="loginout">退出</div>
			</div>
		</nav>
    </div>
    <div class="content">
    	<div class="post-list fade-transition">
    		<router-view></router-view>
    	</div>
    	
    </div>
	
  </div>
</template>

<script>
export default {
  data() {
    return{
    	// activeIndex2: 'list',
    }
  },
  computed: {
    userName () {
      return this.$store.getters.userInfo.name
    },
    activeNav(){
    	return this.$store.getters.activeNav
    }
  },
  mounted: function () {
    // this.$store.commit('TITLE', {title: '首页'})
  },
  methods:{
  	handleSelect(key, keyPath) {
		let routePath = '/index/'+key
		this.$router.push({path: routePath})
	},
	loginout(){
		window.sessionStorage.setItem('userInfo',"{}")
		location.reload() 
	},
	goindex(){
		let routePath = '/index'
		this.$router.push({path: routePath})
	}
  }
  
}
</script>

<style lang="css">
</style>
