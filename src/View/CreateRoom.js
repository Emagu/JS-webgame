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
	roomname.addEventListener("keydown",function(){//確認角色名稱可否使用
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
		temp.appendChild(document.createTextNode(MapArray[i].Name));
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

