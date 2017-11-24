<template>
	<div class="detailArt">
		<input type="hidden" name="" v-model="activeNav">
		<div v-if="labels" class="tagbox">
			<h2>标签</h2>
			<el-tag size="mini" 
			v-for="tag in labels" type="success" 
			key="tag" >
			<div @click="getlist(tag.content)">{{tag.content}}</div>
			</el-tag>
		</div>
		<div >
			<section class="tagDet" v-if="tagshow">
				<h3>{{tagshow}}</h3>
				<ul v-for="art in taginfo">
					<li>
						<h4>
							<span class="greenfont" @click="godetail(art._id)">{{art.title}}</span>
							<span>作者:{{art.auther}}</span>
							<div>{{art.date|date}}</div>

						</h4>
					</li>
				</ul>
			</section>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
	  components: {
	    
	  },
	  data() {
	    return{
	      // tagshow:"",
	    }
	  },
	  watch:{
	    
	  },
	  computed: {
	    labels(){
	    	return this.$store.getters.tags
	    },
	    taginfo(){
	    	return this.$store.getters.taginfo
	    },
	    activeNav(){
	      return this.$store.getters.activeNav
	    },
	    tagshow(){
	    	return this.$store.getters.tagshow
	    }
	  },
	  mounted: function () {
	  	let vm=this
	  	this.$store.dispatch('gettags')
	  	this.$store.commit('TITLE', {title: '标签'})
	  	this.$store.commit('ACTIVENAV', {activeNav: "tag"}) 
	  	if(vm.$store.getters.tagshow){
	  		let params={
              content:vm.$store.getters.tagshow,
            }
	  		let payload = {'data': params, 'router': this.$router, 'store': this.$store}
	  		vm.$store.dispatch('getTaginfo',payload)
	  	} 	
	  },
	  methods:{
	   	getlist(content){
	   		this.$store.commit('TAGSHOW', {tagshow: content})
	   		let vm=this
	   		let params={
              content:vm.$store.getters.tagshow,
            }
            let payload = {'data': params, 'router': this.$router, 'store': this.$store}
	   		this.$store.dispatch('getTaginfo',payload)
	   	},
	   	godetail(id){
	   		let routePath = '/index/articleDetail'
			this.$router.push({path: routePath+"?_id="+id})
	   	}
	  
	  }
	}
</script>