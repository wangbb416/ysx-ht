import store from "../store/store"
export function menuBtnValid(path,btnType){
    // console.log("***",store.state.validBtn);
    let flag = false
    if (store.state.validBtn && store.state.validBtn.length>0) {
        let data = store.state.validBtn
        data.map(item=>{
            if (item.path == path && item.btnList && item.btnList.length>0) {
                flag = item.btnList.some(btn=>{
                    return btn.name == btnType
                })
            }
        })
    }
    // console.log(flag);
    return flag
}

