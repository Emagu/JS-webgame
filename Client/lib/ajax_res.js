function loginMember(){
    /*global request 實作於 ajax.js*/
    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
    var data = request.responseText;//取得傳回的資料存在變數中
		data = JSON.parse(data);
		if(data.status == "Success"){
		    USERID = data.data.UserID;
            if(data.data.ActorID == 0){//登入成功但未有角色
                document.body.removeChild(LoginView.self);
                NewActorViewInit();  
            }else{//登入成功且已有角色
				document.body.removeChild(LoginView.self);
				HallViewInit();
		    }
		}
    }
}//登入系統函式
function registerMember(){
    /*global request 實作於 ajax.js*/
	if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
		var data = request.responseText;//取得傳回的資料存在變數中
		if(data=="Success#1") alert("註冊成功");
	}
}//註冊系統函式
function NewActorRequest(){//建立角色成功後
    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
        var data = request.responseText;//取得傳回的資料存在變數中
        switch (data) {
        /*
            error #1	未收到使用者編號
            error #2	未輸入角色名稱
            error #3	角色名稱長度不符
            error #4	角色名稱已存在
            error #5	SQL登入失敗
            error #6	SQL更新失敗
        */
        case 'error#1':
            break;
        case 'error#2':
            break;
        case 'error#3':
            break;
        case 'error#4':
            break;
        case 'error#5':
            break;
        case 'error#6':
            break;
	    default:
            /*global Actor 實作於Actor.* */
            ACTOR = new Actor(JSON.parse(data));
            document.body.removeChild(NewActorView.self);
            HallViewInit();
            break;
        }
    }
}