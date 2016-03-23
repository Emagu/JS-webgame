function RoomView(){
    var windowSize = new Object();
    windowSize.W = Option.windowSize.W;
    windowSize.H = Option.windowSize.H;
    
    this.self = document.createElement("div");
    this.self.style.width = windowSize.W;
    this.self.style.height = windowSize.H;
    
    var command = document.createElement("div");
    command.style.width = "20%";
    command.style.height = "70%";
    command.style.backgroundColor = "#00AAAA";
    command.style.position = "absolute";
    command.style.left = "0px";
    command.style.top = "0px";
    this.self.appendChild(command);
    
    this.command_Start = document.createElement("div");
    this.command_Start.style.width = "98%";
    this.command_Start.style.height = "18%";
    this.command_Start.style.left = "1%";
    this.command_Start.style.top = "1%";
    this.command_Start.style.position = "absolute";
    this.command_Start.style.backgroundColor = "#00AFAA";
    this.command_Start.style.cursor = "pointer";
    this.command_Start.style.textAlign = "center";
    /*global VARIABLE 宣告於index*/
    if(VARIABLE.USER.RoomMaster) this.command_Start.appendChild(document.createTextNode("開始遊戲"));
    else this.command_Start.appendChild(document.createTextNode("準備完成"));
    command.appendChild(this.command_Start);
    
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
    command.appendChild(command_Quit);
    
    var status = document.createElement("div");
    status.style.width = "20%";
    status.style.height = "30%";
    status.style.backgroundColor = "#0000AA";
    status.style.position = "absolute";
    status.style.left = "0px";
    status.style.top = "70%";
    this.self.appendChild(status);
    
    var actorList = document.createElement("div");
    actorList.style.width = "80%";
    actorList.style.height = "90%";
    actorList.style.backgroundColor = "#AAAAAA";
    actorList.style.position = "absolute";
    actorList.style.left = "20%";
    actorList.style.top = "10%";
    this.self.appendChild(actorList);
    
    var title = document.createElement("H1");
    title.style.width = "80%";
    title.style.height = "10%";
    title.style.textAlign = "center";
    title.style.position = "absolute";
    title.style.left = "20%";
    title.style.top = "0px";
	title.appendChild(document.createTextNode("玩家列表"));
	this.self.appendChild(title);
	
	this.RoomListRender = function(data){
	    this.self.removeChild(actorList);
	    actorList = document.createElement("div");
        actorList.style.width = "80%";
        actorList.style.height = "90%";
        actorList.style.backgroundColor = "#AAAAAA";
        actorList.style.position = "absolute";
        actorList.style.left = "20%";
        actorList.style.top = "10%";
        actorList.style.overflowY = "auto";
        for(var i=0;i<data.length;i++){
            var roomDiv = document.createElement("div");
            roomDiv.style.width = "98%";
            roomDiv.style.height = "8%";
            roomDiv.style.backgroundColor = "#BBAAAA";
            roomDiv.style.position = "absolute";
            roomDiv.style.left = "1%";
            roomDiv.style.top = (1+9*i) + "%";
            roomDiv.appendChild(document.createTextNode(data[i].ActorName + "    " + data[i].Level));
            actorList.appendChild(roomDiv);
        }
        this.self.appendChild(actorList);
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
    }

    
}

