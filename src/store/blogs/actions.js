import {Utils} from '../util'

import Vue from 'vue'
let utils = new Utils()
export const actions = {
	getUser ({commit, state} ,payload) {
		utils.get('pro/admin/getUser/' + payload.data.username, {}).then(res => {
			// console.log("!!!!"+JSON.stringify(res))
			if(!res.status){
				payload.store.dispatch('login', payload)
			}else{
				Vue.prototype.$message({
                        message: '用户不存在',
                        type: 'error'
                })
			}
		},failData => {// statusCode为非200
			console.log("网络错误")
		})
	},
	login({commit, state} ,payload) {
		utils.post('pro/admin/signin' , payload.data, {}).then(res => {
			if(res.status==0){
				Vue.prototype.$message({
                    message: res.mes,
                    type: 'success'
                })
                commit('USERINFO', {userInfo: res.obj})
                window.sessionStorage.setItem('userInfo',JSON.stringify(res.obj))
                payload.router.push({name:'Index'})
			}else{
				Vue.prototype.$message({
                    message: res.mes,
                    type: 'error'
                })
			}
		}, failData => {
			console.log("登录失败")
		})
	},
	register({commit, state} ,payload) {
		let body={'name':payload.data.username,"password":payload.data.password}
		utils.post('pro/admin/signup' ,body, {}).then(res => {
			if(res.status==0){
				Vue.prototype.$message({
                    message: res.mes,
                    type: 'success'
                })
                payload.router.push({name:'Index'})
			}else{
				Vue.prototype.$message({
                    message: res.mes,
                    type: 'error'
                })
			}
		}, failData => {
			console.log("注册失败")
		})
	},
	getList({commit, state},page) {
		utils.get('pro/articleList?page='+page,{}).then(res => {
			for(var i=0;i<res.data.length;i++){
				res.data[i].content=res.data[i].content.replace(/<.*?>/ig,"")			
			}
			commit('ACRTLIST', {acrtlist: res})
		},failData => {// statusCode为非200
			console.log("网络错误")
		})
	},
	release({commit, state} ,payload) {
		utils.post('pro/save' ,payload.data, {}).then(res => {
			if(res.status==0){
				Vue.prototype.$message({
                    message: res.mes,
                    type: 'success'
                })
                payload.router.push({name:'List'})
			}else{
				Vue.prototype.$message({
                    message: res.mes,
                    type: 'error'
                })
			}
		}, failData => {
			console.log("发布失败")
		})
	},

	uptags({commit, state} ,payload) {
		utils.post('pro/uptags' ,payload.data, {}).then(res => {
			if(res.status==0){
   				console.log("WWWW"+JSON.stringify(res))
			}else{
				Vue.prototype.$message({
                    message: "标签出错了",
                    type: 'error'
                })
			}
		}, failData => {
			console.log("网络错误")
		})
	},
	gettags({commit, state}) {
		utils.get('pro/gettags',{}).then(res => {
			commit('TAGS', {tags: res})
		},failData => {// statusCode为非200
			console.log("网络错误")
		})
	},
	getTaginfo({commit, state},payload) {
		utils.get('pro/getTaginfo?content='+payload.data.content,{}).then(res => {
			if(res.status==0){
				commit('TAGINFO', {taginfo: res.obj})
			}else {
				commit('TAGINFO', {taginfo: "{}"})
			}
		},failData => {// statusCode为非200
			console.log("网络错误")
		})
	},
	getSearch({commit, state},payload) {
		utils.get('pro/search?key='+payload.data.key+"&page="+payload.data.page,{}).then(res => {
			commit('SEARCHLIST', {searchList: res})
		},failData => {// statusCode为非200
			console.log("网络错误")
		})
	},
	artDetail({commit, state},payload) {
		utils.get('pro/aerDetail?_id='+payload.data._id+'&auther='+payload.data.auther,{}).then(res => {
			commit('ARTDETAIL', {artDetail: res.obj})
		},failData => {// statusCode为非200
			console.log("网络错误")
		})
	},
	getpre({commit, state},payload) {
		utils.get('pro/getpre?_id='+payload.data._id,{}).then(res => {
			// console.log("~~~"+JSON.stringify(res))
			if(res[0]){
				commit('PRELIST', {preList: res[0]})
			}else{
				commit('PRELIST', {preList: "{}"})
			}
		},failData => {// statusCode为非200
			console.log("网络错误")
		})
	},
	getnext({commit, state},payload) {
		utils.get('pro/getnext?_id='+payload.data._id,{}).then(res => {
			// console.log("~~~!!!"+JSON.stringify(res))
			if(res[0]){
				commit('NEXTLIST', {nextList: res[0]})
			}else{
				commit('NEXTLIST', {nextList: "{}"})
			}
			
		},failData => {// statusCode为非200
			console.log("网络错误")
		})
	},
	godelete({commit, state} ,payload) {
		utils.post('pro/godelete' ,payload.data, {}).then(res => {
			if(res.status==0){
				Vue.prototype.$message({
                    message: res.mes,
                    type: 'success'
                })
                payload.router.push({name:'Index'})
			}else{
				Vue.prototype.$message({
                    message: "操作失败请再试一次",
                    type: 'error'
                })
			}
		}, failData => {
			console.log("网络错误")
		})
	},
	updateArt({commit, state} ,payload) {
		utils.post('pro/updateArt',payload.data, {}).then(res => {
			if(res.status==0){
				Vue.prototype.$message({
                    message: res.mes,
                    type: 'success'
                })
                payload.router.push({name:'Index'})
			}else{
				Vue.prototype.$message({
                    message: "操作失败请再试一次",
                    type: 'error'
                })
			}
		}, failData => {
			console.log("网络错误")
		})
	},
	updatePassword({commit, state} ,payload) {
		utils.post('pro/updatePassword',payload.data, {}).then(res => {
			if(res.status==0){
				Vue.prototype.$message({
                    message: res.mes,
                    type: 'success'
                })
                window.sessionStorage.setItem('userInfo',"{}")
                payload.router.push({name:'Login'})
			}else{
				Vue.prototype.$message({
                    message: res.mes,
                    type: 'error'
                })
			}
		}, failData => {
			console.log("网络错误")
		})
	},
}
