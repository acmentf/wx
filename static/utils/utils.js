const categorysJson = require('./categorys');
export default {
  getCategorys(){
    return new Promise((resolve,reject)=>{
      let liked = wx.getStorageSync('USER_COLLECT') || []
      let  categorys = categorysJson.data
      categorys.forEach(category => {
        if(!liked.length){
          // 缓存中没有用户选择的栏目 默认全部
          category.selected = true
        }else{
          category.selected = false
          liked.forEach(like => 
            category.lanmu_id === like.lanmu_id && (category.selected = true)
          )
        }
      })
      resolve(categorys)
    })
  }
}
