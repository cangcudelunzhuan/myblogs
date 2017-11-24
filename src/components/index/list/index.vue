<template>
	<div class="">
		<div class="detailArt">
			<input type="hidden" name="" v-model="activeNav">
			<article v-for="item in acrtlist.data"  class="artBox">	
				<h1 class="title">{{item.title}}</h1>
				<div class="datemes">
					发布于{{item.date | date}} 
					作者：{{item.auther}}
				</div>
				<blogs-tag @childevent="gotag" :labels="item.labels"></blogs-tag>
				<p>{{item.gist | gistsubstr}}</p>
				<div class="infos" @click="articleDetail(item._id)" >{{item.content | artsubstr}}</div>
			</article>
		</div>
		<div class="sucblogs pageArea">
	      <el-pagination small
	        layout="prev, pager, next"
	        @size-change="handleSizeChange"
	        @current-change="currentChange"
	        :page-size="5"
	        :total="acrtlist.totalCount">
	      </el-pagination>
	    </div>

	</div>
</template>
<script type="text/javascript">
import blogsTag from '@/components/index/tag/tag.vue'
export default {
  data() {
    return{
  
    }
  },
  components: {
	blogsTag 
  },
  computed: {
    acrtlist () {
      return this.$store.getters.acrtlist
    },
    activeNav(){
    	return this.$store.getters.activeNav
    }
  },
  mounted: function () {
    this.$store.commit('TITLE', {title: '博客'})
    this.$store.dispatch('getList',1)
    this.$store.commit('ACTIVENAV', {activeNav: "list"})  
  },
  methods:{
  	articleDetail(id){
  		let routePath = '/index/articleDetail'
		this.$router.push({path: routePath+"?_id="+id})
  	},
  	handleSizeChange(){
  		console.log("1111")
  	},
  	currentChange(val){
  		this.$store.dispatch('getList',val)
  	},
  	gotag(tag){
  		this.$store.commit('TAGSHOW', {tagshow: tag})
  		let routePath = '/index/tag'
		this.$router.push({path: routePath})
  	}
  }
  
}
</script>