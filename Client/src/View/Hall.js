function HallView(windowSize,OptionSize){
    /*global OriginView */
    OriginView.call(this,windowSize,OptionSize);//繼承 
    
    //宣告變數
    var command = document.createElement("div");
    command.style.width = "20%";
    command.style.height = "70%";
    command.style.backgroundColor = "#00AAAA";
    command.style.position = "absolute";
    command.style.left = "0px";
    command.style.top = "0px";
    
    var command_CreateRoom = document.createElement("div");
    command_CreateRoom.style.width = "98%";
    command_CreateRoom.style.height = "18%";
    command_CreateRoom.style.left = "1%";
    command_CreateRoom.style.top = "1%";
    command_CreateRoom.style.position = "absolute";
    command_CreateRoom.style.backgroundColor = "#00FFAA";
    command_CreateRoom.style.cursor = "pointer";
    command_CreateRoom.style.textAlign = "center";
    command_CreateRoom.appendChild(document.createTextNode("創建房間"));
    command_CreateRoom.addEventListener("click",function(){
        /*global CreateRoomViewInit 實作於index */
        CreateRoomViewInit();
    });
    
    var command_Option = document.createElement("div");
    command_Option.style.width = "98%";
    command_Option.style.height = "18%";
    command_Option.style.left = "1%";
    command_Option.style.top = "20%";
    command_Option.style.position = "absolute";
    command_Option.style.backgroundColor = "#00FFAA";
    command_Option.style.cursor = "pointer";
    command_Option.style.textAlign = "center";
    command_Option.appendChild(document.createTextNode("遊戲設定"));
    command_Option.addEventListener("click",function(){
        /*global OptionEditViewInit 實作於index */
        OptionEditViewInit();
    });
    
    command.appendChild(command_CreateRoom);
    command.appendChild(command_Option);
    
    var status = document.createElement("div");
    status.style.width = "20%";
    status.style.height = "30%";
    status.style.backgroundColor = "#0000AA";
    status.style.position = "absolute";
    status.style.left = "0px";
    status.style.top = "70%";
    
    var roomList = document.createElement("div");
    roomList.style.width = "80%";
    roomList.style.height = "90%";
    roomList.style.backgroundColor = "#AAAAAA";
    roomList.style.position = "absolute";
    roomList.style.left = "20%";
    roomList.style.top = "10%";
    
    var title = document.createElement("div");
    title.style.width = "80%";
    title.style.height = "10%";
    title.style.textAlign = "center";
    title.style.position = "absolute";
    title.style.backgroundColor = "#AA00AA";
    title.style.left = "20%";
    title.style.top = "0px";
	title.appendChild(document.createTextNode("房間列表"));
	
	this.self.appendChild(status);
	this.self.appendChild(roomList);
    this.self.appendChild(command);
    this.self.appendChild(title);
    //變數宣告完畢
    
    //宣告函式
    this.update = function(data){
	    function insertRoom(Div,RoomID){
	        Div.addEventListener("click",function(){
	            /*global addRoom 實作於ajax*/
	            /*global ViewInit,VARIABLE*/
	            var data = new Object();
	            data.RoomID = RoomID;
	            data.ActorID = VARIABLE.USER.ActorID;
	            ViewInit(VARIABLE.View.Block.self);
	            addRoom(JSON.stringify(data));
	        });
	    }
	    this.self.removeChild(roomList);
	    roomList = document.createElement("div");
        roomList.style.width = "80%";
        roomList.style.height = "90%";
        roomList.style.backgroundColor = "#AAAAAA";
        roomList.style.position = "absolute";
        roomList.style.left = "20%";
        roomList.style.top = "10%";
        roomList.style.overflowY = "auto";
        for(var i=0;i<data.length;i++){
            var roomDiv = document.createElement("div");
            roomDiv.style.width = "98%";
            roomDiv.style.height = "8%";
            roomDiv.style.backgroundColor = "#BBAAAA";
            roomDiv.style.position = "absolute";
            roomDiv.style.left = "1%";
            roomDiv.style.top = (1+9*i) + "%";
            roomDiv.style.cursor = "pointer";
            roomDiv.appendChild(document.createTextNode(data[i].RoomID + "    " + data[i].RoomName + "    " + data[i].Map + "    " + data[i].ActorNum));
            insertRoom(roomDiv,data[i].RoomID);
            roomList.appendChild(roomDiv);
        }
        this.self.appendChild(roomList);
        if(VARIABLE.SCENES=="hall") {
            /*global getRoomList　 實作於ajax*/
            //getRoomList();
        }
	};//刷新
    this.StatusRender = function() {
        this.self.removeChild(status);
        status = document.createElement("div");
        status.style.width = "20%";
        status.style.height = "30%";
        status.style.backgroundColor = "#FFFFFF";
        status.style.position = "absolute";
        status.style.left = "0px";
        status.style.top = "70%";
        /*global VARIABLE 宣告於index*/
        status.appendChild(document.createTextNode("角色名稱:"+VARIABLE.USER.ActorName));
        status.appendChild(document.createElement("br"));
        status.appendChild(document.createTextNode("角色等級:"+VARIABLE.USER.Level));
        status.appendChild(document.createElement("br"));
        this.self.appendChild(status);
    };//狀態欄渲染
    //函式宣告完畢
    
}

