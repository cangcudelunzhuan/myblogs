import *as types from './types'
export const mutations = {
  [types.TITLE] (state, {title}){
    state.title = title
  },
  [types.USERINFO] (state, {userInfo}){
    state.userInfo = userInfo
  },
  [types.ACRTLIST] (state, {acrtlist}) {
    state.acrtlist = acrtlist
  },
  [types.ARTDETAIL] (state, {artDetail}) {
    state.artDetail = artDetail
  },
  [types.ACTIVENAV] (state, {activeNav}) {
    state.activeNav = activeNav
  },
  [types.PRELIST] (state, {preList}) {
    state.preList = preList
  },
  [types.NEXTLIST] (state, {nextList}) {
    state.nextList = nextList
  },
  [types.TAGS] (state, {tags}) {
    state.tags = tags
  },
  [types.TAGINFO] (state, {taginfo}) {
    state.taginfo = taginfo
  },
  [types.TAGSHOW] (state, {tagshow}) {
    state.tagshow = tagshow
  },
  [types.SEARCHLIST] (state, {searchList}) {
    state.searchList = searchList
  },
  
  
  
  
  
}
