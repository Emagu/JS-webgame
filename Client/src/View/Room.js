function RoomView(windowSize,OptionSize){
    /*global OriginView */
    OriginView.call(this,windowSize,OptionSize);//繼承 
    
    //宣告變數
    var canStart = false;
    var statusID = 0;
    var needsend = false;
    
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
        console.log("test");
        needsend = true;
        if(VARIABLE.USER.RoomMaster=="false"){
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
    actorList.style.height = "90%";
    actorList.style.backgroundColor = "#AAAAAA";
    actorList.style.position = "absolute";
    actorList.style.left = "20%";
    actorList.style.top = "10%";
    var actorDiv = [];
    for(var i=0;i<16;i++){
        var temp = document.createElement("div");
        temp.style.width = "98%";
        temp.style.height = "5%";
        temp.style.backgroundColor = "#FFAAAA";
        temp.style.position = "absolute";
        temp.style.left = "1%";
        temp.style.top = i*5 + "%";
        actorDiv.push(temp);
        actorList.appendChild(actorDiv[i]);
    }
    
    var title = document.createElement("H1");
    title.style.width = "80%";
    title.style.height = "10%";
    title.style.textAlign = "center";
    title.style.position = "absolute";
    title.style.left = "20%";
    title.style.top = "0px";
	title.appendChild(document.createTextNode("玩家列表"));
	
	command.appendChild(command_Start);
	command.appendChild(command_Quit);
	this.self.appendChild(command);
	this.self.appendChild(status);
	this.self.appendChild(actorList);
	this.self.appendChild(title);
	//變數宣告完畢
	
	//宣告函式
	this.update = function(data){
	    for(var i=0;i<16;i++){
            if(actorDiv[i].firstChild) actorDiv[i].removeChild(actorDiv[i].firstChild);
        }
        canStart = true;
	    for(var i=0;i<data.length;i++){
	        if(data[i].ActorName==VARIABLE.USER.ActorName){
	            VARIABLE.USER.RoomMaster = data[i].Master;
	            while(command_Start.firstChild) command_Start.removeChild(command_Start.firstChild);
                command_Start.appendChild(document.createTextNode("開始遊戲"));
	        }
	        actorDiv[i].appendChild(document.createTextNode(data[i].ActorName+"    "+data[i].Level+"    "+data[i].Ready+"    "+data[i].Master));
	        if(data[i].Ready==0) canStart = false;
	    }
	    if(needsend){
	        needsend = false;
	        /*global gameStart,RoomStatus 實作於ajax */
	        if(VARIABLE.USER.RoomMaster!="false") {
	            if(canStart) gameStart(VARIABLE.USER.RoomID);
	        }else RoomStatus(VARIABLE.USER.ActorID,statusID);
	    }else{
	        /*global getRoomData 實作於ajax */
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



