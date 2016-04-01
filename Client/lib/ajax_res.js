/*global VARIABLE 宣告於index*/
function checkSave_res(){
    /*global request 實作於 ajax.js*/
    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
        var data = request.responseText;//取得傳回的資料存在變數中
		console.log(data);
		data = JSON.parse(data);
		if(data.status == "Success"){
		    VARIABLE.USER.UserID = data.data.UserID;
            if(data.data.ActorID == 0){//登入成功但未有角色
                NewActorViewInit();  
            }else{//登入成功且已有角色
                VARIABLE.USER.ActorID = data.data.ActorID;
				HallViewInit();
		    }
		}else{
		    /*global loginViewiInit 實作於index*/
		    loginViewiInit();
		}
    }
}//登入系統函式
function login_res(){
    /*global request 實作於 ajax.js*/
    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
        var data = request.responseText;//取得傳回的資料存在變數中
		data = JSON.parse(data);
		if(data.status == "Success"){
		    /*global VARIABLE,LoginView 宣告於index*/
		    /*global NewActorViewInit,HallViewInit 實作於index*/
		    VARIABLE.USER.UserID = data.data.UserID;
            if(data.data.ActorID == 0){//登入成功但未有角色
                NewActorViewInit();  
            }else{//登入成功且已有角色
                VARIABLE.USER.ActorID = data.data.ActorID;
				HallViewInit();
		    }
		}
    }
}//登入系統函式
function register_res(){
    /*global request 實作於 ajax.js*/
	if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
		var data = request.responseText;//取得傳回的資料存在變數中
		if(data=="Success#1") alert("註冊成功");
	}
}//註冊系統函式
function newActor_res(){//建立角色成功後
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
            /*global VARIABLE 宣告於index*/
		    /*global HallViewInit 實作於index*/
		    var data_res = JSON.parse(data);
		    VARIABLE.USER.ActorID = data_res.NO;
            VARIABLE.USER.ActorName = data_res.actorName;
            VARIABLE.USER.Level = data_res.LV;
            HallViewInit();
            break;
        }
    }
}
function getActor_res(){//取得角色成功後
    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
        var data = request.responseText;//取得傳回的資料存在變數中
        switch (data) {
        /*
            error #1	未收到使用者編號
		    error #2	角色不存在
        */
        case 'error#1':
            break;
        case 'error#2':
            break;
	    default:
		    /*global HallViewInit 實作於index*/
		    var data_res = JSON.parse(data);
            VARIABLE.USER.ActorName = data_res.actorName;
            VARIABLE.USER.Level = data_res.LV;
            if(VARIABLE.SCENES=="hall") {
                /*global getRoomList　 實作於ajax*/
                getRoomList();
            }
            break;
        }
    }
}
function getRoomList_res(){
    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
        var data = request.responseText;//取得傳回的資料存在變數中
        VARIABLE.View.Hall.StatusRender();
        VARIABLE.View.Hall.RoomListRender(JSON.parse(data));
    }
}
function createRoom_res(){
    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
        var data = request.responseText;//取得傳回的資料存在變數中
        if(data.match("error")==null){
            VARIABLE.USER.RoomID = data;
            VARIABLE.USER.RoomMaster = true;
            /*global RoomViewInit 實作於index */
            RoomViewInit();
        }
    }
}
function getRoomData_res(){
    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
        var data = request.responseText;//取得傳回的資料存在變數中
        VARIABLE.View.Room.RoomListRender(JSON.parse(data));
        /*global getRoomData 實作於ajax */
        if(VARIABLE.SCENES == "room") getRoomData(VARIABLE.USER.RoomID);
    }
}
function addRoom_res(){
    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
        var data = request.responseText;//取得傳回的資料存在變數中
        if(data.match("error")==null){
            VARIABLE.USER.RoomID = data;
            VARIABLE.USER.RoomMaster = false;
            /*global RoomViewInit 實作於index */
            RoomViewInit();
        }
    }
}
function quitRoom_res(){
    if (request.readyState == 4) {//完成狀態有好幾種，4代表資料傳回完成
        var data = request.responseText;//取得傳回的資料存在變數中
        console.log(data);
        if(data.match("error")==null){
            VARIABLE.USER.RoomID = null;
            VARIABLE.USER.RoomMaster = null;
            /*global HallViewInit 實作於index */
            HallViewInit();
        }
    }
}