function HallView(){
    this.self = document.createElement("div");
    this.self.style.width = "100%";
    this.self.style.height = "100%";
    this.self.style.backgroundColor = "#FFFFFF";
    this.self.style.position = "absolute";
    this.self.style.left = "0px";
    this.self.style.top = "0px";
    
    var command = document.createElement("div");
    command.style.width = "20%";
    command.style.height = "70%";
    command.style.backgroundColor = "#00AAAA";
    command.style.position = "absolute";
    command.style.left = "0px";
    command.style.top = "0px";
    this.self.appendChild(command);
    
    var status = document.createElement("div");
    status.style.width = "20%";
    status.style.height = "30%";
    status.style.backgroundColor = "#0000AA";
    status.style.position = "absolute";
    status.style.left = "0px";
    status.style.top = "70%";
    this.self.appendChild(status);
    
    var roomList = document.createElement("div");
    roomList.style.width = "80%";
    roomList.style.height = "90%";
    roomList.style.backgroundColor = "#AAAAAA";
    roomList.style.position = "absolute";
    roomList.style.left = "20%";
    roomList.style.top = "10%";
    this.self.appendChild(roomList);
    
    var title = document.createElement("H1");
    title.style.width = "80%";
    title.style.height = "10%";
    title.style.textAlign = "center";
    title.style.position = "absolute";
    title.style.left = "20%";
    title.style.top = "0px";
	title.appendChild(document.createTextNode("房間列表"));
	this.self.appendChild(title);
	
	
    this.StatusRender = function() {
        this.self.removeChild(status);
        status = document.createElement("div");
        status.style.width = "20%";
        status.style.height = "30%";
        status.style.backgroundColor = "#FFFFFF";
        status.style.position = "absolute";
        status.style.left = "0px";
        status.style.top = "70%";
        /*global USER 宣告於index*/
        status.appendChild(document.createTextNode("角色名稱:"+USER.ActorName));
        status.appendChild(document.createElement("br"));
        status.appendChild(document.createTextNode("角色等級:"+USER.Level));
        status.appendChild(document.createElement("br"));
        this.self.appendChild(status);
    }

    
}

