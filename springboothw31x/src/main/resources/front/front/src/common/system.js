export function isAuth(tableName, key) {
  let role = localStorage.getItem("UserTableName");
  let menus = [{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-full","buttons":["新增","查看","修改","删除"],"menu":"用户","menuJump":"列表","tableName":"yonghu"}],"menu":"用户管理"},{"child":[{"appFrontIcon":"cuIcon-rank","buttons":["新增","查看","修改","删除"],"menu":"景点分类","menuJump":"列表","tableName":"jingdianfenlei"}],"menu":"景点分类管理"},{"child":[{"appFrontIcon":"cuIcon-addressbook","buttons":["新增","查看","修改","删除","查看评论"],"menu":"旅游景点","menuJump":"列表","tableName":"lvyoujingdian"}],"menu":"旅游景点管理"},{"child":[{"appFrontIcon":"cuIcon-time","buttons":["新增","查看","修改","删除","查看评论"],"menu":"酒店信息","menuJump":"列表","tableName":"jiudianxinxi"}],"menu":"酒店信息管理"},{"child":[{"appFrontIcon":"cuIcon-time","buttons":["新增","查看","修改","删除","查看评论"],"menu":"特色美食","menuJump":"列表","tableName":"tesemeishi"}],"menu":"特色美食管理"},{"child":[{"appFrontIcon":"cuIcon-keyboard","buttons":["查看","修改"],"menu":"关于我们","tableName":"aboutus"},{"appFrontIcon":"cuIcon-discover","buttons":["查看","修改"],"menu":"系统简介","tableName":"systemintro"},{"appFrontIcon":"cuIcon-rank","buttons":["查看","修改"],"menu":"轮播图管理","tableName":"config"},{"appFrontIcon":"cuIcon-news","buttons":["新增","查看","修改","删除"],"menu":"系统公告","tableName":"news"}],"menu":"系统管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-form","buttons":["查看"],"menu":"旅游景点列表","menuJump":"列表","tableName":"lvyoujingdian"}],"menu":"旅游景点模块"},{"child":[{"appFrontIcon":"cuIcon-qrcode","buttons":["查看"],"menu":"酒店信息列表","menuJump":"列表","tableName":"jiudianxinxi"}],"menu":"酒店信息模块"},{"child":[{"appFrontIcon":"cuIcon-camera","buttons":["查看"],"menu":"特色美食列表","menuJump":"列表","tableName":"tesemeishi"}],"menu":"特色美食模块"}],"hasBackLogin":"是","hasBackRegister":"否","hasFrontLogin":"否","hasFrontRegister":"否","roleName":"管理员","tableName":"users"},{"backMenu":[{"child":[{"appFrontIcon":"cuIcon-addressbook","buttons":["查看"],"menu":"旅游景点","menuJump":"列表","tableName":"lvyoujingdian"}],"menu":"旅游景点管理"},{"child":[{"appFrontIcon":"cuIcon-time","buttons":["查看"],"menu":"酒店信息","menuJump":"列表","tableName":"jiudianxinxi"}],"menu":"酒店信息管理"},{"child":[{"appFrontIcon":"cuIcon-time","buttons":["查看"],"menu":"特色美食","menuJump":"列表","tableName":"tesemeishi"}],"menu":"特色美食管理"}],"frontMenu":[{"child":[{"appFrontIcon":"cuIcon-form","buttons":["查看"],"menu":"旅游景点列表","menuJump":"列表","tableName":"lvyoujingdian"}],"menu":"旅游景点模块"},{"child":[{"appFrontIcon":"cuIcon-qrcode","buttons":["查看"],"menu":"酒店信息列表","menuJump":"列表","tableName":"jiudianxinxi"}],"menu":"酒店信息模块"},{"child":[{"appFrontIcon":"cuIcon-camera","buttons":["查看"],"menu":"特色美食列表","menuJump":"列表","tableName":"tesemeishi"}],"menu":"特色美食模块"}],"hasBackLogin":"是","hasBackRegister":"是","hasFrontLogin":"是","hasFrontRegister":"是","roleName":"用户","tableName":"yonghu"}];
  for(let i=0;i<menus.length;i++){
    if(menus[i].tableName==role){
      for(let j=0;j<menus[i].frontMenu.length;j++){
          for(let k=0;k<menus[i].frontMenu[j].child.length;k++){
            if(tableName==menus[i].frontMenu[j].child[k].tableName){
              let buttons = menus[i].frontMenu[j].child[k].buttons.join(',');
              return buttons.indexOf(key) !== -1 || false
            }
          }
      }
    }
  }
  return false;
}

/**
 *  * 获取当前时间（yyyy-MM-dd hh:mm:ss）
 *   */
export function getCurDateTime() {
    let currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate(),
    hour = currentTime.getHours(),
    minute = currentTime.getMinutes(),
    second = currentTime.getSeconds();
    return year + "-" + month + "-" + day + " " +hour +":" +minute+":"+second;
}

/**
 *  * 获取当前日期（yyyy-MM-dd）
 *   */
export function getCurDate() {
    let currentTime = new Date(),
    year = currentTime.getFullYear(),
    month = currentTime.getMonth() + 1 < 10 ? '0' + (currentTime.getMonth() + 1) : currentTime.getMonth() + 1,
    day = currentTime.getDate() < 10 ? '0' + currentTime.getDate() : currentTime.getDate();
    return year + "-" + month + "-" + day;
}
