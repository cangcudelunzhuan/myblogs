<template>
	<div>
		<div v-if="labels" class="tagbox">
			<el-tag size="mini" v-for="tag in labels" type="info" key="tag">  
				<div @click="gotag(tag)">
					{{tag}}
				</div>	
			</el-tag>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		props: {
	      labels: Array
	    },
		methods:{
			gotag(item){
				this.$emit('childevent', item)
			}
		}

	}
</script>
