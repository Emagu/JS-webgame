function RoomView(windowSize,Option){
    /*global OriginView */
    OriginView.call(this,windowSize,Option.getWindowSize());//繼承 
    
    //宣告變數
    var canStart = false;
    var statusID = 0;
    var needsend = 0;
    var RoomPosition = 0;
    var ActorType = 0;
    var ActorTypeChoose = null;
    
    var command = document.createElement("div");
    command.style.width = "20%";
    command.style.height = "70%";
    command.style.backgroundColor = "#00AAAA";
    command.style.position = "absolute";
    command.style.left = "0px";
    command.style.top = "0px";
    
    
    var command_Start = document.createElement("div");
    command_Start.style.width = "98%";
    command_Start.style.height = "18%";
    command_Start.style.left = "1%";
    command_Start.style.top = "1%";
    command_Start.style.position = "absolute";
    command_Start.style.backgroundColor = "#00AFAA";
    command_Start.style.cursor = "pointer";
    command_Start.style.textAlign = "center";
    /*global VARIABLE 宣告於index*/
    if(VARIABLE.USER.RoomMaster) {
        command_Start.appendChild(document.createTextNode("開始遊戲"));
        statusID = 1;
    }else command_Start.appendChild(document.createTextNode("準備完成"));
    command_Start.addEventListener("click",function() {
        if(!VARIABLE.USER.RoomMaster){
            needsend = 1;
           /*RoomStatus 實作於ajax*/
           if(statusID == 1){
               while(command_Start.firstChild) command_Start.removeChild(command_Start.firstChild);
               command_Start.appendChild(document.createTextNode("準備完成"));
               statusID = 0;
           }else{
               while(command_Start.firstChild) command_Start.removeChild(command_Start.firstChild);
               command_Start.appendChild(document.createTextNode("取消準備"));
               statusID = 1;
           }
        }else{
           needsend = 2;
       }
    });
    
    var command_Quit = document.createElement("div");
    command_Quit.style.width = "98%";
    command_Quit.style.height = "18%";
    command_Quit.style.left = "1%";
    command_Quit.style.top = "20%";
    command_Quit.style.position = "absolute";
    command_Quit.style.backgroundColor = "#00AFAA";
    command_Quit.style.cursor = "pointer";
    command_Quit.style.textAlign = "center";
    command_Quit.appendChild(document.createTextNode("離開房間"));
    command_Quit.addEventListener("click",function(){
        /*global quitRoom 實作於ajax*/
        /*global ViewInit,VARIABLE 宣告於index*/
        var data = new Object();
        data.ActorID = VARIABLE.USER.ActorID;
        data.Master = VARIABLE.USER.RoomMaster;
        data.RoomID = VARIABLE.USER.RoomID;
        ViewInit(VARIABLE.View.Block.self);
        quitRoom(JSON.stringify(data));
    });
    
    var status = document.createElement("div");
    status.style.width = "20%";
    status.style.height = "30%";
    status.style.backgroundColor = "#0000AA";
    status.style.position = "absolute";
    status.style.left = "0px";
    status.style.top = "70%";
    
    var actorList = document.createElement("div");
    actorList.style.width = "80%";
    actorList.style.height = "40%";
    actorList.style.backgroundColor = "#AAAAAA";
    actorList.style.position = "absolute";
    actorList.style.left = "20%";
    actorList.style.top = "5%";
    
    var actorList_L = document.createElement("div");
    actorList_L.style.width = "50%";
    actorList_L.style.height = "100%";
    actorList_L.style.backgroundColor = "#AAffAA";
    actorList_L.style.position = "absolute";
    actorList_L.style.left = "0%";
    actorList_L.style.top = "0%";
    
    var actorList_R = document.createElement("div");
    actorList_R.style.width = "50%";
    actorList_R.style.height = "100%";
    actorList_R.style.backgroundColor = "#AAffAA";
    actorList_R.style.position = "absolute";
    actorList_R.style.left = "50%";
    actorList_R.style.top = "0%";
    
    
    actorList.appendChild(actorList_L);
    actorList.appendChild(actorList_R);
    
    var actorDiv = [];
    var readyDiv = [];
    var LevelDiv = [];
    var MasterDiv = [];
    //左邊
    for(var i=0;i<5;i++){
        var positionLabel = document.createElement("div");
        positionLabel.style.width = "10%";
        positionLabel.style.height = "17%";
        positionLabel.style.backgroundColor = "#FFAAAA";
        positionLabel.style.position = "absolute";
        positionLabel.style.left = "1%";
        positionLabel.style.top = (i*18 + 10) + "%";
        positionLabel.appendChild(document.createTextNode((i+1)+":"));
        actorList_L.appendChild(positionLabel);
        
        var actorIDLabel = document.createElement("div");
        actorIDLabel.style.width = "30%";
        actorIDLabel.style.height = "17%";
        actorIDLabel.style.backgroundColor = "#FFAAAA";
        actorIDLabel.style.position = "absolute";
        actorIDLabel.style.left = "12%";
        actorIDLabel.style.top = (i*18 + 10) + "%";
        addEvent_roomPos(actorIDLabel,i);
        actorDiv.push(actorIDLabel);
        actorList_L.appendChild(actorDiv[i]);
        
        var LevelLabel = document.createElement("div");
        LevelLabel.style.width = "10%";
        LevelLabel.style.height = "17%";
        LevelLabel.style.backgroundColor = "#FFAAAA";
        LevelLabel.style.position = "absolute";
        LevelLabel.style.left = "43%";
        LevelLabel.style.top = (i*18 + 10) + "%";
        LevelDiv.push(LevelLabel);
        actorList_L.appendChild(LevelDiv[i]);
        
        var MasterLabel = document.createElement("div");
        MasterLabel.style.width = "10%";
        MasterLabel.style.height = "17%";
        MasterLabel.style.backgroundColor = "#FFAAAA";
        MasterLabel.style.position = "absolute";
        MasterLabel.style.left = "54%";
        MasterLabel.style.top = (i*18 + 10) + "%";
        MasterDiv.push(MasterLabel);
        actorList_L.appendChild(MasterDiv[i]);
        
        var readyLabel = document.createElement("div");
        readyLabel.style.width = "34%";
        readyLabel.style.height = "17%";
        readyLabel.style.backgroundColor = "#FFAAAA";
        readyLabel.style.position = "absolute";
        readyLabel.style.left = "65%";
        readyLabel.style.top = (i*18 + 10) + "%";
        readyDiv.push(readyLabel);
        actorList_L.appendChild(readyDiv[i]);
    }
    //右邊
    for(var i=0;i<5;i++){
        var positionLabel = document.createElement("div");
        positionLabel.style.width = "10%";
        positionLabel.style.height = "17%";
        positionLabel.style.backgroundColor = "#FFAAAA";
        positionLabel.style.position = "absolute";
        positionLabel.style.left = "1%";
        positionLabel.style.top = (i*18 + 10) + "%";
        positionLabel.appendChild(document.createTextNode((i+6)+":"));
        actorList_R.appendChild(positionLabel);
        
        var actorIDLabel = document.createElement("div");
        actorIDLabel.style.width = "30%";
        actorIDLabel.style.height = "17%";
        actorIDLabel.style.backgroundColor = "#FFAAAA";
        actorIDLabel.style.position = "absolute";
        actorIDLabel.style.left = "12%";
        actorIDLabel.style.top = (i*18 + 10) + "%";
        addEvent_roomPos(actorIDLabel,i+5);
        actorDiv.push(actorIDLabel);
        actorList_R.appendChild(actorDiv[i+5]);
        
        var LevelLabel = document.createElement("div");
        LevelLabel.style.width = "10%";
        LevelLabel.style.height = "17%";
        LevelLabel.style.backgroundColor = "#FFAAAA";
        LevelLabel.style.position = "absolute";
        LevelLabel.style.left = "43%";
        LevelLabel.style.top = (i*18 + 10) + "%";
        LevelDiv.push(LevelLabel);
        actorList_R.appendChild(LevelDiv[i+5]);
        
        var MasterLabel = document.createElement("div");
        MasterLabel.style.width = "10%";
        MasterLabel.style.height = "17%";
        MasterLabel.style.backgroundColor = "#FFAAAA";
        MasterLabel.style.position = "absolute";
        MasterLabel.style.left = "54%";
        MasterLabel.style.top = (i*18 + 10) + "%";
        MasterDiv.push(MasterLabel);
        actorList_R.appendChild(MasterDiv[i+5]);
        
        var readyLabel = document.createElement("div");
        readyLabel.style.width = "34%";
        readyLabel.style.height = "17%";
        readyLabel.style.backgroundColor = "#FFAAAA";
        readyLabel.style.position = "absolute";
        readyLabel.style.left = "65%";
        readyLabel.style.top = (i*18 + 10) + "%";
        readyDiv.push(readyLabel);
        actorList_R.appendChild(readyDiv[i+5]);
    }
    
    //玩家個人設定
    var actorOption = document.createElement("div");
    actorOption.style.width = "40%";
    actorOption.style.height = "55%";
    actorOption.style.backgroundColor = "#AAAAAA";
    actorOption.style.position = "absolute";
    actorOption.style.left = "20%";
    actorOption.style.top = "45%";
    
    //兵種設定
    var actorType = document.createElement("div");
    actorType.style.width = "100%";
    actorType.style.height = "20%";
    actorType.style.backgroundColor = "#AAAAFF";
    actorType.style.position = "absolute";
    actorType.style.left = "0%";
    actorType.style.top = "10%";
    actorOption.appendChild(actorType);
    
    var actorTypeNameArray = Option.getActorTypeArray();
    for(var i=0;i<actorTypeNameArray.length;i++){
        
        var temp = document.createElement("div");
        temp.style.width = "13%";
        temp.style.height = "98%";
        temp.style.backgroundColor = "#AAAAAA";
        temp.style.left = (1+(i*14)) + "%";
        temp.style.top = "1%";
        temp.style.position = "absolute";
        temp.appendChild(document.createTextNode(actorTypeNameArray[i]));
        temp.style.cursor = "pointer";
        addEvent_actorType(temp,i);
        if(i==0) {
            temp.style.backgroundColor = "#AAFFAA";
            ActorTypeChoose = temp;
        }
            
        actorType.appendChild(temp);
    }
    
    var title = document.createElement("div");
    title.style.width = "80%";
    title.style.height = "5%";
    title.style.textAlign = "center";
    title.style.position = "absolute";
    title.style.backgroundColor = "#FFFFFF";
    title.style.left = "20%";
    title.style.top = "0px";
	title.appendChild(document.createTextNode("房間編號:"+VARIABLE.USER.RoomID));
	
	command.appendChild(command_Start);
	command.appendChild(command_Quit);
	this.self.appendChild(command);
	this.self.appendChild(status);
	this.self.appendChild(actorList);
	this.self.appendChild(actorOption);
	
	this.self.appendChild(title);
	//變數宣告完畢
	
	//宣告函式
	function addEvent_roomPos(Div,i){
	    Div.addEventListener("click",function(){
            needsend = 3;
            RoomPosition = i;
	    });
	}
	function addEvent_actorType(Div,i){
	    Div.addEventListener("click",function(){
	        ActorTypeChoose.style.backgroundColor = "#AAAAAA";
	        Div.style.backgroundColor = "#AAFFAA";
	        ActorTypeChoose = Div;
            ActorType = i;
            needsend = 4;
	    });
	}
	this.update = function(data){
	    for(var i=0;i<10;i++){
            if(actorDiv[i].firstChild) actorDiv[i].removeChild(actorDiv[i].firstChild);
            if(LevelDiv[i].firstChild) LevelDiv[i].removeChild(LevelDiv[i].firstChild);
            if(readyDiv[i].firstChild) readyDiv[i].removeChild(readyDiv[i].firstChild);
            if(MasterDiv[i].firstChild) MasterDiv[i].removeChild(MasterDiv[i].firstChild);
        }
        canStart = true;
	    for(var i=0;i<data.length;i++){
	        var pos = data[i].Position;
	        if(data[i].Master=="true"){
    	        if(data[i].ActorName==VARIABLE.USER.ActorName){      
	                if(statusID == 0){
	                    VARIABLE.USER.RoomMaster = true;
	                    statusID = 1;
	                    needsend = 1;
	                    while(command_Start.firstChild) command_Start.removeChild(command_Start.firstChild);
                        command_Start.appendChild(document.createTextNode("開始遊戲"));
	                }
	            }
	        }
	        actorDiv[pos].appendChild(document.createTextNode(data[i].ActorName));
	        LevelDiv[pos].appendChild(document.createTextNode(data[i].Level));
	        if(data[i].State == 0){
	            canStart = false;
	        }else{
	            readyDiv[pos].appendChild(document.createTextNode("準備"));
	        }
	        if(data[i].Master=="true") MasterDiv[pos].appendChild(document.createTextNode("房長"));
	    }
	    switch (needsend) {
	        /*global gameStart_command,RoomStatus,getRoomData,changePos_Room,changeType_Room　 實作於ajax */
	        case 1://準備
                needsend = 0;
                RoomStatus(VARIABLE.USER.ActorID,statusID);
                break;
            case 2://開始
                needsend = 0;
                if(canStart) gameStart_command(VARIABLE.USER.RoomID);
                else getRoomData(VARIABLE.USER.RoomID,VARIABLE.USER.ActorID);
                break;
            case 3://換位
                needsend = 0;
                var data = new Object();
                data.ActorID = VARIABLE.USER.ActorID;
                data.RoomID = VARIABLE.USER.RoomID;
                data.Postion = RoomPosition;
                changePos_Room(JSON.stringify(data));
                break;
            case 4://兵種轉換
                needsend = 0;
                var data = new Object();
                data.ActorID = VARIABLE.USER.ActorID;
                data.RoomID = VARIABLE.USER.RoomID;
                data.Type = ActorType;
                changeType_Room(JSON.stringify(data));
                break;
	        default://同步
	            getRoomData(VARIABLE.USER.RoomID,VARIABLE.USER.ActorID);
	    }
	};
    this.StatusRender = function() {
        this.self.removeChild(status);
        status = document.createElement("div");
        status.style.width = "20%";
        status.style.height = "30%";
        status.style.backgroundColor = "#FFFFFF";
        status.style.position = "absolute";
        status.style.left = "0px";
        status.style.top = "70%";
        
        status.appendChild(document.createTextNode("角色名稱:"+VARIABLE.USER.ActorName));
        status.appendChild(document.createElement("br"));
        status.appendChild(document.createTextNode("角色等級:"+VARIABLE.USER.Level));
        status.appendChild(document.createElement("br"));
        this.self.appendChild(status);
        RoomStatus(VARIABLE.USER.ActorID,statusID);/*global RoomStatus 實作於ajax */
    };
    //函式宣告完畢
    
    //初始化函式執行
    //執行初始化函式完畢
}



