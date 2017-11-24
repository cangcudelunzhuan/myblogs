export default (stings) => {
  if (!stings) {
    return '暂无内容'
  }
  if(stings.length>100){
    return stings.substring(0,100)+"....."
  }else{
    return stings
  }
}
  