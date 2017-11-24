export default (stings) => {
  if (!stings) {
    return '暂无简介'
  }
  if(stings.length>50){
    return stings.substring(0,50)+"....."
  }else{
    return stings
  }
}