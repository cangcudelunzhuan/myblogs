<template>
  <div>
  	<div class="detailArt">
      <input type="hidden" name="" v-model="activeNav">
      <article  class="artBox"> 
        <h1 class="title">{{artDetail.title}}</h1>
        <input type="hidden" name="" v-model="artid">
        <div class="datemes">
          发布于{{artDetail.date | date}} 
          作者：{{artDetail.auther}}
        </div>
        <!-- <div v-if="artDetail.labels">
          <el-tag size="mini" v-for="tag in artDetail.labels" type="info" key="tag">{{tag}}</el-tag>
        </div> -->
        <blogs-tag @childevent="gotag" :labels="artDetail.labels"></blogs-tag>
        <div v-if="name==artDetail.auther">
          <el-button type="text" @click="goupdate(artDetail._id)">编辑</el-button>
          <el-button type="text" @click="godelet(artDetail._id)">删除</el-button>
        </div>
        <p v-else class="garyfont">你不是该文章作者，没有编辑权限</p>
        <p>{{artDetail.gist}}</p>
        <div class="infos" style="cursor: default" v-html="artDetail.content"></div>
      </article>
  	</div>
    <div class="bottom-art">
      <div @click="gedetail(preList._id)"  class="godeTail" v-if="preList._id">
        <i class="el-icon-arrow-left "></i>
        <span class="greenfont" >{{preList.title}}</span>
      </div>
      <div v-else class="garyfont">没有上一篇了哟~</div>
      <div @click="gedetail(nextList._id)" class="godeTail" v-if="nextList._id">
        <span class="greenfont">{{nextList.title}}</span><i class="el-icon-arrow-right "></i>
      </div>
      <div v-else class="garyfont">没有下一篇了哟~</div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { VueEditor } from 'vue2-editor'
import blogsTag from '@/components/index/tag/tag.vue'
export default {
  data() {
    return{
    	name:"", 
    }
  },
  components: {
  blogsTag 
  },
  computed: {
    artDetail () {
      return this.$store.getters.artDetail
    },
    artid(){
      return this.$store.getters.artDetail._id
    },
    preList(){
      return this.$store.getters.preList
    },
    nextList(){
      return this.$store.getters.nextList
    },
    activeNav(){
      return this.$store.getters.activeNav
    }
  },
  mounted: function () {
    this.$store.commit('TITLE', {title: '详情'})
    this.$store.commit('ACTIVENAV', {activeNav: "list"}) 
    this.name=this.$store.getters.userInfo.name
    let id=this.$route.query._id 
    let params={_id:id,auther:this.name}
    let payload = {'data': params, 'router': this.$router, 'store': this.$store}
    this.$store.dispatch('artDetail',payload)
    this.$store.dispatch('getpre',payload)
    this.$store.dispatch('getnext',payload)
    
  },
  methods:{
  	godelet(id){
      let vm =this
      this.$confirm('确认删除这篇文章吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params={_id:id}
        let payload = {'data': params, 'router': vm.$router, 'store': vm.$store}
        vm.$store.dispatch('godelete',payload)
      }).catch(() => {  
          //取消的操作     
      });  
    },
    goupdate(id){
      let routePath = '/index/updateArt'
      this.$router.push({path: routePath+"?_id="+id})
    },
    gedetail(id){
      let routePath = '/index/articleDetail'
      this.$router.push({path: routePath+"?_id="+id})
      this.name=this.$store.getters.userInfo.name
      let params={_id:id,auther:this.name}
      let payload = {'data': params, 'router': this.$router, 'store': this.$store}
      this.$store.dispatch('artDetail',payload)
      this.$store.dispatch('getpre',payload)
      this.$store.dispatch('getnext',payload)
    },
    gotag(tag){
      this.$store.commit('TAGSHOW', {tagshow: tag})
      let routePath = '/index/tag'
    this.$router.push({path: routePath})
    }
  }
  
}
</script>