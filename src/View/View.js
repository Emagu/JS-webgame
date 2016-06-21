function OriginView(windowSize,Option){
    //宣告變數
    this.self = document.createElement("div");
    this.self.style.position = "absolute";
    //變數宣告完畢
    
    //宣告函式
    this.windowReSize = function(windowSize,Option){//當視窗調整 調整版面
        this.self.style.width = Option.W+"px";
        this.self.style.height = Option.H+"px";
        if(windowSize.W > Option.W) this.self.style.left = (windowSize.W - Option.W)/2+"px";
        else this.self.style.left = "0px";
        if(windowSize.H > Option.H) this.self.style.top = (windowSize.H - Option.H)/2+"px";
        else this.self.style.top = "0px";
    };//視窗大小調整
    //函式宣告完畢
    
    //初始化函式執行
    this.windowReSize(windowSize,Option);
    //執行初始化函式完畢
    
}
function BlockView(windowSize,OptionSize){
    /*global OriginView */
    OriginView.call(this,windowSize,OptionSize);//繼承
    
    //宣告變數
    this.self.style.backgroundPosition = "center center";
    this.self.style.backgroundImage = "url('./src/View/Block.gif')";
    this.self.style.backgroundRepeat = "no-repeat";
    this.self.style.backgroundColor = "#000000";
    //變數宣告完畢
    
    //宣告函式
    //函式宣告完畢
    
    //初始化函式執行
    //執行初始化函式完畢
}
function CreateRoomView(windowSize,Option){
	/*global OriginView */
    OriginView.call(this,windowSize,Option.getWindowSize());//繼承
    
    //宣告變數
    this.self.style.backgroundImage = "url('./src/pic/CreateRoom/BackGround.png')";
	var nameCanUse = false;
	var roomname = document.createElement("input");
	roomname.setAttribute("type", "text");
	roomname.style.position = "absolute";
	roomname.style.top = "230px";
	roomname.style.width = "230px";
	roomname.style.left = "300px";
	roomname.style.backgroundColor = "transparent";
	roomname.style.border = "0px";
	roomname.style.fontSize = "x-large";
	roomname.style.color = "#FFFFFF";
	roomname.addEventListener("keyup",function(){//確認角色名稱可否使用
		VARIABLE.Socket.emit("checkRoomName",roomname.value);
	});
	
	var roomnameCheckMsg = document.createTextNode("");
	
	var roomnameCheckMsgBox = document.createElement("P");
	roomnameCheckMsgBox.style.position = "absolute";
	roomnameCheckMsgBox.style.top = "270px";
	roomnameCheckMsgBox.style.width = "300px";
	roomnameCheckMsgBox.style.left = "280px";
	roomnameCheckMsgBox.style.color = "red";
	roomnameCheckMsgBox.appendChild(roomnameCheckMsg);
	
	var MapIcon = document.createElement("div");
	MapIcon.style.position = "absolute";
	MapIcon.style.top = "200px";
	MapIcon.style.width = "480px";
	MapIcon.style.height = "270px";
	MapIcon.style.left = "715px";
	MapIcon.style.backgroundImage = "url('src/pic/CreateRoom/Map1.png')";
	MapIcon.style.backgroundRepeat = "no-repeat";
	MapIcon.style.backgroundPosition = "center center";
	
	var commit = document.createElement("P");
	commit.style.position = "absolute";
	commit.style.top = "595px";
    commit.style.width = "140px";
    commit.style.height = "50px";
    commit.style.left = "260px";
    commit.style.cursor = "pointer";
    commit.addEventListener("click",function() {
		/*global ViewInit,VARIABLE 宣告於index*/
		if(VARIABLE.USER.ActorID && nameCanUse){
			var data = new Object();
			data.RoomMaster = VARIABLE.USER.ActorID;
			data.Mode = GameMode.value;
			data.Map = MapSelect.value;//測試
			data.Name = roomname.value;
			ViewInit(VARIABLE.View.Block.self);
			VARIABLE.Socket.emit("CreateRoom",data);
		}
	});
    
    var canncel = document.createElement("P");
	canncel.style.position = "absolute";
	canncel.style.top = "595px";
    canncel.style.width = "140px";
    canncel.style.height = "40px";
    canncel.style.left = "895px";
    canncel.style.cursor = "pointer";
    canncel.addEventListener("click",function() {
		/*global HallViewInit 實作於index*/
		ViewInit(VARIABLE.View.Block.self);
	    HallViewInit();
	});
	
	var GameMode = document.createElement("select");
	GameMode.style.position = "absolute";
	GameMode.style.top = "315px";
    GameMode.style.width = "230px";
    GameMode.style.height = "33px";
    GameMode.style.left = "300px";
    var GameModeArray = Option.getGameModeArray();
    for(var i=0;i<GameModeArray.length;i++){
    	var temp = document.createElement("option");
    	temp.setAttribute("value",i);
		temp.appendChild(document.createTextNode(GameModeArray[i]));
    	GameMode.appendChild(temp);
    }
    
    var MapSelect = document.createElement("select");
	MapSelect.style.position = "absolute";
	MapSelect.style.top = "400px";
    MapSelect.style.width = "230px";
    MapSelect.style.height = "33px";
    MapSelect.style.left = "300px";
    MapSelect.addEventListener("change",function() {
        MapIcon.style.backgroundImage = "url('src/pic/CreateRoom/Map"+MapSelect.value+".png')";
    });
    var MapArray = VARIABLE.Map;
    for(var i=0;i<MapArray.length;i++){
    	var temp = document.createElement("option");
    	temp.setAttribute("value",MapArray[i].NO);
		temp.appendChild(document.createTextNode(MapArray[i].MapName));
    	MapSelect.appendChild(temp);
    }
    
    this.self.appendChild(MapIcon);
    this.self.appendChild(MapSelect);
	this.self.appendChild(GameMode);
	this.self.appendChild(roomnameCheckMsgBox);
	this.self.appendChild(commit);
	this.self.appendChild(roomname);
	this.self.appendChild(canncel);
    //變數宣告完畢
    
    //宣告函式
    this.checkRoomNameRes = function(data){
    	switch(data.status){
    		case "error":
    			console.log(data.log);
    			nameCanUse = false;
    			break;
    		case "typeerror":
    			roomnameCheckMsgBox.removeChild(roomnameCheckMsg);
		    	roomnameCheckMsgBox.style.color = "red";
    	       	roomnameCheckMsg = document.createTextNode("房間名稱必須介於5~10字");
    	        roomnameCheckMsgBox.appendChild(roomnameCheckMsg);
    	        nameCanUse = false;
    	        break;
			case "Used":
				roomnameCheckMsgBox.removeChild(roomnameCheckMsg);
		    	roomnameCheckMsgBox.style.color = "red";
    	       	roomnameCheckMsg = document.createTextNode("房間名稱重複!");
    	        roomnameCheckMsgBox.appendChild(roomnameCheckMsg);
    	        nameCanUse = false;
				break;
			case "canUse":
				roomnameCheckMsgBox.removeChild(roomnameCheckMsg);
    	        roomnameCheckMsg = document.createTextNode("房間名稱可以使用");
    	        roomnameCheckMsgBox.style.color = "green";
    	        roomnameCheckMsgBox.appendChild(roomnameCheckMsg);
    	        nameCanUse = true;
				break;
    	}
	};//確認房名是否重複      
    //函式宣告完畢
	
	//初始化函式執行
	//執行初始化函式完畢
}
function HallView(windowSize,OptionSize){
    /*global OriginView */
    OriginView.call(this,windowSize,OptionSize);//繼承 
    
    this.self.style.backgroundImage = "url('./src/pic/Hall/BackGround.png')";
    //宣告變數
    var command = document.createElement("div");
    command.style.width = "260px";
    command.style.height = "500px";
    command.style.position = "absolute";
    command.style.left = "25px";
    command.style.top = "50px";
    
    var command_CreateRoom = document.createElement("div");
    command_CreateRoom.style.width = "185px";
    command_CreateRoom.style.height = "65px";
    command_CreateRoom.style.left = "35px";
    command_CreateRoom.style.top = "5px";
    command_CreateRoom.style.position = "absolute";
    command_CreateRoom.style.cursor = "pointer";
    command_CreateRoom.addEventListener("click",function(){
        /*global CreateRoomViewInit 實作於index */
        CreateRoomViewInit();
    });
    
    var command_Option = document.createElement("div");
    command_Option.style.width = "185px";
    command_Option.style.height = "65px";
    command_Option.style.left = "35px";
    command_Option.style.top = "80px";
    command_Option.style.position = "absolute";
    command_Option.style.cursor = "pointer";
    command_Option.addEventListener("click",function(){
        /*global OptionEditViewInit 實作於index */
        //OptionEditViewInit();
    });
    var command_logout = document.createElement("div");
    command_logout.style.width = "185px";
    command_logout.style.height = "65px";
    command_logout.style.left = "35px";
    command_logout.style.top = "240px";
    command_logout.style.position = "absolute";
    command_logout.style.cursor = "pointer";
    command_logout.addEventListener("click",function(){
        VARIABLE.Socket.emit("logout",VARIABLE.USER.UserID);
        ViewInit(VARIABLE.View.Block.self);
        deleteAllCookies();/*global deleteAllCookies in index*/
        setTimeout(function(){
            loginViewiInit();/*global loginViewiInit in index*/
        },2000);
    });
    
    command.appendChild(command_CreateRoom);
    command.appendChild(command_Option);
    command.appendChild(command_logout);
    
    var status = null;
    createStatus();
    
    var roomList=null;
    createRoomList();
	
	this.self.appendChild(status);
	this.self.appendChild(roomList);
    this.self.appendChild(command);
    //變數宣告完畢
    
    //宣告函式
    function createRoomList(){
        roomList = document.createElement("div");
        roomList.style.width = "880px";
        roomList.style.height = "520px";
        roomList.style.position = "absolute";
        roomList.style.left = "340px";
        roomList.style.top = "200px";
        roomList.style.overflowY = "auto";
    }
    function createStatus(){
        status = document.createElement("div");
        status.style.width = "260px";
        status.style.height = "120px";
        status.style.left = "35px";
        status.style.top = "570px";
        status.style.position = "absolute";
        status.style.fontSize = "xx-large";
        status.style.color = "#ffffff";
    }
    this.update = function(data){
        console.log(data);
        if(VARIABLE.SCENES != "hall") return;
        if(roomList.parentElement==this.self) this.self.removeChild(roomList);
        if(data.length <= 0) return;
	    function insertRoom(Div,RoomID){
	        Div.addEventListener("click",function(){
	            /*global ViewInit,VARIABLE*/
	            var data = new Object();
	            data.RoomID = RoomID;
	            data.ActorID = VARIABLE.USER.ActorID;
	            ViewInit(VARIABLE.View.Block.self);
	            VARIABLE.Socket.emit("addRoom",data);
	        });
	    }
	    createRoomList()
        for(var i=0;i<data.length;i++){
            var roomDiv = document.createElement("div");
            roomDiv.style.width = "98%";
            roomDiv.style.height = "120px";
            roomDiv.style.backgroundImage = "url('./src/pic/Hall/RoomLabel.png')";
            roomDiv.style.position = "absolute";
            roomDiv.style.left = "1%";
            roomDiv.style.top = (122*i) + "px";
            roomDiv.style.cursor = "pointer";
            var roomIcon = document.createElement("div");
            roomIcon.style.width = "80px";
            roomIcon.style.height = "78px";
            roomIcon.style.left = "30px";
            roomIcon.style.top = "18px";
            roomIcon.style.position = "absolute";
            roomIcon.style.backgroundColor = "#000000";
            var roomNO = document.createElement("div");
            roomNO.style.width = "100px";
            roomNO.style.height = "48px";
            roomNO.style.left = "150px";
            roomNO.style.top = "40px";
            roomNO.style.position = "absolute";
            roomNO.style.textAlign = "center";
            roomNO.style.fontSize = "xx-large";
            roomNO.style.color = "#ffffff";
            roomNO.appendChild(document.createTextNode(data[i].NO));
            var roomName = document.createElement("div");
            roomName.style.width = "400px";
            roomName.style.height = "48px";
            roomName.style.left = "300px";
            roomName.style.top = "40px";
            roomName.style.position = "absolute";
            roomName.style.textAlign = "center";
            roomName.style.fontSize = "xx-large";
            roomName.style.color = "#ffffff";
            roomName.appendChild(document.createTextNode(data[i].Name));
            var roomCount = document.createElement("div");
            roomCount.style.width = "100px";
            roomCount.style.height = "48px";
            roomCount.style.left = "750px";
            roomCount.style.top = "40px";
            roomCount.style.position = "absolute";
            roomCount.style.textAlign = "center";
            roomCount.style.fontSize = "xx-large";
            roomCount.style.color = "#ffffff";
            roomCount.appendChild(document.createTextNode(data[i]["COUNT(actorID)"]+" / 10"));
            roomDiv.appendChild(roomIcon);
            roomDiv.appendChild(roomNO);
            roomDiv.appendChild(roomName);
            roomDiv.appendChild(roomCount);
            insertRoom(roomDiv,data[i].NO);
            roomList.appendChild(roomDiv);
        }
        this.self.appendChild(roomList);
	};//刷新*/
    this.StatusRender = function() {
        this.self.removeChild(status);
        createStatus();
        /*global VARIABLE 宣告於index*/
        status.appendChild(document.createTextNode("角色名稱:"));
        status.appendChild(document.createElement("br"));
        status.appendChild(document.createTextNode(VARIABLE.USER.ActorName));
        this.self.appendChild(status);
    };//狀態欄渲染
    //函式宣告完畢
    
}
function LoginView(windowSize){
    //宣告變數
    //載體
    this.self = document.createElement("div");
    this.self.style.height ="600px";
    this.self.style.width ="800px";
    this.self.style.backgroundImage = "url('src/pic/loginpageimg/loginimg.png')";
    this.self.style.position = "absolute";
    //輸入端口
	//標籤
	var user = document.createElement("input");
	user.setAttribute("type", "text");
	user.style.fontSize = "x-large"; //http://www.w3schools.com/jsref/prop_style_fontsize.asp
	user.style.color = "#FFFFFF";
	user.style.backgroundColor = "transparent";
	user.style.border = "0px";
	user.style.position = "absolute";
	user.style.top = "225px";
	user.style.width = "360px";
	user.style.height="50px";
	user.style.left = "330px";
	
	var pw = document.createElement("input");
	pw.setAttribute("type", "password");
	pw.style.backgroundColor = "transparent";
	pw.style.fontSize = "x-large";
	pw.style.color = "#FFFFFF";
	pw.style.border = "0px";
	pw.style.position = "absolute";
	pw.style.top = "300px";
	pw.style.width = "360px";
	pw.style.height="50px";
	pw.style.left = "330px";

	this.forgetPW = document.createElement("p");
	this.forgetPW.style.position = "absolute";
	this.forgetPW.style.width = "250";
	this.forgetPW.style.height="55";
	this.forgetPW.style.top = "390";
	this.forgetPW.style.left = "125";
	this.forgetPW.style.cursor = "pointer";
	
	var Reg = document.createElement("p");
	Reg.style.position = "absolute";
	Reg.style.top = "390px";
	Reg.style.width = "250px";
	Reg.style.height = "55px";
	Reg.style.left = "115px";
	Reg.style.cursor = "pointer";
	Reg.addEventListener("click",function(){
	   	/*global registerViewInit 實作於 index */
		registerViewInit();
	});
	        
	var commit = document.createElement("p");
	commit.style.position = "absolute";
	commit.style.top = "475px";
	commit.style.width = "585px";
	commit.style.height= "60px";
	commit.style.left = "140px";
	commit.style.cursor = "pointer";
	commit.addEventListener("click",function(){
		/*global ViewInit,VARIABLE in index.html*/
		ViewInit(VARIABLE.View.Block.self);
		VARIABLE.Socket.emit("login",{Name:user.value,PW:pw.value});/*global VARIABLE in index*/
	});
	
	this.self.appendChild(user);
	this.self.appendChild(pw);
	this.self.appendChild(this.forgetPW);
    this.self.appendChild(commit);
    this.self.appendChild(Reg);
    //變數宣告完畢
    
    //宣告函式
    this.windowReSize = function(windowSize){//當視窗調整 調整版面
        this.self.style.top = (windowSize.H / 2 - 300) + "px";
        this.self.style.left = (windowSize.W / 2 - 400) + "px";
    }
    //函式宣告完畢
    
    //初始化函式執行
    this.windowReSize(windowSize);
    //執行初始化函式完畢
}
function NewActorView(windowSize,OptionSize){
    /*global OriginView */
    OriginView.call(this,windowSize,OptionSize);//繼承 
    
    //宣告變數
    this.self.style.backgroundColor = "#FFFFFF";
    var NameCanUse = false;
    var title = document.createElement("H1");
    title.style.width = "100%";
    title.style.height = "10%";
    title.style.backgroundColor = "#00AAAA";
    title.style.position = "absolute";
    title.style.left = "0px";
    title.style.top = "0px";
    title.style.textAlign = "center";
    title.appendChild(document.createTextNode("創建角色"));
    
    var actortxt = document.createElement("P");
	actortxt.style.position = "absolute";
	actortxt.style.top = "30%";
	actortxt.style.width = "10%";
	actortxt.style.left = "2%";
	actortxt.appendChild(document.createTextNode("角色名稱:"));
	
	var actor = document.createElement("input");
	actor.setAttribute("type", "text");
	actor.style.position = "absolute";
	actor.style.top = "31.5%";
	actor.style.width = "10%";
	actor.style.left = "14%";
	actor.addEventListener("keydown",function(){//確認角色名稱可否使用
	    VARIABLE.Socket.emit("newActorNameCheck",actor.value);/*global VARIABLE in index*/
	});
	
	var actorCheckMsg = document.createTextNode("角色名稱長度5~10字");
	
	var actorCheckMsgBox = document.createElement("P");
	actorCheckMsgBox.style.position = "absolute";
	actorCheckMsgBox.style.top = "30%";
	actorCheckMsgBox.style.width = "15%";
	actorCheckMsgBox.style.left = "26%";
	actorCheckMsgBox.style.color = "red";
	actorCheckMsgBox.appendChild(actorCheckMsg);
	
	var commit = document.createElement("P");
	commit.style.position = "absolute";
	commit.style.top = "90%";
    commit.style.width = "100%";
    commit.style.left = "0%";
    commit.style.cursor = "pointer";
    commit.style.textAlign = "center";
    commit.appendChild(document.createTextNode("建立!"));
    commit.addEventListener("click",function() {
		if(!NameCanUse) return;
		var data = new Object();
		data.actorName = actor.value;
		data.userID = VARIABLE.USER.UserID;
		VARIABLE.Socket.emit("newActor",data);/*global VARIABLE in index*/
	});
	
    this.self.appendChild(title);
    this.self.appendChild(actortxt);
    this.self.appendChild(actorCheckMsgBox);
	this.self.appendChild(commit);
	this.self.appendChild(actor);
	//變數宣告完畢
	
	//宣告函式
	this.CheckActorName = function(data){
		switch(data.status){
		    case "typeerror"://長度不符
		        actorCheckMsgBox.removeChild(actorCheckMsg);
    		    actorCheckMsg = document.createElement("div");
    		    actorCheckMsg.style.textAlign = "center";
    		    actorCheckMsg.style.color = "red";
    	        actorCheckMsg.appendChild(document.createTextNode("角色名稱長度不符"));
    	        actorCheckMsg.appendChild(document.createElement("br"));
    	        actorCheckMsg.appendChild(document.createTextNode("要求:5~10字"));
    	        actorCheckMsgBox.appendChild(actorCheckMsg);
    	        NameCanUse = false;
    	        break;
			case "canUse"://可以創建
				actorCheckMsgBox.removeChild(actorCheckMsg);
				actorCheckMsg = document.createTextNode("角色名稱可以使用");
				actorCheckMsgBox.style.color = "green";
				actorCheckMsgBox.appendChild(actorCheckMsg);
				NameCanUse = true;
			break;
			case "Used"://角色名稱重複
				actorCheckMsgBox.removeChild(actorCheckMsg);
				actorCheckMsgBox.style.color = "red";
				actorCheckMsg = document.createTextNode("角色名稱重複!");
				actorCheckMsgBox.appendChild(actorCheckMsg);
				NameCanUse = false;
			break;
			case "error":
				console.log(data.log);
				break
		}
	};
    //函式宣告完畢
    
    //初始化函式執行
    //執行初始化函式完畢
}
function OptionEditView(windowSize,Option){
    /*global OriginView */
    OriginView.call(this,windowSize,Option.getWindowSize());//繼承 
    
    //宣告變數
    var edited = false;
    var Resolution_Origin = Option.getWindowSet();
    
    this.self.style.backgroundColor = "#FFFFFF";
    this.self.style.textAlign = "center";
    
    var title = document.createElement("H1");
    title.style.width = "100%";
    title.style.height = "10%";
    title.style.backgroundColor = "#00AAAA";
    title.style.left = "0px";
    title.style.top = "0px";
    title.appendChild(document.createTextNode("遊戲設定"));
    
    var ResolutionLabel = document.createElement("P");
    ResolutionLabel.style.position = "absolute";
	ResolutionLabel.style.width = "60%";
	ResolutionLabel.style.top = "25%";
	ResolutionLabel.style.left = "20%";
	ResolutionLabel.appendChild(document.createTextNode("解析度"));
	
	var ResolutionMsg = document.createTextNode(Option.getWindowSize().W + " X " +Option.getWindowSize().H);
	
	var ResolutionDiv = document.createElement("div");
	ResolutionDiv.style.width = "300px";
    ResolutionDiv.style.height = "100px";
    ResolutionDiv.style.left = "50%";
    ResolutionDiv.style.top = "33%";
    ResolutionDiv.style.marginLeft = "-150px";
    ResolutionDiv.style.position = "absolute";
    
    var ResolutionAdd = document.createElement("input");
    ResolutionAdd.style.width = "30px";
    ResolutionAdd.setAttribute("type", "image");
    ResolutionAdd.setAttribute("src", "./src/pic/UI/Button/Triangle_R_R.png");
    ResolutionAdd.addEventListener("click",function(){
       Option.WindowSizeAdd(1);
       update_Resolution();
    });
	
	var ResolutionSub = document.createElement("input");
	ResolutionSub.style.width = "30px";
	ResolutionSub.setAttribute("type", "image");
    ResolutionSub.setAttribute("src", "./src/pic/UI/Button/Triangle_L_R.png");
    ResolutionSub.addEventListener("click",function(){
       Option.WindowSizeSub(1);
       update_Resolution();
    });
	
	ResolutionDiv.appendChild(ResolutionSub);
	ResolutionDiv.appendChild(ResolutionMsg);
	ResolutionDiv.appendChild(ResolutionAdd);
	
	var commit = document.createElement("P");
	commit.style.position = "absolute";
	commit.style.top = "90%";
    commit.style.width = "50%";
    commit.style.left = "0%";
    commit.style.cursor = "pointer";
    commit.style.textAlign = "center";
    commit.appendChild(document.createTextNode("儲存!"));
    commit.addEventListener("click",function() {
		/*global onWindowReSize,HallViewInit,ViewInit,VARIABLE in index*/
		onWindowReSize();
		ViewInit(VARIABLE.View.Block.self);
	    HallViewInit();
	});
	
	var cancel = document.createElement("p");
	cancel.style.position = "absolute";
	cancel.style.top = "90%";
	cancel.style.width = "50%";
	cancel.style.left = "50%";
	cancel.style.cursor = "pointer";
	cancel.appendChild(document.createTextNode("返回"));
	cancel.addEventListener("click",function(){		
	    //還原
	    Option.setWindowSize(Resolution_Origin);
		/*global HallViewInit,ViewInit,VARIABLE in index*/
		ViewInit(VARIABLE.View.Block.self);
	    HallViewInit();
	});
    
    this.self.appendChild(title);
    this.self.appendChild(ResolutionLabel);
    this.self.appendChild(ResolutionDiv);
    this.self.appendChild(commit);
    this.self.appendChild(cancel);
    
    
	//變數宣告完畢
	
	//宣告函式
	function update_Resolution(){
	    ResolutionDiv.removeChild(ResolutionDiv.childNodes[1]);
	    var ResolutionMsg = document.createTextNode(Option.getWindowSize().W + " X " +Option.getWindowSize().H);
	    ResolutionDiv.insertBefore(ResolutionMsg,ResolutionDiv.childNodes[1]);
	    if(!edited) {
	        
	    }
	    edited = true;
	    
	}
    //函式宣告完畢
    
    //初始化函式執行
    //執行初始化函式完畢
}
function RoomView(windowSize,Option){    /*global OriginView */
    OriginView.call(this,windowSize,Option.getWindowSize());//繼承 
    this.self.style.backgroundImage = "url('./src/pic/Room/BackGround.png')";
    
    //宣告變數
    var playerArray = [];
    var RoomStatusDiv = null;
    
    var command_Start = document.createElement("div");
    command_Start.style.width = "300px";
    command_Start.style.height = "150px";
    command_Start.style.left = "972px";
    command_Start.style.top = "470px";
    command_Start.style.position = "absolute";
    command_Start.style.cursor = "pointer";
    command_Start.style.backgroundImage = "url('./src/pic/Room/BTN_Start.png')";
    command_Start.style.backgroundPosition = "center center";
    command_Start.style.display = "none";
    command_Start.addEventListener("click",function() {
        //開始選角
        VARIABLE.Socket.emit("preSelect",VARIABLE.USER.RoomID);
    });
    
    var command_Quit = document.createElement("div");
    command_Quit.style.width = "300px";
    command_Quit.style.height = "65px";
    command_Quit.style.left = "972px";
    command_Quit.style.top = "645px";
    command_Quit.style.position = "absolute";
    command_Quit.style.cursor = "pointer";
    command_Quit.addEventListener("click",function(){
        /*global ViewInit,VARIABLE 宣告於index*/
        var data = new Object();
        data.ActorID = VARIABLE.USER.ActorID;
        data.RoomID = VARIABLE.USER.RoomID;
        data.Echo = true;
        ViewInit(VARIABLE.View.Block.self);
        VARIABLE.SCENES = "hall";
        VARIABLE.Socket.emit("quitRoom",data);
    });
    
    var Join_Aside = document.createElement("div");
    Join_Aside.style.width = "430px";
    Join_Aside.style.height = "75px";
    Join_Aside.style.left = "49px";
    Join_Aside.style.position = "absolute";
    
    var BTN_Join_Aside = document.createElement("div");
    BTN_Join_Aside.style.width = "220px";
    BTN_Join_Aside.style.height = "30px";
    BTN_Join_Aside.style.left = "34px";
    BTN_Join_Aside.style.top = "23px";
    BTN_Join_Aside.style.position = "absolute";
    BTN_Join_Aside.style.cursor = "pointer";
    BTN_Join_Aside.addEventListener("click",function() {
        VARIABLE.Socket.emit("SetRoomSide",{Side:0,ActorID:VARIABLE.USER.ActorID,RoomID:VARIABLE.USER.RoomID});
    });
    
    var BTN_AI_Aside = document.createElement("div");
    BTN_AI_Aside.style.width = "140px";
    BTN_AI_Aside.style.height = "30px";
    BTN_AI_Aside.style.left = "280px";
    BTN_AI_Aside.style.top = "23px";
    BTN_AI_Aside.style.position = "absolute";
    BTN_AI_Aside.style.cursor = "pointer";
    BTN_AI_Aside.style.display = "none";
    BTN_AI_Aside.style.backgroundImage = "url('./src/pic/Room/Join_AI.png')";
    BTN_AI_Aside.addEventListener("click",function() {
        VARIABLE.Socket.emit("addAI",{Side:0,RoomID:VARIABLE.USER.RoomID});
    });
    
    Join_Aside.appendChild(BTN_AI_Aside);
    Join_Aside.appendChild(BTN_Join_Aside);
    
    var Join_Bside = document.createElement("div");
    Join_Bside.style.width = "430px";
    Join_Bside.style.height = "75px";
    Join_Bside.style.left = "491px";
    Join_Bside.style.position = "absolute";
    
    var BTN_Join_Bside = document.createElement("div");
    BTN_Join_Bside.style.width = "220px";
    BTN_Join_Bside.style.height = "30px";
    BTN_Join_Bside.style.left = "34px";
    BTN_Join_Bside.style.top = "23px";
    BTN_Join_Bside.style.position = "absolute";
    BTN_Join_Bside.style.cursor = "pointer";
    BTN_Join_Bside.addEventListener("click",function() {
        VARIABLE.Socket.emit("SetRoomSide",{Side:1,ActorID:VARIABLE.USER.ActorID,RoomID:VARIABLE.USER.RoomID});
    });
    
    var BTN_AI_Bside = document.createElement("div");
    BTN_AI_Bside.style.width = "140px";
    BTN_AI_Bside.style.height = "30px";
    BTN_AI_Bside.style.left = "280px";
    BTN_AI_Bside.style.top = "23px";
    BTN_AI_Bside.style.position = "absolute";
    BTN_AI_Bside.style.cursor = "pointer";
    BTN_AI_Bside.style.display = "none";
    BTN_AI_Bside.style.backgroundImage = "url('./src/pic/Room/Join_AI.png')";
    BTN_AI_Bside.addEventListener("click",function() {
        VARIABLE.Socket.emit("addAI",{Side:1,RoomID:VARIABLE.USER.RoomID});
    });
    
    Join_Bside.appendChild(BTN_AI_Bside);
    Join_Bside.appendChild(BTN_Join_Bside);
    
    var messageField = document.createElement("div");
    messageField.style.height = "180px";
    messageField.style.width = "900px";
    messageField.style.left = "32px";
    messageField.style.top = "495px";
    messageField.style.overflowY = "auto";
    messageField.style.position = "absolute";
    messageField.style.listStyleType = "none";
    
    var messageInput = document.createElement("input");
    messageInput.style.backgroundColor = "transparent";
	messageInput.style.fontSize = "x-large";
	messageInput.style.color = "#000000";
	messageInput.style.border = "0px";
	messageInput.style.position = "absolute";
	messageInput.style.top = "684px";
	messageInput.style.left = "32px";
	messageInput.style.width = "800px";
	messageInput.style.height="26px";
	messageInput.addEventListener("keydown",function(e) {
	    if(e.keyCode==13) {
	        VARIABLE.Socket.emit("RoomNewMsg",{Message:messageInput.value,ActorName:VARIABLE.USER.ActorName,RoomID:VARIABLE.USER.RoomID});
	        messageInput.value = "";
	    }
	});
	
	var messageSend = document.createElement("div");
	messageSend.style.position = "absolute";
	messageSend.style.top = "684px";
	messageSend.style.left = "843px";
	messageSend.style.width = "92px";
	messageSend.style.height="26px";
	messageSend.style.cursor="pointer";
	messageSend.addEventListener("click",function(){
	   VARIABLE.Socket.emit("RoomNewMsg",{Message:messageInput.value,ActorName:VARIABLE.USER.ActorName,RoomID:VARIABLE.USER.RoomID});
	   messageInput.value = "";
	});
    
    this.self.appendChild(messageField);
    this.self.appendChild(messageSend);
    this.self.appendChild(messageInput);
    this.self.appendChild(Join_Aside);
    this.self.appendChild(Join_Bside);
	this.self.appendChild(command_Quit);
	this.self.appendChild(command_Start);
	//變數宣告完畢
	
	//宣告函式
	function RoomStatus(data){
	    this.Div = document.createElement("div");
	    this.Div.style.width = "150px";
	    this.Div.style.height = "200px";
	    this.Div.style.left = "1120px";
	    this.Div.style.top = "270px";
	    this.Div.style.position = "absolute";
	    
	    var MapName = document.createElement("div");
	    MapName.style.width = "98%";
	    MapName.style.height = "44px";
	    MapName.style.left = "1%";
	    MapName.style.top = "5px";
	    MapName.style.position = "absolute";
	    MapName.style.color = "#FFFFFF";
	    MapName.style.fontSize = "30pt";
	    MapName.appendChild(document.createTextNode(data.MapName));
	    
	    var Mode = document.createElement("div");
	    Mode.style.width = "98%";
	    Mode.style.height = "44px";
	    Mode.style.left = "1%";
	    Mode.style.top = "53px";
	    Mode.style.position = "absolute";
	    Mode.style.color = "#FFFFFF";
	    Mode.style.fontSize = "30pt";
	    var ModeArray = Option.getGameModeArray();
	    Mode.appendChild(document.createTextNode(ModeArray[data.Mode]));
	    
	    var PlayNum = document.createElement("div");
	    PlayNum.style.width = "98%";
	    PlayNum.style.height = "44px";
	    PlayNum.style.left = "1%";
	    PlayNum.style.top = "103px";
	    PlayNum.style.position = "absolute";
	    PlayNum.style.color = "#FFFFFF";
	    PlayNum.style.fontSize = "30pt";
	    
	    var RoomName = document.createElement("div");
	    RoomName.style.width = "98%";
	    RoomName.style.height = "44px";
	    RoomName.style.left = "1%";
	    RoomName.style.top = "148px";
	    RoomName.style.position = "absolute";
	    RoomName.style.color = "#FFFFFF";
	    RoomName.style.fontSize = "30pt";
	    RoomName.appendChild(document.createTextNode(data.RoomName));
	    
	    this.Div.appendChild(MapName);
	    this.Div.appendChild(Mode);
	    this.Div.appendChild(PlayNum);
	    this.Div.appendChild(RoomName);
	}
	function playerItem(i,playerData,isMaster){
	    this.Div = document.createElement("div");
	    this.Div.style.width = "430px";
	    this.Div.style.height = "75px";
	    if(playerData.side==1) this.Div.style.left = "491px";
	    else this.Div.style.left = "49px";
	    this.Div.style.top = (78 + 75*i) +"px";
	    if(i<4) this.Div.style.backgroundImage = "url('./src/pic/Room/playerItem.png')";
	    else this.Div.style.backgroundImage = "url('./src/pic/Room/playerItem_1.png')";
	    this.Div.style.backgroundPosition = "center center";
	    this.Div.style.position = "absolute";
	    
	    var PlayName = document.createElement("div");
	    PlayName.style.width = "200px";
	    PlayName.style.height = "30px";
	    PlayName.style.left = "100px";
	    PlayName.style.top = "5px";
	    PlayName.style.position = "absolute";
	    PlayName.style.fontSize = "x-large";
	    PlayName.style.color = "#FFFFFF";
	    PlayName.appendChild(document.createTextNode(playerData.actorName));
	    this.Div.appendChild(PlayName);
	    
	    if(isMaster && VARIABLE.USER.ActorID != playerData.actorID){
	        var deletePlayer = document.createElement("div");
    	    deletePlayer.style.width = "32px";
    	    deletePlayer.style.height = "32px";
    	    deletePlayer.style.left = "370px";
    	    deletePlayer.style.top = "10px";
    	    deletePlayer.style.position = "absolute";
    	    deletePlayer.style.cursor = "pointer";
    	    deletePlayer.style.backgroundImage = "url('./src/pic/Room/X_icon.png')"
    	    
    	    this.Div.appendChild(deletePlayer);
	    }
	}
	function AIItem(i,Side,isMaster){
	    this.Div = document.createElement("div");
	    this.Div.style.width = "430px";
	    this.Div.style.height = "75px";
	    if(Side==1) this.Div.style.left = "491px";
	    else this.Div.style.left = "49px";
	    this.Div.style.top = (78 + 75*i) +"px";
	    if(i<4) this.Div.style.backgroundImage = "url('./src/pic/Room/playerItem.png')";
	    else this.Div.style.backgroundImage = "url('./src/pic/Room/playerItem_1.png')";
	    this.Div.style.backgroundPosition = "center center";
	    this.Div.style.position = "absolute";
	    
	    var PlayName = document.createElement("div");
	    PlayName.style.width = "200px";
	    PlayName.style.height = "30px";
	    PlayName.style.left = "100px";
	    PlayName.style.top = "5px";
	    PlayName.style.position = "absolute";
	    PlayName.style.fontSize = "x-large";
	    PlayName.style.color = "#FFFFFF";
	    
	    PlayName.appendChild(document.createTextNode("AI NO."+(i+(Side*5))));
	    this.Div.appendChild(PlayName);
	    
	    if(isMaster){
	        var deletePlayer = document.createElement("div");
    	    deletePlayer.style.width = "32px";
    	    deletePlayer.style.height = "32px";
    	    deletePlayer.style.left = "370px";
    	    deletePlayer.style.top = "10px";
    	    deletePlayer.style.position = "absolute";
    	    deletePlayer.style.backgroundImage = "url('./src/pic/Room/X_icon.png')"
    	    deletePlayer.style.cursor = "pointer";
    	    deletePlayer.addEventListener("click",function() {
    	        VARIABLE.Socket.emit("deleteAI",{Side:Side,RoomID:VARIABLE.USER.RoomID});
    	    });
    	    this.Div.appendChild(deletePlayer);
	    }
	}
	this.update = function(data){
        if(data.status!="secss" || data.RoomID!=VARIABLE.USER.RoomID || VARIABLE.SCENES!="room") return;
        for(var i=0; i<playerArray.length;i++){
            this.self.removeChild(playerArray[i]);
        }
        playerArray = [];
        var PlayData = data.PlayData;
        var Master = data.Master;
        var MasterName;
        var isMaster = false;
        var sideA = 0;
        var sideB = 0;
        for(var i=0;i<PlayData.length;i++){
            if(PlayData[i].actorID==Master){
                MasterName = PlayData[i].actorName;
                if(PlayData[i].actorID==VARIABLE.USER.ActorID){
                    command_Start.style.display = "";
                    BTN_AI_Aside.style.display = "";
                    BTN_AI_Bside.style.display = "";
                    isMaster = true;
                }
            }
            if(PlayData[i].side==0){
                var temp = new playerItem(sideA,PlayData[i],isMaster);
                playerArray.push(temp.Div);
                this.self.appendChild(temp.Div);
                sideA++;
            }else{
                var temp = new playerItem(sideB,PlayData[i],isMaster);
                playerArray.push(temp.Div);
                this.self.appendChild(temp.Div);
                sideB++;
            }
        }
        for(var i=0;i<data.SideA_AI;i++){
            var temp = new AIItem(sideA,0,isMaster);
            playerArray.push(temp.Div);
            this.self.appendChild(temp.Div);
            sideA++;
        }
        for(var i=0;i<data.SideB_AI;i++){
            var temp = new AIItem(sideB,1,isMaster);
            playerArray.push(temp.Div);
            this.self.appendChild(temp.Div);
            sideB++;
        }
        
        Join_Aside.style.display = "";    
        if(sideA<5) {
            Join_Aside.style.top = (78 + sideA * 75) + "px";
            if(sideA==4) Join_Aside.style.backgroundImage = "url('./src/pic/Room/Join_1.png')";
            else Join_Aside.style.backgroundImage = "url('./src/pic/Room/Join.png')";
        }else{
            Join_Aside.style.display = "none";  
            BTN_AI_Aside.style.display = "none";
        } 
        Join_Bside.style.display = "";
        if(sideB<5) {
            Join_Bside.style.top = (78 + sideB * 75) + "px";
            if(sideB==4) Join_Bside.style.backgroundImage = "url('./src/pic/Room/Join_1.png')";
            else Join_Bside.style.backgroundImage = "url('./src/pic/Room/Join.png')";
        }else{
            Join_Bside.style.display = "none";
            BTN_AI_Bside.style.display = "none";
        } 
        if(RoomStatusDiv!=null) this.self.removeChild(RoomStatusDiv);
        RoomStatusDiv = new RoomStatus({RoomName:data.RoomName,Mode:data.Mode,MapName:data.MapName}).Div;
        this.self.appendChild(RoomStatusDiv);
	};
    this.getMessage = function(msg){
        var newMsg = document.createElement("li");
        newMsg.style.fontSize = "14pt";
        newMsg.style.color = "#FFFF00";
        newMsg.appendChild(document.createTextNode(msg));
        messageField.appendChild(newMsg);
        messageField.scrollTop = messageField.scrollHeight;
    };
    //函式宣告完畢
    
    //初始化函式執行
    //執行初始化函式完畢
}
function PreSelectView(windowSize,Option){
    /*global OriginView */
    OriginView.call(this,windowSize,Option.getWindowSize());//繼承 
    this.self.style.backgroundImage = "url('./src/pic/PreSelect/BackGround.png')";
    //宣告變數
    var itemArray = [],ChangeArray=[];
    var PlayLocal = null;
    var Ready = false;
    var TargetActor;
    
    var command_Ready = document.createElement("div");
    command_Ready.style.width = "720px";
    command_Ready.style.height = "25px";
    command_Ready.style.left = "280px";
    command_Ready.style.top = "450px";
    command_Ready.style.position = "absolute";
    command_Ready.style.cursor = "pointer";
    command_Ready.style.backgroundImage = "url('./src/pic/PreSelect/BTN_Ready.png')"
    command_Ready.addEventListener("click",function() {
        if(Ready){
        	Ready = false;
        	command_Ready.style.backgroundImage = "url('./src/pic/PreSelect/BTN_Ready.png')";
        	VARIABLE.Socket.emit("SetReady",{Status:0,ActorID:VARIABLE.USER.ActorID,RoomID:VARIABLE.USER.RoomID});
        }else{
        	Ready = true;
        	command_Ready.style.backgroundImage = "url('./src/pic/PreSelect/BTN_Canncel.png')";
        	VARIABLE.Socket.emit("SetReady",{Status:1,ActorID:VARIABLE.USER.ActorID,RoomID:VARIABLE.USER.RoomID});
        }
    });
    
    var TypeSelect = document.createElement("div");
    TypeSelect.style.width = "32px";
    TypeSelect.style.height = "32px";
    TypeSelect.style.left = "545px";
    TypeSelect.style.top = "399px";
    TypeSelect.style.position = "absolute";
    TypeSelect.style.cursor = "pointer";
    TypeSelect.addEventListener("click",function() {
        TypeDiv.style.display = "";
    });
    var WeaponSelect = document.createElement("div");
    WeaponSelect.style.width = "32px";
    WeaponSelect.style.height = "32px";
    WeaponSelect.style.left = "790px";
    WeaponSelect.style.top = "399px";
    WeaponSelect.style.position = "absolute";
    WeaponSelect.style.cursor = "pointer";
    WeaponSelect.addEventListener("click",function() {
        WeaponDiv.style.display = "";
    });
    var SupportSelect = document.createElement("div");
    SupportSelect.style.width = "32px";
    SupportSelect.style.height = "32px";
    SupportSelect.style.left = "826px";
    SupportSelect.style.top = "399px";
    SupportSelect.style.position = "absolute";
    SupportSelect.style.cursor = "pointer";
    SupportSelect.addEventListener("click",function() {
        SupportDiv.style.display = "";
    });
    var StrategySelect = document.createElement("div");
    StrategySelect.style.width = "32px";
    StrategySelect.style.height = "32px";
    StrategySelect.style.left = "861px";
    StrategySelect.style.top = "399px";
    StrategySelect.style.position = "absolute";
    StrategySelect.style.cursor = "pointer";
    StrategySelect.addEventListener("click",function() {
        StrategyDiv.style.display = "";
    });
    
    var TypeDiv = document.createElement("div");
    TypeDiv.style.width = "300px";
    TypeDiv.style.height = "100px";
    TypeDiv.style.left = "490px";
    TypeDiv.style.top = "310px";
    TypeDiv.style.position = "absolute";
    TypeDiv.style.backgroundImage = "url('./src/pic/PreSelect/type.png')";
    TypeDiv.style.display = "none";
    var TypeArray = Option.getActorTypeArray();
    for(var i=0;i<TypeArray.length;i++){
    	var temp = document.createElement("div");
    	temp.style.width = "32px";
	    temp.style.height = "32px";
	    temp.style.left = (10+i*41) + "px";
	    temp.style.top = "50px";
	    temp.style.position = "absolute";
	    temp.style.backgroundImage = "url('./src/pic/Actor/blue/"+i+"/down.png')";
	    temp.style.cursor = "pointer";
	    addTypeEvent(i,temp);
	    TypeDiv.appendChild(temp);
    }
    
    var WeaponDiv = document.createElement("div");
    WeaponDiv.style.width = "300px";
    WeaponDiv.style.height = "160px";
    WeaponDiv.style.left = "490px";
    WeaponDiv.style.top = "280px";
    WeaponDiv.style.position = "absolute";
    WeaponDiv.style.backgroundImage = "url('./src/pic/PreSelect/weapon.png')";
    WeaponDiv.style.display = "none";
    
    var SupportDiv = document.createElement("div");
    SupportDiv.style.width = "300px";
    SupportDiv.style.height = "160px";
    SupportDiv.style.left = "490px";
    SupportDiv.style.top = "280px";
    SupportDiv.style.position = "absolute";
    SupportDiv.style.backgroundImage = "url('./src/pic/PreSelect/support.png')";
    SupportDiv.style.display = "none";
    
    var StrategyDiv = document.createElement("div");
    StrategyDiv.style.width = "300px";
    StrategyDiv.style.height = "160px";
    StrategyDiv.style.left = "490px";
    StrategyDiv.style.top = "280px";
    StrategyDiv.style.position = "absolute";
    StrategyDiv.style.backgroundImage = "url('./src/pic/PreSelect/strategy.png')";
    StrategyDiv.style.display = "none";
    
    var ItemArray = Option.getItemArray();
    for(var j=0;j<ItemArray.length;j++){
    	for(var i=0;i<ItemArray[j].length;i++){
	    	var temp = document.createElement("div");
	    	temp.style.width = "32px";
		    temp.style.height = "32px";
		    temp.style.left = (10+i*41) + "px";
		    temp.style.top = "50px";
		    temp.style.position = "absolute";
		    temp.style.backgroundImage = "url('./src/pic/Item/"+j+"/"+i+".png')";
		    temp.style.cursor = "pointer";
		    switch (j) {
		    	case 0:
		    		addItemEvent(i,j,temp,WeaponDiv);
		    		WeaponDiv.appendChild(temp);
		    		break;
		    	case 1:
		    		addItemEvent(i,j,temp,SupportDiv);
		    		SupportDiv.appendChild(temp);
		    		break;
		    	case 2:
		    		addItemEvent(i,j,temp,StrategyDiv);
		    		StrategyDiv.appendChild(temp);
		    		break;
		    }
	    }
    }
    
    var messageField = document.createElement("div");
    messageField.style.height = "180px";
    messageField.style.width = "720px";
    messageField.style.left = "280px";
    messageField.style.top = "495px";
    messageField.style.overflowY = "auto";
    messageField.style.position = "absolute";
    messageField.style.listStyleType = "none";
    
    var messageInput = document.createElement("input");
    messageInput.style.backgroundColor = "transparent";
	messageInput.style.fontSize = "x-large";
	messageInput.style.color = "#000000";
	messageInput.style.border = "0px";
	messageInput.style.position = "absolute";
	messageInput.style.top = "684px";
	messageInput.style.left = "280px";
	messageInput.style.width = "640px";
	messageInput.style.height="26px";
	messageInput.addEventListener("keydown",function(e) {
	    if(e.keyCode==13) {
	        VARIABLE.Socket.emit("RoomNewMsg",{Message:messageInput.value,ActorName:VARIABLE.USER.ActorName,RoomID:VARIABLE.USER.RoomID});
	        messageInput.value = "";
	    }
	});
	
	var messageSend = document.createElement("div");
	messageSend.style.position = "absolute";
	messageSend.style.top = "684px";
	messageSend.style.left = "930px";
	messageSend.style.width = "72px";
	messageSend.style.height="26px";
	messageSend.style.cursor="pointer";
	messageSend.addEventListener("click",function(){
	   VARIABLE.Socket.emit("RoomNewMsg",{Message:messageInput.value,ActorName:VARIABLE.USER.ActorName,RoomID:VARIABLE.USER.RoomID});
	   messageInput.value = "";
	});
	
	var timer = document.createElement("div");
	timer.style.position = "absolute";
	timer.style.top = "19px";
	timer.style.left = "315px";
	timer.style.width = "50px";
	timer.style.height = "30px";
	timer.style.color = "#FFFFFF";
	timer.style.fontSize = "30pt";
	timer.appendChild(document.createTextNode("100"));
	this.self.appendChild(timer);
	
	var ChangePostionDiv = document.createElement("div");
    ChangePostionDiv.style.width = "300px";
    ChangePostionDiv.style.height = "160px";
    ChangePostionDiv.style.left = "490px";
    ChangePostionDiv.style.top = "200px";
    ChangePostionDiv.style.position = "absolute";
    ChangePostionDiv.style.display = "none";
    ChangePostionDiv.style.backgroundImage = "url('./src/pic/PreSelect/messageBox.png')";
    
    var ChangePostionMessage = document.createElement("div");
    ChangePostionMessage.style.width = "250px";
    ChangePostionMessage.style.height = "40px";
    ChangePostionMessage.style.left = "25px";
    ChangePostionMessage.style.top = "60px";
    ChangePostionMessage.style.position = "absolute";
    ChangePostionMessage.style.color = "#FFFFFF";
    ChangePostionMessage.style.fontSize = "15pt";
    ChangePostionMessage.style.textAlign = "center";
    ChangePostionMessage.appendChild(document.createTextNode(""));
    ChangePostionDiv.appendChild(ChangePostionMessage);
    
    var ChangePostionAgree = document.createElement("div");
    ChangePostionAgree.style.width = "115px";
    ChangePostionAgree.style.height = "40px";
    ChangePostionAgree.style.left = "20px";
    ChangePostionAgree.style.top = "110px";
    ChangePostionAgree.style.position = "absolute";
    ChangePostionAgree.style.display = "none";
    ChangePostionAgree.style.backgroundImage = "url('./src/pic/PreSelect/BTN_Agree.png')";
    ChangePostionAgree.style.cursor = "pointer";
    ChangePostionAgree.addEventListener("click",function() {
        ChangePostionDiv.style.display = "none";
        ChangePostionCancel.style.display = "none";
        ChangePostionAgree.style.display = "none";
        ChangePostionRefuse.style.display = "none";
        ChangePostionConfirm.style.display = "none";
        VARIABLE.Socket.emit("changeRequestResult",{actorID:TargetActor,targetActorID:VARIABLE.USER.ActorID,Result:true});
    });
    
    var ChangePostionRefuse = document.createElement("div");
    ChangePostionRefuse.style.width = "115px";
    ChangePostionRefuse.style.height = "40px";
    ChangePostionRefuse.style.left = "165px";
    ChangePostionRefuse.style.top = "110px";
    ChangePostionRefuse.style.position = "absolute";
    ChangePostionRefuse.style.display = "none";
    ChangePostionRefuse.style.backgroundImage = "url('./src/pic/PreSelect/BTN_Refuse.png')";
    ChangePostionRefuse.style.cursor = "pointer";
    ChangePostionRefuse.addEventListener("click",function() {
        ChangePostionDiv.style.display = "none";
        ChangePostionCancel.style.display = "none";
        ChangePostionAgree.style.display = "none";
        ChangePostionRefuse.style.display = "none";
        ChangePostionConfirm.style.display = "none";
        VARIABLE.Socket.emit("changeRequestResult",{actorID:TargetActor,targetActorID:VARIABLE.USER.ActorID,Result:false});
    });
    
    var ChangePostionCancel = document.createElement("div");
    ChangePostionCancel.style.width = "115px";
    ChangePostionCancel.style.height = "40px";
    ChangePostionCancel.style.left = "92.5px";
    ChangePostionCancel.style.top = "110px";
    ChangePostionCancel.style.position = "absolute";
    ChangePostionCancel.style.display = "none";
    ChangePostionCancel.style.backgroundImage = "url('./src/pic/PreSelect/BTN_Cancel.png')";
    ChangePostionCancel.style.cursor = "pointer";
    ChangePostionCancel.addEventListener("click",function() {
        ChangePostionDiv.style.display = "none";
        ChangePostionCancel.style.display = "none";
        ChangePostionAgree.style.display = "none";
        ChangePostionRefuse.style.display = "none";
        ChangePostionConfirm.style.display = "none";
        VARIABLE.Socket.emit("changePostionCancel",{actorID:VARIABLE.USER.ActorID,targetActorID:TargetActor});
    });
    
    var ChangePostionConfirm = document.createElement("div");
    ChangePostionConfirm.style.width = "115px";
    ChangePostionConfirm.style.height = "40px";
    ChangePostionConfirm.style.left = "92.5px";
    ChangePostionConfirm.style.top = "110px";
    ChangePostionConfirm.style.position = "absolute";
    ChangePostionConfirm.style.display = "none";
    ChangePostionConfirm.style.backgroundImage = "url('./src/pic/PreSelect/BTN_Confirm.png')";
    ChangePostionConfirm.style.cursor = "pointer";
    ChangePostionConfirm.addEventListener("click",function() {
        ChangePostionDiv.style.display = "none";
        ChangePostionCancel.style.display = "none";
        ChangePostionAgree.style.display = "none";
        ChangePostionRefuse.style.display = "none";
        ChangePostionConfirm.style.display = "none";
    });
    
    ChangePostionDiv.appendChild(ChangePostionAgree);
    ChangePostionDiv.appendChild(ChangePostionRefuse);
    ChangePostionDiv.appendChild(ChangePostionCancel);
    ChangePostionDiv.appendChild(ChangePostionConfirm);
    
    this.self.appendChild(ChangePostionDiv);
    this.self.appendChild(command_Ready);
    this.self.appendChild(messageField);
    this.self.appendChild(messageSend);
    this.self.appendChild(messageInput);
    this.self.appendChild(TypeSelect);
    this.self.appendChild(WeaponSelect);
    this.self.appendChild(SupportSelect);
    this.self.appendChild(StrategySelect);
    this.self.appendChild(TypeDiv);
    this.self.appendChild(WeaponDiv);
    this.self.appendChild(SupportDiv);
    this.self.appendChild(StrategyDiv);
    
	//變數宣告完畢
	function ActorDiv(data,i,PlaySide){
		this.side = PlaySide;
		var dark = document.createElement("div");
		dark.style.width = "140px";
	    dark.style.height = "110px";
	    dark.style.backgroundImage = "url('./src/pic/PreSelect/playbox_dark.png')";
	    dark.style.backgroundPosition = "center center";
	    dark.style.position = "absolute";
	    dark.style.top = "0px";
	    dark.style.left = "0px";
	    
	    this.Div = document.createElement("div");
	    this.Div.style.width = "140px";
	    this.Div.style.height = "110px";
	    this.Div.style.top = ((i*120)+78)+"px";
	    if(data.side==0)this.Div.style.left = "50px";
	    else this.Div.style.left = "1080px";
	    this.Div.style.backgroundImage = "url('./src/pic/PreSelect/playbox.png')";
	    this.Div.style.backgroundPosition = "center center";
	    this.Div.style.position = "absolute";
	    
	    if(data.Ready==1){
	    	this.Div.appendChild(dark);
	    }
	    var TypeDiv = document.createElement("div");
	    TypeDiv.style.width = "75px";
	    TypeDiv.style.height = "75px";
	    TypeDiv.style.top = "5px";
	    TypeDiv.style.left = "15px";
	    TypeDiv.style.backgroundPosition = "center center";
	    TypeDiv.style.position = "absolute";
	    
	    var ItemDiv_1 = document.createElement("div");
	    ItemDiv_1.style.width = "32px";
	    ItemDiv_1.style.height = "32px";
	    ItemDiv_1.style.top = "5px";
	    ItemDiv_1.style.left = "100px";
	    ItemDiv_1.style.backgroundPosition = "center center";
	    ItemDiv_1.style.position = "absolute";
	    ItemDiv_1.style.backgroundImage = "url('./src/pic/Item/0/"+data.item1+".png')";
	    
	    var ItemDiv_2 = document.createElement("div");
	    ItemDiv_2.style.width = "32px";
	    ItemDiv_2.style.height = "32px";
	    ItemDiv_2.style.top = "39px";
	    ItemDiv_2.style.left = "100px";
	    ItemDiv_2.style.backgroundPosition = "center center";
	    ItemDiv_2.style.position = "absolute";
	    ItemDiv_2.style.backgroundImage = "url('./src/pic/Item/1/"+data.item2+".png')";
	    
	    var ItemDiv_3 = document.createElement("div");
	    ItemDiv_3.style.width = "32px";
	    ItemDiv_3.style.height = "32px";
	    ItemDiv_3.style.top = "73px";
	    ItemDiv_3.style.left = "100px";
	    ItemDiv_3.style.backgroundPosition = "center center";
	    ItemDiv_3.style.position = "absolute";
	    ItemDiv_3.style.backgroundImage = "url('./src/pic/Item/2/"+data.item3+".png')";
	    
	    var Name = document.createElement("div");
	    Name.style.width = "100px";
	    Name.style.height = "30px";
	    Name.style.top = "82px";
	    Name.style.left = "4px";
	    Name.style.fontSize = "x-large";
	    Name.style.color = "#FFFFFF";
	    Name.style.position = "absolute";
	    Name.style.textAlign = "center";
	    Name.appendChild(document.createTextNode(data.actorName));
	    
	    this.Div.appendChild(Name);
	    this.appendDetail = function(){
	    	this.Div.appendChild(TypeDiv);
		    this.Div.appendChild(ItemDiv_1);
		    this.Div.appendChild(ItemDiv_2);
		    this.Div.appendChild(ItemDiv_3);
	    };
	}
	function AIDiv(side,i){
	    this.Div = document.createElement("div");
	    this.Div.style.width = "140px";
	    this.Div.style.height = "110px";
	    this.Div.style.top = ((i*120)+78)+"px";
	    if(side==0)this.Div.style.left = "50px";
	    else this.Div.style.left = "1080px";
	    this.Div.style.backgroundImage = "url('./src/pic/PreSelect/playbox.png')"
	    this.Div.style.backgroundPosition = "center center";
	    this.Div.style.position = "absolute";
	    
	    var TypeDiv = document.createElement("div");
	    TypeDiv.style.width = "75px";
	    TypeDiv.style.height = "75px";
	    TypeDiv.style.top = "5px";
	    TypeDiv.style.left = "15px";
	    TypeDiv.style.backgroundPosition = "center center";
	    TypeDiv.style.position = "absolute";
	    
	    var ItemDiv_1 = document.createElement("div");
	    ItemDiv_1.style.width = "32px";
	    ItemDiv_1.style.height = "32px";
	    ItemDiv_1.style.top = "5px";
	    ItemDiv_1.style.left = "100px";
	    ItemDiv_1.style.backgroundPosition = "center center";
	    ItemDiv_1.style.position = "absolute";
	    
	    var ItemDiv_2 = document.createElement("div");
	    ItemDiv_2.style.width = "32px";
	    ItemDiv_2.style.height = "32px";
	    ItemDiv_2.style.top = "39px";
	    ItemDiv_2.style.left = "100px";
	    ItemDiv_2.style.backgroundPosition = "center center";
	    ItemDiv_2.style.position = "absolute";
	    
	    var ItemDiv_3 = document.createElement("div");
	    ItemDiv_3.style.width = "32px";
	    ItemDiv_3.style.height = "32px";
	    ItemDiv_3.style.top = "73px";
	    ItemDiv_3.style.left = "100px";
	    ItemDiv_3.style.backgroundPosition = "center center";
	    ItemDiv_3.style.position = "absolute";
	    
	    var dark = document.createElement("div");
		dark.style.width = "140px";
	    dark.style.height = "110px";
	    dark.style.backgroundImage = "url('./src/pic/PreSelect/playbox_dark.png')";
	    dark.style.backgroundPosition = "center center";
	    dark.style.position = "absolute";
	    dark.style.top = "0px";
	    dark.style.left = "0px";
	    
	    var Name = document.createElement("div");
	    Name.style.width = "100px";
	    Name.style.height = "30px";
	    Name.style.top = "82px";
	    Name.style.left = "4px";
	    Name.style.fontSize = "x-large";
	    Name.style.color = "#FFFFFF";
	    Name.style.position = "absolute";
	    Name.style.textAlign = "center";
	    Name.appendChild(document.createTextNode("AI NO."+i));
	    
	    this.Div.appendChild(dark);
	    this.Div.appendChild(Name);
	    this.Div.appendChild(TypeDiv);
	    this.Div.appendChild(ItemDiv_1);
	    this.Div.appendChild(ItemDiv_2);
	    this.Div.appendChild(ItemDiv_3);
	}
	function addTypeEvent(i,Div){
		Div.addEventListener("click",function() {
	        TypeDiv.style.display = "none";
	        VARIABLE.Socket.emit("SetActorType",{Type:i,ActorID:VARIABLE.USER.ActorID,RoomID:VARIABLE.USER.RoomID});
	    });
	}
    function addItemEvent(i,j,Div,FatherDiv){
		Div.addEventListener("click",function() {
	        FatherDiv.style.display = "none";
	        VARIABLE.Socket.emit("SetItem",{Type:j,ItemID:i,ActorID:VARIABLE.USER.ActorID,RoomID:VARIABLE.USER.RoomID});
	    });
	}
	function addChangePostion(div,actorID,Postion){
	    div.addEventListener("click",function(){
	        ChangePostionMessage.childNodes[0].nodeValue = "等待玩家ID "+actorID+" 同意!";
    	    ChangePostionDiv.style.display = "";
            ChangePostionAgree.style.display = "none";
            ChangePostionRefuse.style.display = "none";
            ChangePostionConfirm.style.display = "none";
    	    ChangePostionCancel.style.display = "";
    	    TargetActor = actorID;
    	    VARIABLE.Socket.emit("changePostion",{actorID:VARIABLE.USER.ActorID,targetActorID:actorID});
	    });
	}
	//宣告函式
	this.update = function(data){
	    /*global VARIABLE*/
        if(data.RoomData.NO!=VARIABLE.USER.RoomID || VARIABLE.SCENES!="PreSelect") return;
        
        for(var i=0;i<itemArray.length;i++){
        	this.self.removeChild(itemArray[i].Div);
        }
        for(var i=0;i<ChangeArray.length;i++){
        	this.self.removeChild(ChangeArray[i]);
        }
        itemArray = [];
        ChangeArray = [];
        var SideA = 0,SideB = 0;
        for(var i=0;i<data.SideA.length;i++){
        	if(data.SideA[i].actorID==VARIABLE.USER.ActorID){
        		TypeSelect.style.backgroundImage = "url('./src/pic/Actor/blue/"+data.SideA[i].type+"/down.png')";
        		WeaponSelect.style.backgroundImage = "url('./src/pic/Item/0/"+data.SideA[i].item1+".png')";
        		SupportSelect.style.backgroundImage = "url('./src/pic/Item/1/"+data.SideA[i].item2+".png')";
        		StrategySelect.style.backgroundImage = "url('./src/pic/Item/2/"+data.SideA[i].item3+".png')";
        		VARIABLE.USER.Side = 0;
        	}else{
        	    if(VARIABLE.USER.Side==0){
        	        var temp = document.createElement("div");
        	        temp.style.width = "32px";
        	        temp.style.height = "32px";
        	        temp.style.left = "195px";
        	        temp.style.top = (115+i*120) + "px";
        	        temp.style.position = "absolute";
        	        temp.style.backgroundImage = "url('./src/pic/PreSelect/change.png')";
        	        addChangePostion(temp,data.SideA[i].actorID,data.SideA[i].Postion);
        	        ChangeArray.push(temp);
	                this.self.appendChild(temp);
        	    }
        	}
	        var temp = new ActorDiv(data.SideA[i],i,0);
	        itemArray.push(temp);
	        this.self.appendChild(temp.Div);
	        SideA++;
	    }
	    for(var i=0;i<data.SideB.length;i++){
	    	if(data.SideB[i].actorID==VARIABLE.USER.ActorID){
        		VARIABLE.USER.Side = 1;
        		TypeSelect.style.backgroundImage = "url('./src/pic/Actor/blue/"+data.SideB[i].type+"/down.png')";
        		WeaponSelect.style.backgroundImage = "url('./src/pic/Item/0/"+data.SideB[i].item1+".png')";
        		SupportSelect.style.backgroundImage = "url('./src/pic/Item/1/"+data.SideB[i].item2+".png')";
        		StrategySelect.style.backgroundImage = "url('./src/pic/Item/2/"+data.SideB[i].item3+".png')";
        	}else{
        	    if(VARIABLE.USER.Side==1){
        	        var temp = document.createElement("div");
            	    temp.style.width = "32px";
            	    temp.style.height = "32px";
            	    temp.style.left = "1225px";
            	    temp.style.top = (115+i*120) + "px";
            	    temp.style.position = "absolute";
            	    temp.style.backgroundImage = "url('./src/pic/PreSelect/change.png')";
            	    addChangePostion(temp,data.SideB[i].actorID,data.SideB[i].Postion);
            	    ChangeArray.push(temp);
    	            this.self.appendChild(temp);
        	    }
        	}
	        var temp = new ActorDiv(data.SideB[i],i,1);
	        itemArray.push(temp);
	        this.self.appendChild(temp.Div);
	        SideB++;
	    }
	    for(var i=0;i<data.RoomData.SideA_AI;i++){
	        var temp = new AIDiv(0,i+SideA);
	        itemArray.push(temp);
	        this.self.appendChild(temp.Div);
	    }
	    for(var i=0;i<data.RoomData.SideB_AI;i++){
	        var temp = new AIDiv(1,i+SideB);
	        itemArray.push(temp);
	        this.self.appendChild(temp.Div);
	    }
	    for(var i=0;i<itemArray.length;i++){
	    	if(VARIABLE.USER.Side == itemArray[i].side){
	    		itemArray[i].appendDetail();
	    	}
	    }
	    timer.childNodes[0].nodeValue = data.RoomData.reciprocal;
	};
	this.getMessage = function(msg){
        var newMsg = document.createElement("li");
        newMsg.style.fontSize = "14pt";
        newMsg.style.color = "#FFFF00";
        newMsg.appendChild(document.createTextNode(msg));
        messageField.appendChild(newMsg);
        messageField.scrollTop = messageField.scrollHeight;
    };
    this.changePostionRequest = function(data){
        ChangePostionMessage.childNodes[0].nodeValue = "玩家ID "+data.actorID+"申請與你交換位置!";
	    ChangePostionDiv.style.display="";
	    ChangePostionCancel.style.display = "none";
        ChangePostionConfirm.style.display = "none";
	    ChangePostionAgree.style.display = "";
	    ChangePostionRefuse.style.display = "";
	    TargetActor = data.actorID;
    };
    this.changeRequestCancel = function(data){
        ChangePostionMessage.childNodes[0].nodeValue = "玩家ID "+data.actorID+"取消申請!";
        ChangePostionCancel.style.display = "none";
        ChangePostionAgree.style.display = "none";
        ChangePostionRefuse.style.display = "none";
	    ChangePostionDiv.style.display="";
	    ChangePostionConfirm.style.display="";
    };
    this.changeRequestResult = function(data){
        if(data.Result) ChangePostionMessage.childNodes[0].nodeValue = "玩家ID "+data.targetActorID+"接受交換位置!";
        else ChangePostionMessage.childNodes[0].nodeValue = "玩家ID "+data.targetActorID+"拒絕交換位置!";
	    ChangePostionDiv.style.display="";
	    ChangePostionCancel.style.display = "none";
        ChangePostionAgree.style.display = "none";
        ChangePostionRefuse.style.display = "none";
	    ChangePostionConfirm.style.display="";
    };
}
function RegisterView(windowSize){
    
    //宣告變數
    //載體
    this.self = document.createElement("div");
    this.self.style.height = "600px";
    this.self.style.width = "800px";
    this.self.style.backgroundImage = "url('src/pic/registerpageimg/registerimg.png')";
    this.self.style.position = "absolute";
    
    var name = document.createElement("input");
	name.setAttribute("type", "text");
	name.style.backgroundColor = "transparent";
	name.style.color = "#FFFFFF";
	name.style.fontSize = "x-large";
	name.style.position = "absolute";
	name.style.top = "175";
	name.style.border = "0px";
	name.style.width = "330";
	name.style.height ="50";
	name.style.left = "330";
	
	var pwtxt = document.createElement("P");
	pwtxt.style.position = "absolute";
	pwtxt.style.top = "26%";
	pwtxt.style.width = "20%";
	pwtxt.style.left = "1%";
	pwtxt.appendChild(document.createTextNode("密碼:"));
	
	var pw = document.createElement("input");
	pw.setAttribute("type", "password");
	pw.style.position = "absolute";
	pw.style.color = "#FFFFFF";
	pw.style.backgroundColor = "transparent";
	pw.style.border = "0px";
	pw.style.fontSize = "x-large";
	pw.style.top = "245";
	pw.style.width = "330";
	pw.style.height =50;
	pw.style.left = 330;
	
	var pwtxt2 = document.createElement("P");
	pwtxt2.style.position = "absolute";
	pwtxt2.style.top = "39%";
	pwtxt2.style.width = "20%";
	
	pwtxt2.style.left = "1%";
	pwtxt2.appendChild(document.createTextNode("再次輸入密碼:"));
	
	var pw2 = document.createElement("input");
	pw2.setAttribute("type", "password");
	pw2.style.position = "absolute";
	pw2.style.color = "#FFFFFF";
	pw2.style.backgroundColor = "transparent";
	pw2.style.fontSize = "x-large";
	pw2.style.border = "0px";
	pw2.style.top = "315";
	pw2.style.width = "330";
	pw2.style.height=50;
	pw2.style.left = "330";
	
	var mailtxt = document.createElement("P");
	mailtxt.style.position = "absolute";
	mailtxt.style.top = "52%";
	mailtxt.style.width = "20%";
	mailtxt.style.left = "1%";
	mailtxt.appendChild(document.createTextNode("E-mail:"));
	
	var mail = document.createElement("input");
	mail.setAttribute("type", "email");
	mail.style.position = "absolute";
	mail.style.backgroundColor = "transparent";
	mail.style.border = "0px";
	mail.style.color = "#FFFFFF";
	mail.style.fontSize = "x-large";
	mail.style.top = "385";
	mail.style.width = "330";
	mail.style.height=50;
	mail.style.left = "330";
	
	var login = document.createElement("P");
	login.style.position = "absolute";
	login.style.top = "475";
	login.style.width = "250";
	login.style.left = "125";
	login.style.cursor = "pointer";
	login.appendChild(document.createTextNode("　"));
	//login.appendChild(document.createTextNode("前往登入!"));
	login.addEventListener("click",function(){
		/*global loginViewiInit 實作於 index*/
		loginViewiInit();
	});
	
	var commit = document.createElement("P");
	commit.style.position = "absolute";
	commit.style.top = "470";
	commit.style.width = "250";
	commit.style.left = "420";
	commit.style.cursor = "pointer";
	commit.appendChild(document.createTextNode("　"));
	//commit.appendChild(document.createTextNode("資料送出!"));
	commit.addEventListener("click",function(){		
		var data = new Object();
	   	data.Name = name.value;
	   	data.PW = pw.value;
	   	data.PW2 = pw2.value;
	   	data.Mail = mail.value;
	   	VARIABLE.Socket.emit("register",data);/*global VARIABLE in index*/
	});
	
	this.self.appendChild(pw);
	this.self.appendChild(pw2);
	this.self.appendChild(mail);
	this.self.appendChild(login);
	this.self.appendChild(name);
	this.self.appendChild(commit);
	//變數宣告完畢

	//宣告函式
    this.windowReSize = function(windowSize){//當視窗調整 調整版面
        this.self.style.left = (windowSize.W/ 2 - 400) + "px";
        this.self.style.top = (windowSize.H /2- 300) + "px";
    };
    //函式宣告完畢
    
    //初始化函式執行
    this.windowReSize(windowSize);
    //執行初始化函式完畢
}
function GameAreaView(windowSize,itemlist,Option){
    OriginView.call(this,windowSize,{W:1280, H:960});//繼承 
    this.self.style.backgroundImage = "url('src/pic/GameArea/BackGround.png')";
    
    var ItemList = itemlist;
    var isMove = false;
    var isAttack = false;
    var isItemSelect = false;
    
    var iframe = document.createElement('iframe');
    iframe.style.width="960px";
    iframe.style.height="720px";
    iframe.style.left="160px";
    iframe.style.top="40px";
    iframe.style.position='absolute';
    this.self.appendChild(iframe);
    
    var MoveButton = document.createElement("div");
    MoveButton.style.backgroundImage = "url('/src/pic/GameArea/BTN_Move.png')";
    MoveButton.style.position = "absolute";
    MoveButton.style.width = "125px";
    MoveButton.style.height = "55px";
    MoveButton.style.left = "15px";
    MoveButton.style.top = "20px";
    MoveButton.style.cursor = "pointer";
    MoveButton.addEventListener("click",function(){
        if(isMove) ButtonReset();
        else{
            ButtonReset();
            isMove = true;
            MoveButton.style.backgroundImage = "url('/src/pic/GameArea/BTN_Return.png')";
            iframe.contentWindow.Skill("移動");
        }
    });
    this.self.appendChild(MoveButton);
    
    var AttackButton = document.createElement("div");
    AttackButton.style.position = "absolute";
    AttackButton.style.backgroundImage = "url('/src/pic/GameArea/BTN_Attack.png')";
    AttackButton.style.width = "125px";
    AttackButton.style.height = "55px";
    AttackButton.style.left = "15px";
    AttackButton.style.top = "90px";
    AttackButton.style.cursor = "pointer";
    AttackButton.addEventListener("click",function(){
        if(isAttack) ButtonReset();   
        else{
            ButtonReset();
            isAttack = true;
            AttackButton.style.backgroundImage = "url('/src/pic/GameArea/BTN_Return.png')";
            iframe.contentWindow.Nuclear();
        }
    });
    this.self.appendChild(AttackButton);
    
    var ItemButton = document.createElement("div");
    ItemButton.style.position = "absolute";
    ItemButton.style.backgroundImage = "url('/src/pic/GameArea/BTN_Item.png')";
    ItemButton.style.width = "125px";
    ItemButton.style.height = "55px";
    ItemButton.style.left = "15px";
    ItemButton.style.top = "160px";
    ItemButton.style.cursor = "pointer";
    ItemButton.addEventListener("click",function(){
       if(ItemBoard.style.display=="none"){
           ItemBoard.style.display = "";
           SkillBoard.style.display = "none";
           SkillButton.style.top = "280px";
           SkillBoard.style.top = "350px";
           stay.style.top = "350px";
       }else{
           ItemBoard.style.display = "none";
           SkillButton.style.top = "230px";
           SkillBoard.style.top = "300px";
           stay.style.top = "300px";
       }
    });
    
    //道具展開版面
    var ItemBoard = document.createElement("div")
    ItemBoard.style.left = "15px";
    ItemBoard.style.top = "230px";
    ItemBoard.style.height = "32px";
    ItemBoard.style.width = "125px";
    ItemBoard.style.position = 'absolute';
    ItemBoard.style.overflow = 'auto';
    ItemBoard.style.display = "none";
    
    var Item_1 = document.createElement("div");
    Item_1.style.height = "32px";
    Item_1.style.width = "32px";
    Item_1.style.left = "7px";
    Item_1.style.backgroundImage = "url('/src/pic/Item/0/"+ItemList.item1+".png')";
    Item_1.style.position = "absolute";
    Item_1.addEventListener("click",function() {
        if(isItemSelect){
            ButtonReset();
        }else{
            isItemSelect = true;
            iframe.contentWindow.Skill(Option.getItemArray()[0][ItemList.item1]);
        }
    });
    ItemBoard.appendChild(Item_1);
    var Item_2 = document.createElement("div");
    Item_2.style.height = "32px";
    Item_2.style.width = "32px";
    Item_2.style.left = "47px";
    Item_2.style.backgroundImage = "url('/src/pic/Item/1/"+ItemList.item2+".png')";
    Item_2.style.position = "absolute";
    Item_2.addEventListener("click",function() {
        if(isItemSelect){
            ButtonReset();
        }else{
            isItemSelect = true;
            iframe.contentWindow.Skill(Option.getItemArray()[1][ItemList.item2]);
        }
    });
    ItemBoard.appendChild(Item_2);
    var Item_3 = document.createElement("div");
    Item_3.style.height = "32px";
    Item_3.style.width = "32px";
    Item_3.style.left = "87px";
    Item_3.style.backgroundImage = "url('/src/pic/Item/2/"+ItemList.item3+".png')";
    Item_3.style.position = "absolute";
    Item_3.addEventListener("click",function() {
        if(isItemSelect){
            ButtonReset();
        }else{
            isItemSelect = true;
            iframe.contentWindow.Skill(Option.getItemArray()[2][ItemList.item3]);
        }
    });
    ItemBoard.appendChild(Item_3);
    this.self.appendChild(ItemBoard);
    this.self.appendChild(ItemButton);
    
    var SkillButton = document.createElement("div");
    SkillButton.style.position = "absolute";
    SkillButton.style.backgroundImage = "url('/src/pic/GameArea/BTN_Skill.png')";
    SkillButton.style.width = "125px";
    SkillButton.style.height = "55px";
    SkillButton.style.left = "15px";
    SkillButton.style.top = "230px";
    SkillButton.style.cursor = "pointer";
    
    //道具展開版面
    var SkillBoard = document.createElement("div")
    SkillBoard.style.left = "15px";
    SkillBoard.style.top = "300px";
    SkillBoard.style.height = "400px";
    SkillBoard.style.width = "125px";
    SkillBoard.style.position = 'absolute';
    SkillBoard.style.overflow = 'auto';
    SkillBoard.style.display = "none";
    this.self.appendChild(SkillButton);
    this.self.appendChild(SkillBoard);
    
    //結束回合按鈕
    var stay = document.createElement("div");
    stay.style.backgroundImage = "url('/src/pic/GameArea/BTN_End.png')";
    stay.style.position = "absolute";
    stay.style.width = "150px";
    stay.style.height = "55px";
    stay.style.left = "10px";
    stay.style.top = "300px";
    stay.style.cursor = "pointer";
    stay.addEventListener("click",function() {
        iframe.contentWindow.ActionCancel();
        iframe.contentWindow.Stay();
    });
    this.self.appendChild(stay);
    
    var messageField = document.createElement("div");
    messageField.style.height = "150px";
    messageField.style.width = "900px";
    messageField.style.left = "195px";
    messageField.style.top = "770px";
    messageField.style.overflowY = "auto";
    messageField.style.position = "absolute";
    messageField.style.listStyleType = "none";
    
    var messageInput = document.createElement("input");
    messageInput.style.backgroundColor = "transparent";
	messageInput.style.fontSize = "x-large";
	messageInput.style.color = "#000000";
	messageInput.style.border = "0px";
	messageInput.style.position = "absolute";
	messageInput.style.top = "925px";
	messageInput.style.left = "190px";
	messageInput.style.width = "825px";
	messageInput.style.height="27px";
	messageInput.addEventListener("keydown",function(e) {
	    if(e.keyCode==13) {
	        VARIABLE.Socket.emit("RoomNewMsg",{Message:messageInput.value,ActorName:VARIABLE.USER.ActorName,RoomID:VARIABLE.USER.RoomID});
	        messageInput.value = "";
	    }
	});
	
	var messageSend = document.createElement("div");
	messageSend.style.position = "absolute";
	messageSend.style.top = "925px";
	messageSend.style.left = "1020px";
	messageSend.style.width = "75px";
	messageSend.style.height = "30px";
	messageSend.style.cursor = "pointer";
	messageSend.addEventListener("click",function(){
	   VARIABLE.Socket.emit("RoomNewMsg",{Message:messageInput.value,ActorName:VARIABLE.USER.ActorName,RoomID:VARIABLE.USER.RoomID});
	   messageInput.value = "";
	});
    this.self.appendChild(messageField);
    this.self.appendChild(messageInput);
    this.self.appendChild(messageSend);
    
    var GameTimeTag = document.createElement("div");
    GameTimeTag.style.position = "absolute";
	GameTimeTag.style.top = "30px";
	GameTimeTag.style.left = "1120px";
	GameTimeTag.style.width = "150px";
	GameTimeTag.style.height = "40px";
	GameTimeTag.style.backgroundImage = "url('/src/pic/GameArea/GameTime.png')";
	this.self.appendChild(GameTimeTag);
	
    var GameTime = document.createElement("div");
    GameTime.style.position = "absolute";
	GameTime.style.top = "80px";
	GameTime.style.left = "1120px";
	GameTime.style.width = "150px";
	GameTime.style.height = "40px";
	GameTime.style.color = "#FFFFFF";
	GameTime.style.fontSize = "30pt";
    GameTime.style.textAlign = "center";
	GameTime.appendChild(document.createTextNode("00:00"));
    this.self.appendChild(GameTime);
    
    var TurnTimeTag = document.createElement("div");
    TurnTimeTag.style.position = "absolute";
	TurnTimeTag.style.top = "130px";
	TurnTimeTag.style.left = "1130px";
	TurnTimeTag.style.width = "150px";
	TurnTimeTag.style.height = "40px";
	TurnTimeTag.style.backgroundImage = "url('/src/pic/GameArea/TurnTime.png')";
	this.self.appendChild(TurnTimeTag);
	
	var TurnTime = document.createElement("div");
    TurnTime.style.position = "absolute";
	TurnTime.style.top = "180px";
	TurnTime.style.left = "1130px";
	TurnTime.style.width = "150px";
	TurnTime.style.height = "40px";
	TurnTime.style.color = "#FFFFFF";
	TurnTime.style.fontSize = "30pt";
	TurnTime.style.textAlign = "center";
	TurnTime.appendChild(document.createTextNode("00"));
    this.self.appendChild(TurnTime);
	
    var HpTag = document.createElement("div");
    HpTag.style.position = "absolute";
	HpTag.style.top = "230px";
	HpTag.style.left = "1120px";
	HpTag.style.width = "160px";
	HpTag.style.height = "40px";
	HpTag.style.backgroundImage = "url('/src/pic/GameArea/HP.png')";
	this.self.appendChild(HpTag);
    
    var HP = document.createElement("div");
    HP.style.position = "absolute";
    HP.style.top = "7px";
    HP.style.left = "63px";
    HP.style.width = "90px";
	HP.style.height = "26px";
	HP.style.backgroundColor = "#A50A0A";
	HpTag.appendChild(HP);
    
    var HPNum = document.createElement("div");
    HPNum.style.position = "absolute";
    HPNum.style.top = "7px";
    HPNum.style.left = "63px";
    HPNum.style.width = "90px";
	HPNum.style.height = "26px";
	HPNum.style.textAlign = "center";
	HPNum.style.color = "#27468D";
	HPNum.appendChild(document.createTextNode("100 / 100"));
	HpTag.appendChild(HPNum);
	
	var ApTag = document.createElement("div");
    ApTag.style.position = "absolute";
	ApTag.style.top = "280px";
	ApTag.style.left = "1120px";
	ApTag.style.width = "160px";
	ApTag.style.height = "40px";
	ApTag.style.backgroundImage = "url('/src/pic/GameArea/AP.png')";
	this.self.appendChild(ApTag);
	
	var AP = document.createElement("div");
    AP.style.position = "absolute";
    AP.style.top = "7px";
    AP.style.left = "63px";
    AP.style.width = "90px";
	AP.style.height = "26px";
	AP.style.backgroundColor = "#27468D";
	ApTag.appendChild(AP);
    
    var APNum = document.createElement("div");
    APNum.style.position = "absolute";
    APNum.style.top = "7px";
    APNum.style.left = "63px";
    APNum.style.width = "90px";
	APNum.style.height = "26px";
	APNum.style.textAlign = "center";
	APNum.style.color = "#A50A0A";
	APNum.appendChild(document.createTextNode("15 / 15"));
	ApTag.appendChild(APNum);
    
    function addItemEvent(node,i){
    	node.addEventListener("click",function(){
    		iframe.contentWindow.Skill(ItemList[i]);
    	});
    }
    function MoveButtonReset(){
        MoveButton.style.backgroundImage = "url('/src/pic/GameArea/BTN_Move.png')";
        isMove = false;
    }
    function AttackButtonReset(){
        isAttack = false;
        AttackButton.style.backgroundImage = "url('/src/pic/GameArea/BTN_Attack.png')";
    }
    function ButtonReset(){
        MoveButtonReset();
        AttackButtonReset();
        isItemSelect = false;
        iframe.contentWindow.ActionCancel();
    }
    
    this.getIframe = function(){
        return iframe;
    }
    this.getMessage = function(msg){
        var newMsg = document.createElement("li");
        newMsg.style.fontSize = "14pt";
        newMsg.style.color = "#FFFF00";
        newMsg.appendChild(document.createTextNode(msg));
        messageField.appendChild(newMsg);
        messageField.scrollTop = messageField.scrollHeight;
    };
    this.ResetMove = MoveButtonReset;
    this.ResetButton = ButtonReset;
    this.setHP = function(NewHP){
        var HPrate = NewHP / 100;
        HP.style.width = (90*HPrate) + "px";
        HPNum.childNodes[0].nodeValue = NewHP + " / 100";
    }
    this.setAP = function(NewAP){
        var APrate = NewAP / 15;
        AP.style.width = (90*APrate) + "px";
        APNum.childNodes[0].nodeValue = NewAP + " / 15";
    }
    this.setTime = function(Time){
        var d = new Date();
		// 取得 UTC time
    	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    	// 新增不同時區的日期資料
    	var NowTime = new Date(utc + (3600000*8));
        var StartTime = Time.StartTime.split(":");
        var NowTimeAllSecs = NowTime.getHours() * 3600 + NowTime.getMinutes() * 60 + NowTime.getSeconds();
        var StartTimeAllSecs = parseInt(StartTime[0]) * 3600 + parseInt(StartTime[1]) * 60 + parseInt(StartTime[2]);
        var lefttime = NowTimeAllSecs - StartTimeAllSecs;
        var leftMins = parseInt(lefttime / 60);
        var leftSecs = lefttime - leftMins*60;
        GameTime.childNodes[0].nodeValue = leftMins + " : " + leftSecs;
        TurnTime.childNodes[0].nodeValue = Time.Turn;
    }
}