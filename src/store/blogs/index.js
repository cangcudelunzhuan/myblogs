import {actions} from './actions'
import {getters} from './getters'
import {mutations} from './mutations'

const state = {
  title: 'blogs',
  userInfo:{},
  acrtlist:{},
  artDetail:{},
  activeNav:"",
  preList:{},
  nextList:{},
  tags:[],
  taginfo:[],
  tagshow:"",
  searchList:{},
}

export default {
  state,
  getters,
  actions,
  mutations
}
