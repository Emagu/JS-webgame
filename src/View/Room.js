function RoomView(windowSize,Option){
    /*global OriginView */
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
	    console.log(data);
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




