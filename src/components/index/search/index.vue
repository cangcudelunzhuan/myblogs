<template>
	<div class="detailArt">
    <input type="hidden" name="" v-model="activeNav">
    <el-input class="blogsinput successinput" type="success"
      placeholder="输入标题"
      icon="search"
      v-model="title"
      :on-icon-click="handleIconClick">
    </el-input>
    <section class="tagDet" v-if="searchList.data">
      <ul >
        <li v-for="item in searchList.data">
          <h4>
            <span class="greenfont" @click="godetail(item._id)">{{item.title}}</span>
            <span>作者:{{item.auther}}</span>
            <div>{{item.date|date}}</div>

          </h4>
        </li>
      </ul>

      <div class="sucblogs pageArea">
        <el-pagination small
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="currentChange"
          :page-size="5"
          :total="searchList.totalCount">
        </el-pagination>
      </div>
    </section>
    <div v-else class="garyfont">暂无内容</div>
	</div>

</template>
<script type="text/javascript">

export default {
  data() {
    return{
      title:""
    }
  },
  components: {
	
  },
  computed: {
    activeNav(){
      return this.$store.getters.activeNav
    },
    searchList(){
      return this.$store.getters.searchList
    }
  },
  mounted: function () {
    this.$store.commit('TITLE', {title: '搜索文章'})  
    this.$store.commit('ACTIVENAV', {activeNav: "search"})   
  },
  methods:{
  	handleIconClick(){
      let params={
          key:this.title,
          page:1
        }
      let payload = {'data': params, 'router': this.$router, 'store': this.$store}
      this.$store.dispatch('getSearch',payload)
    },
    godetail(id){
      let routePath = '/index/articleDetail'
      this.$router.push({path: routePath+"?_id="+id})
    },
    handleSizeChange(){
      console.log("1111")
    },
    currentChange(val){
      let params={
          key:this.title,
          page:val
      }
      let payload = {'data': params, 'router': this.$router, 'store': this.$store}
      this.$store.dispatch('getSearch',payload)
    },
  }
  
}
</script>