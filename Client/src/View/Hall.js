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
        OptionEditViewInit();
    });
    
    command.appendChild(command_CreateRoom);
    command.appendChild(command_Option);
    
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
            roomNO.appendChild(document.createTextNode(data[i].RoomID));
            var roomName = document.createElement("div");
            roomName.style.width = "400px";
            roomName.style.height = "48px";
            roomName.style.left = "300px";
            roomName.style.top = "40px";
            roomName.style.position = "absolute";
            roomName.style.textAlign = "center";
            roomName.style.fontSize = "xx-large";
            roomName.style.color = "#ffffff";
            roomName.appendChild(document.createTextNode(data[i].RoomName));
            var roomCount = document.createElement("div");
            roomCount.style.width = "100px";
            roomCount.style.height = "48px";
            roomCount.style.left = "750px";
            roomCount.style.top = "40px";
            roomCount.style.position = "absolute";
            roomCount.style.textAlign = "center";
            roomCount.style.fontSize = "xx-large";
            roomCount.style.color = "#ffffff";
            roomCount.appendChild(document.createTextNode(data[i].ActorNum+" / 10"));
            //document.createTextNode(data[i].RoomID + "    " + data[i].RoomName + "    " + data[i].Map + "    " + data[i].ActorNum)
            roomDiv.appendChild(roomIcon);
            roomDiv.appendChild(roomNO);
            roomDiv.appendChild(roomName);
            roomDiv.appendChild(roomCount);
            insertRoom(roomDiv,data[i].RoomID);
            roomList.appendChild(roomDiv);
        }
        this.self.appendChild(roomList);
        if(VARIABLE.SCENES=="hall") {
            /*global getRoomList　 實作於ajax*/
            getRoomList();
        }
	};//刷新
    this.StatusRender = function() {
        this.self.removeChild(status);
        createStatus();
        /*global VARIABLE 宣告於index*/
        status.appendChild(document.createTextNode("角色名稱:"+VARIABLE.USER.ActorName));
        status.appendChild(document.createElement("br"));
        this.self.appendChild(status);
    };//狀態欄渲染
    //函式宣告完畢
    
}

